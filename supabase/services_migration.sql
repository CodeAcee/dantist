-- ─────────────────────────────────────────────────────────────────────────────
-- Migration: add starting_price column + re-seed services
-- Run this in Supabase SQL editor if you already ran the old schema.sql
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. Add the missing column (safe if it already exists)
alter table services add column if not exists starting_price text not null default '';

-- 2. Clear old seed rows and re-insert with prices
delete from services;

insert into services (locale, name, description, starting_price, img, sort_order) values
  ('uk', 'Вініри',       'Кастомний фарфор. 2 тижні.',            'від 8 000 грн',  'Вінір крупним планом',    0),
  ('uk', 'Імпланти',     'Титанові корені. Назавжди.',             'від 18 000 грн', 'Модель імпланта',         1),
  ('uk', 'Елайнери',     'Ніхто не помітить. Ти — відчуєш.',      'від 25 000 грн', 'Елайнер',                 2),
  ('uk', 'Відбілювання', '1 сеанс. 8 тонів яскравіше.',           'від 3 500 грн',  'Лампа для відбілювання',  3),
  ('uk', 'Огляд',        '30 хв. Повний скан. Кава включена.',    'БЕЗКОШТОВНО',    'Стоматологічне дзеркало', 4),
  ('uk', 'Терміново',    'Зламаний зуб? Того ж дня.',             'Телефонуй',      'Кабінет клініки',         5),
  ('en', 'Veneers',      'Custom porcelain. 2 weeks.',            'from 8 000 UAH',  'Veneer close-up', 0),
  ('en', 'Implants',     'Titanium roots. For life.',             'from 18 000 UAH', 'Implant model',   1),
  ('en', 'Aligners',     'No one will notice. You will feel it.', 'from 25 000 UAH', 'Clear aligner',   2),
  ('en', 'Whitening',    '1 session. 8 shades brighter.',         'from 3 500 UAH',  'Whitening lamp',  3),
  ('en', 'Check-up',     '30 min. Full scan. Coffee included.',   'FREE',            'Dental mirror',   4),
  ('en', 'Emergency',    'Broken tooth? Same day.',               'Call us',         'Clinic room',     5);
