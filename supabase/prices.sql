-- ─────────────────────────────────────────────────────────────────────────────
-- Prices seed data  (run this in Supabase SQL editor)
-- Tables price_categories + price_items must exist (created by schema.sql).
-- Safe to re-run — skips if price_categories already has rows.
-- ─────────────────────────────────────────────────────────────────────────────

do $$ begin
  if exists (select 1 from price_categories limit 1) then
    raise notice 'price_categories already has data — skipping seed.';
    return;
  end if;

  -- ── Ukrainian ───────────────────────────────────────────────────────────────
  with cats as (
    insert into price_categories (locale, name, sort_order) values
      ('uk', 'Консультація', 0),
      ('uk', 'Косметика',    1),
      ('uk', 'Імпланти',     2),
      ('uk', 'Ортодонтія',   3),
      ('uk', 'Профілактика', 4)
    returning id, name
  )
  insert into price_items (category_id, name, price, sort_order)
  select c.id, v.name, v.price, v.sort_order from cats c
  join (values
    ('Консультація', 'Первинна консультація',    'Безкоштовно',   0),
    ('Консультація', 'Повторна консультація',    '200 ₴',         1),
    ('Косметика',    'Порцеляновий вінір (1)',   'від 8 000 ₴',   0),
    ('Косметика',    'Нарощення (1)',            'від 2 500 ₴',   1),
    ('Косметика',    'Zoom-відбілювання',        '4 500 ₴',       2),
    ('Імпланти',     'Імплант (під ключ)',       'від 25 000 ₴',  0),
    ('Імпланти',     'Коронка (кераміка)',       'від 5 500 ₴',   1),
    ('Ортодонтія',   'Елайнери (повний курс)',   'від 45 000 ₴',  0),
    ('Ортодонтія',   'Металева брекет-система',  'від 18 000 ₴',  1),
    ('Профілактика', 'Чищення + полірування',    '1 500 ₴',       0),
    ('Профілактика', 'Цифровий рентген (повний)','800 ₴',         1)
  ) as v(cat, name, price, sort_order) on c.name = v.cat;

  -- ── English ─────────────────────────────────────────────────────────────────
  with cats as (
    insert into price_categories (locale, name, sort_order) values
      ('en', 'Consultation', 0),
      ('en', 'Cosmetics',    1),
      ('en', 'Implants',     2),
      ('en', 'Orthodontics', 3),
      ('en', 'Prevention',   4)
    returning id, name
  )
  insert into price_items (category_id, name, price, sort_order)
  select c.id, v.name, v.price, v.sort_order from cats c
  join (values
    ('Consultation', 'Initial consultation',        'Free',          0),
    ('Consultation', 'Follow-up consultation',      '200 ₴',         1),
    ('Cosmetics',    'Porcelain veneer (1)',         'from 8 000 ₴',  0),
    ('Cosmetics',    'Bonding (1)',                  'from 2 500 ₴',  1),
    ('Cosmetics',    'Zoom whitening',               '4 500 ₴',       2),
    ('Implants',     'Implant (all-inclusive)',      'from 25 000 ₴', 0),
    ('Implants',     'Crown (ceramic)',              'from 5 500 ₴',  1),
    ('Orthodontics', 'Clear aligners (full course)', 'from 45 000 ₴', 0),
    ('Orthodontics', 'Metal braces',                'from 18 000 ₴', 1),
    ('Prevention',   'Cleaning + polishing',        '1 500 ₴',       0),
    ('Prevention',   'Digital X-ray (full)',        '800 ₴',         1)
  ) as v(cat, name, price, sort_order) on c.name = v.cat;

end $$;
