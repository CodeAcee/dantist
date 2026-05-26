-- ─────────────────────────────────────────────────────────────────────────────
-- Chirkova Dentist — Supabase schema  (safe to re-run — fully idempotent)
-- Run in Supabase SQL editor: https://app.supabase.com → SQL editor
-- ─────────────────────────────────────────────────────────────────────────────

-- ── team ─────────────────────────────────────────────────────────────────────
create table if not exists team (
  id          bigint generated always as identity primary key,
  locale      text    not null default 'uk',
  name        text    not null,
  title       text    not null,
  bio         text    not null,
  years       int     not null default 0,
  years_label text    not null,
  img_alt     text    not null default '',
  sort_order  int     not null default 0,
  active      boolean not null default true,
  created_at  timestamptz default now()
);

-- ── cases (before / after) ───────────────────────────────────────────────────
create table if not exists cases (
  id           bigint generated always as identity primary key,
  locale       text    not null default 'uk',
  before_label text    not null,
  after_label  text    not null,
  treatment    text    not null,
  duration     text    not null,
  sort_order   int     not null default 0,
  active       boolean not null default true,
  created_at   timestamptz default now()
);

-- ── reviews ──────────────────────────────────────────────────────────────────
create table if not exists reviews (
  id         bigint generated always as identity primary key,
  locale     text    not null default 'uk',
  quote      text    not null,
  name       text    not null,
  since      text    not null,
  bg         text    not null default '#E1F5EE',
  color      text    not null default '#2a6b4f',
  initials   text    not null,
  sort_order int     not null default 0,
  active     boolean not null default true,
  created_at timestamptz default now()
);

-- ── price_categories ─────────────────────────────────────────────────────────
create table if not exists price_categories (
  id         bigint generated always as identity primary key,
  locale     text    not null default 'uk',
  name       text    not null,
  sort_order int     not null default 0,
  active     boolean not null default true,
  created_at timestamptz default now()
);

-- ── price_items ──────────────────────────────────────────────────────────────
create table if not exists price_items (
  id          bigint generated always as identity primary key,
  category_id bigint references price_categories(id) on delete cascade,
  name        text    not null,
  price       text    not null,
  sort_order  int     not null default 0,
  active      boolean not null default true,
  created_at  timestamptz default now()
);

-- ── Row Level Security ───────────────────────────────────────────────────────
alter table team             enable row level security;
alter table cases            enable row level security;
alter table reviews          enable row level security;
alter table price_categories enable row level security;
alter table price_items      enable row level security;

drop policy if exists "public_read_team"             on team;
drop policy if exists "public_read_cases"            on cases;
drop policy if exists "public_read_reviews"          on reviews;
drop policy if exists "public_read_price_categories" on price_categories;
drop policy if exists "public_read_price_items"      on price_items;

create policy "public_read_team"             on team             for select using (true);
create policy "public_read_cases"            on cases            for select using (true);
create policy "public_read_reviews"          on reviews          for select using (true);
create policy "public_read_price_categories" on price_categories for select using (true);
create policy "public_read_price_items"      on price_items      for select using (true);

-- ── Seed — skip if data already exists ───────────────────────────────────────
do $$ begin

  if not exists (select 1 from team limit 1) then
    insert into team (locale, name, title, bio, years, years_label, img_alt, sort_order) values
      ('uk', 'Д-р Чиркова', 'Лікар-стоматолог · Косметична та реставраційна стоматологія',
       'Я відкрила Chirkova Dentist з однією метою: щоб пацієнти почувались дійсно почутими — а не просто зубом у конвеєрі. Кожна усмішка — це унікальна історія.',
       14, 'Років практики', 'Д-р Чиркова', 0),
      ('uk', 'Д-р Мельник', 'Ортодонт · Елайнери та брекет-системи',
       'Спеціалізується на ортодонтичному лікуванні з використанням сучасних елайнерів та цифрового планування. Понад 800 завершених ортодонтичних випадків.',
       9, 'Років практики', 'Д-р Мельник', 1),
      ('en', 'Dr. Chirkova', 'DMD · Cosmetic & Restorative Dentistry',
       'I started Chirkova Dentist with one belief: that patients deserve a space where they feel genuinely seen — not rushed through a procedure. Every smile has a unique story.',
       14, 'Years of practice', 'Dr. Chirkova', 0),
      ('en', 'Dr. Melnyk', 'Orthodontist · Aligners & Braces',
       'Specialises in orthodontic treatment using modern clear aligners and digital smile planning. Over 800 completed orthodontic cases and counting.',
       9, 'Years of practice', 'Dr. Melnyk', 1);
  end if;

  if not exists (select 1 from cases limit 1) then
    insert into cases (locale, before_label, after_label, treatment, duration, sort_order) values
      ('uk', 'Криві, потемнілі зуби',  'Порцелянові вініри — природна білість', '8 вінірів',    '2 тижні',   0),
      ('uk', 'Відсутній передній зуб', 'Імплант із керамічною коронкою',        'Один імплант', '3 місяці',  1),
      ('uk', 'Жовте забарвлення',      'Яскравий рівномірний відтінок',         'Zoom-відбіл',  '1 сеанс',   2),
      ('uk', 'Скупченість зубів',      'Рівна, впевнена усмішка',               'Елайнери',     '8 місяців', 3),
      ('en', 'Crooked, stained teeth',  'Porcelain veneers — natural white', '8 Veneers',     '2 weeks',   0),
      ('en', 'Missing front tooth',     'Implant with ceramic crown',        'Single implant','3 months',  1),
      ('en', 'Yellow discoloration',    'Bright, even white shade',          'Zoom whitening','1 session', 2),
      ('en', 'Misaligned, crowded',     'Straight, confident smile',         'Aligners',      '8 months',  3);
  end if;

  if not exists (select 1 from reviews limit 1) then
    insert into reviews (locale, quote, name, since, bg, color, initials, sort_order) values
      ('uk', 'Все своє життя я боялась стоматологів. Тут я відчула себе спокійно, шанованою та по-справжньому почутою.',
       'Аліна Коваленко', '2019', '#E1F5EE', '#2a6b4f', 'АК', 0),
      ('uk', 'Вініри, які створила для мене лікар, неймовірні. Здається, вона ліпила їх під моє обличчя.',
       'Максим Дубенко', '2022', '#FAEEDA', '#633806', 'МД', 1),
      ('uk', 'Профійно, тепло та чесно. Жодного нав''язування, жодного тиску. Їду 2 години — воно того варте.',
       'Олена Сидоренко', '2021', '#EEEDFE', '#3C3489', 'ОС', 2),
      ('en', 'I was terrified of dentists my whole life. Here I felt calm, respected, and genuinely cared for.',
       'Alina Kovalenko', '2019', '#E1F5EE', '#2a6b4f', 'AK', 0),
      ('en', 'The veneers are extraordinary. It feels like they were sculpted for my face.',
       'Maksym Dubenko', '2022', '#FAEEDA', '#633806', 'MD', 1),
      ('en', 'Professional, warm, and honest. No upselling, no pressure. I travel 2 hours each way — worth it.',
       'Olena Sydorenko', '2021', '#EEEDFE', '#3C3489', 'OS', 2);
  end if;

end $$;

-- ── Prices seed — handled separately in prices.sql ───────────────────────────
-- Run supabase/prices.sql to insert price_categories + price_items seed data.
