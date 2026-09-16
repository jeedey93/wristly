-- ─────────────────────────────────────────────────────────────
-- Wristly — Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ─────────────────────────────────────────────────────────────

-- ── Extensions ───────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Profiles ─────────────────────────────────────────────────
-- Auto-created when a user signs up via auth trigger below
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  first_name    text not null default '',
  last_name     text not null default '',
  phone         text,
  role          text not null default 'renter' check (role in ('renter', 'owner', 'both')),
  avatar_url    text,
  id_verified   boolean not null default false,
  rating        numeric(3,2),
  review_count  int not null default 0,
  city          text not null default 'Montreal',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── Watches ──────────────────────────────────────────────────
create table if not exists public.watches (
  id                  uuid primary key default uuid_generate_v4(),
  owner_id            uuid not null references public.profiles(id) on delete cascade,
  brand               text not null,
  model               text not null,
  reference_number    text,
  year                int,
  estimated_value     int not null,
  condition           text not null check (condition in ('Mint', 'Excellent', 'Very Good', 'Good')),
  description         text,
  included_accessories text[],
  rental_price_30d    int not null,
  deposit_amount      int not null,
  pickup_area         text not null,
  city                text not null default 'Montreal',
  is_authenticated    boolean not null default false,
  status              text not null default 'active' check (status in ('active', 'rented', 'pending_review', 'inactive')),
  photos              text[],
  rating              numeric(3,2),
  review_count        int not null default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ── Bookings ─────────────────────────────────────────────────
create table if not exists public.bookings (
  id                  uuid primary key default uuid_generate_v4(),
  watch_id            uuid not null references public.watches(id) on delete restrict,
  renter_id           uuid not null references public.profiles(id) on delete restrict,
  owner_id            uuid not null references public.profiles(id) on delete restrict,
  start_date          date not null,
  end_date            date not null,
  rental_days         int not null,
  rental_price        int not null,
  platform_fee        int not null,
  owner_payout        int not null,
  deposit_amount      int not null,
  status              text not null default 'requested' check (
    status in ('requested','confirmed','picked_up','returned','completed','cancelled','disputed')
  ),
  stripe_payment_intent_id  text,
  stripe_deposit_intent_id  text,
  pickup_notes        text,
  return_notes        text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ── Reviews ──────────────────────────────────────────────────
create table if not exists public.reviews (
  id          uuid primary key default uuid_generate_v4(),
  booking_id  uuid not null references public.bookings(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id) on delete cascade,
  reviewee_id uuid not null references public.profiles(id) on delete cascade,
  watch_id    uuid references public.watches(id) on delete set null,
  rating      int not null check (rating between 1 and 5),
  comment     text,
  type        text not null check (type in ('owner_to_renter', 'renter_to_owner', 'renter_to_watch')),
  created_at  timestamptz not null default now(),
  unique (booking_id, reviewer_id, type)
);

-- ─────────────────────────────────────────────────────────────
-- Auto-create profile on signup
-- ─────────────────────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, first_name, last_name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    new.raw_user_meta_data->>'phone',
    coalesce(new.raw_user_meta_data->>'role', 'renter')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- Updated_at auto-update
-- ─────────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();
create trigger set_watches_updated_at before update on public.watches
  for each row execute procedure public.set_updated_at();
create trigger set_bookings_updated_at before update on public.bookings
  for each row execute procedure public.set_updated_at();

-- ─────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.watches  enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews  enable row level security;

-- Profiles: anyone can read, only you can update yours
create policy "Profiles are publicly readable"
  on public.profiles for select using (true);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Watches: anyone can read active watches, owners manage their own
create policy "Active watches are publicly readable"
  on public.watches for select using (status = 'active' or owner_id = auth.uid());
create policy "Owners can insert watches"
  on public.watches for insert with check (auth.uid() = owner_id);
create policy "Owners can update own watches"
  on public.watches for update using (auth.uid() = owner_id);
create policy "Owners can delete own watches"
  on public.watches for delete using (auth.uid() = owner_id);

-- Bookings: renters and owners see their own bookings
create policy "Users see their own bookings"
  on public.bookings for select
  using (auth.uid() = renter_id or auth.uid() = owner_id);
create policy "Renters can create bookings"
  on public.bookings for insert with check (auth.uid() = renter_id);
create policy "Booking parties can update"
  on public.bookings for update
  using (auth.uid() = renter_id or auth.uid() = owner_id);

-- Reviews: publicly readable, only reviewer can write
create policy "Reviews are publicly readable"
  on public.reviews for select using (true);
create policy "Reviewers can insert their review"
  on public.reviews for insert with check (auth.uid() = reviewer_id);

-- ─────────────────────────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────────────────────────
create index if not exists watches_owner_id_idx  on public.watches(owner_id);
create index if not exists watches_status_idx    on public.watches(status);
create index if not exists watches_brand_idx     on public.watches(brand);
create index if not exists bookings_renter_idx   on public.bookings(renter_id);
create index if not exists bookings_owner_idx    on public.bookings(owner_id);
create index if not exists bookings_watch_idx    on public.bookings(watch_id);
create index if not exists bookings_status_idx   on public.bookings(status);
