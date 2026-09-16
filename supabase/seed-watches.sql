-- Insert seed watches into Supabase for demo purposes
-- Run in SQL Editor: https://supabase.com/dashboard/project/exrtkjlkebzabefnhpbi/sql/new

-- First create a demo owner profile (we'll use a fixed UUID)
-- Skip if you already have real users

insert into public.profiles (id, first_name, last_name, role, city, id_verified, rating, review_count)
values
  ('00000000-0000-0000-0000-000000000001', 'Marc', 'D.', 'owner', 'Montreal', true, 4.9, 12),
  ('00000000-0000-0000-0000-000000000002', 'Sophie', 'L.', 'owner', 'Montreal', true, 5.0, 6),
  ('00000000-0000-0000-0000-000000000003', 'Alex', 'B.', 'owner', 'Montreal', false, 4.7, 4),
  ('00000000-0000-0000-0000-000000000004', 'Jean-F.', 'T.', 'owner', 'Montreal', false, 4.8, 3)
on conflict (id) do nothing;

-- Insert demo watches
insert into public.watches (id, owner_id, brand, model, reference_number, year, estimated_value, condition, description, included_accessories, rental_price_30d, deposit_amount, pickup_area, city, is_authenticated, status, photos, rating, review_count)
values
  (
    '00000000-0000-0000-0001-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'Rolex', 'Datejust 41', '126300', 2021, 9800, 'Excellent',
    'A stunning Rolex Datejust 41 in stainless steel with Jubilee bracelet and slate dial. Full set with box and papers. This watch has been serviced and wears beautifully. Perfect for business or formal occasions.',
    array['Original box', 'Papers', 'Extra links', 'Chronofile'],
    225, 980, 'Westmount', 'Montreal', true, 'active',
    array['https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80','https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80'],
    4.8, 8
  ),
  (
    '00000000-0000-0000-0001-000000000002',
    '00000000-0000-0000-0000-000000000002',
    'Omega', 'Speedmaster Professional', '310.30.42.50.01.001', 2022, 7200, 'Mint',
    'The original Moonwatch. This Speedmaster Professional is unworn with full set. Manual-wind movement, hesalite crystal, iconic panda dial. A true horological icon for the watch enthusiast.',
    array['Original box', 'Papers', 'NATO strap', 'Calibre 3861'],
    195, 720, 'Plateau-Mont-Royal', 'Montreal', true, 'active',
    array['https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800&q=80','https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80'],
    5.0, 5
  ),
  (
    '00000000-0000-0000-0001-000000000003',
    '00000000-0000-0000-0000-000000000003',
    'Tudor', 'Black Bay 58', '79030N', 2023, 4200, 'Excellent',
    'Tudor Black Bay 58 in navy blue. Excellent everyday sports watch. 39mm case wears beautifully on smaller wrists. Comes with both bracelet and leather strap. Ideal for any occasion.',
    array['Original box', 'Papers', 'Leather strap', 'Bracelet'],
    145, 504, 'Mile-End', 'Montreal', false, 'active',
    array['https://images.unsplash.com/photo-1647174317920-a9c6780f825b?w=800&q=80'],
    4.9, 3
  ),
  (
    '00000000-0000-0000-0001-000000000004',
    '00000000-0000-0000-0000-000000000001',
    'Cartier', 'Santos de Cartier', 'WSSA0018', 2020, 8500, 'Excellent',
    'The Cartier Santos — the world''s first pilot''s wristwatch, now a timeless icon. Steel with interchangeable straps. Elegant yet sporty. Perfect for someone who wants to stand out.',
    array['Original box', 'Papers', 'Alligator strap', 'Steel bracelet', 'Strap changing tool'],
    210, 850, 'Downtown Montreal', 'Montreal', true, 'active',
    array['https://images.unsplash.com/photo-1687040481503-3595ef7b5672?w=800&q=80'],
    4.7, 4
  ),
  (
    '00000000-0000-0000-0001-000000000005',
    '00000000-0000-0000-0000-000000000004',
    'Grand Seiko', 'Snowflake', 'SBGA211', 2021, 5800, 'Mint',
    'The legendary Grand Seiko Snowflake with its mesmerizing textured dial inspired by the snow-covered forests of Shinshu. Spring Drive movement. A watch for those who appreciate true Japanese craftsmanship.',
    array['Original box', 'Papers', 'Titanium bracelet'],
    165, 580, 'Outremont', 'Montreal', false, 'active',
    array['https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80'],
    5.0, 2
  ),
  (
    '00000000-0000-0000-0001-000000000006',
    '00000000-0000-0000-0000-000000000002',
    'Rolex', 'Submariner Date', '126610LN', 2022, 16500, 'Excellent',
    'The iconic Rolex Submariner in black ceramic. Full set with box and papers. The most recognizable dive watch in the world. Currently unavailable at retail — waiting lists are years long.',
    array['Original box', 'Papers', 'Swing tag'],
    350, 1320, 'Westmount', 'Montreal', true, 'rented',
    array['https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80'],
    5.0, 6
  )
on conflict (id) do nothing;
