-- ─────────────────────────────────────────────────────────────────────────────
-- Chirkova Dentist — FULL Supabase schema (single source of truth)
-- Safe to re-run: tables use IF NOT EXISTS, seeds skip when data already exists.
-- Run once in the Supabase SQL editor. Replaces the old prices/services snippets.
-- ─────────────────────────────────────────────────────────────────────────────

-- ╔══ TABLES ══════════════════════════════════════════════════════════════════╗

create table if not exists team (
  id          bigint generated always as identity primary key,
  locale      text    not null default 'uk',
  name        text    not null,
  title       text    not null,
  bio         text    not null,
  years       int     not null default 0,
  years_label text    not null,
  img         text,
  img_alt     text    not null default '',
  sort_order  int     not null default 0,
  active      boolean not null default true,
  created_at  timestamptz default now()
);
alter table team add column if not exists img text;

create table if not exists cases (
  id           bigint generated always as identity primary key,
  locale       text    not null default 'uk',
  before_label text    not null,
  after_label  text    not null,
  treatment    text    not null,
  duration     text    not null,
  before_img   text,
  after_img    text,
  sort_order   int     not null default 0,
  active       boolean not null default true,
  created_at   timestamptz default now()
);
alter table cases add column if not exists before_img text;
alter table cases add column if not exists after_img text;

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

create table if not exists price_categories (
  id         bigint generated always as identity primary key,
  locale     text    not null default 'uk',
  name       text    not null,
  sort_order int     not null default 0,
  active     boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists price_items (
  id          bigint generated always as identity primary key,
  category_id bigint references price_categories(id) on delete cascade,
  name        text    not null,
  price       text    not null,
  sort_order  int     not null default 0,
  active      boolean not null default true,
  created_at  timestamptz default now()
);

create table if not exists services (
  id             bigint generated always as identity primary key,
  locale         text    not null default 'uk',
  name           text    not null,
  description    text    not null,
  starting_price text    not null default '',
  img            text    not null default '',
  sort_order     int     not null default 0,
  active         boolean not null default true,
  created_at     timestamptz default now()
);
alter table services add column if not exists starting_price text not null default '';

-- contact form submissions (written by the site's contact form)
create table if not exists contact_requests (
  id          uuid default gen_random_uuid() primary key,
  name        text not null,
  phone       text not null,
  service     text,
  contact_via text,
  note        text,
  source      text default 'main_form',
  created_at  timestamptz default now()
);

-- ╔══ ROW LEVEL SECURITY ══════════════════════════════════════════════════════╗

alter table team             enable row level security;
alter table cases            enable row level security;
alter table reviews          enable row level security;
alter table price_categories enable row level security;
alter table price_items      enable row level security;
alter table services         enable row level security;
alter table contact_requests enable row level security;

-- public read for content tables
drop policy if exists "public_read_team"             on team;
drop policy if exists "public_read_cases"            on cases;
drop policy if exists "public_read_reviews"          on reviews;
drop policy if exists "public_read_price_categories" on price_categories;
drop policy if exists "public_read_price_items"      on price_items;
drop policy if exists "public_read_services"         on services;

create policy "public_read_team"             on team             for select using (true);
create policy "public_read_cases"            on cases            for select using (true);
create policy "public_read_reviews"          on reviews          for select using (true);
create policy "public_read_price_categories" on price_categories for select using (true);
create policy "public_read_price_items"      on price_items      for select using (true);
create policy "public_read_services"         on services         for select using (true);

-- contact_requests: allow anonymous INSERT only (no public read)
drop policy if exists "anon_insert_contact" on contact_requests;
create policy "anon_insert_contact" on contact_requests for insert to anon with check (true);

-- ╔══ SEED DATA (skips if a table already has rows) ════════════════════════════╗

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

  if not exists (select 1 from services limit 1) then
    insert into services (locale, name, description, starting_price, sort_order) values
      ('uk', 'Вініри',       'Кастомний фарфор. 2 тижні.',            'від 8 000 грн',  0),
      ('uk', 'Імпланти',     'Титанові корені. Назавжди.',             'від 18 000 грн', 1),
      ('uk', 'Елайнери',     'Ніхто не помітить. Ти — відчуєш.',      'від 25 000 грн', 2),
      ('uk', 'Відбілювання', '1 сеанс. 8 тонів яскравіше.',           'від 3 500 грн',  3),
      ('uk', 'Огляд',        '30 хв. Повний скан. Кава включена.',    'БЕЗКОШТОВНО',    4),
      ('uk', 'Терміново',    'Зламаний зуб? Того ж дня.',             'Телефонуй',      5),
      ('en', 'Veneers',      'Custom porcelain. 2 weeks.',            'from 8 000 UAH',  0),
      ('en', 'Implants',     'Titanium roots. For life.',             'from 18 000 UAH', 1),
      ('en', 'Aligners',     'No one will notice. You will feel it.', 'from 25 000 UAH', 2),
      ('en', 'Whitening',    '1 session. 8 shades brighter.',         'from 3 500 UAH',  3),
      ('en', 'Check-up',     '30 min. Full scan. Coffee included.',   'FREE',            4),
      ('en', 'Emergency',    'Broken tooth? Same day.',               'Call us',         5);
  end if;

  if not exists (select 1 from price_categories limit 1) then
    -- Ukrainian
    with cats as (
      insert into price_categories (locale, name, sort_order) values
        ('uk', 'Консультація', 0), ('uk', 'Косметика', 1), ('uk', 'Імпланти', 2),
        ('uk', 'Ортодонтія', 3), ('uk', 'Профілактика', 4)
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

    -- English
    with cats as (
      insert into price_categories (locale, name, sort_order) values
        ('en', 'Consultation', 0), ('en', 'Cosmetics', 1), ('en', 'Implants', 2),
        ('en', 'Orthodontics', 3), ('en', 'Prevention', 4)
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
  end if;
end $$;

-- ╔══ OPTIONAL: attach before/after images (bucket "images", must be Public) ═══╗
-- update cases set
--   before_img = 'https://llkdpfnenxkdqzfphkmq.supabase.co/storage/v1/object/public/images/image1.png',
--   after_img  = 'https://llkdpfnenxkdqzfphkmq.supabase.co/storage/v1/object/public/images/image2.png'
-- where treatment in ('8 вінірів', '8 Veneers');
