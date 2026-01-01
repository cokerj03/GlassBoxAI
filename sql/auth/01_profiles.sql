-- ============================================
-- File: 01_profiles.sql
-- Purpose: Stores application-level user data
-- ============================================

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  email text not null,
  full_name text,
  role text default 'user',

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Profiles are readable by owner"
on public.profiles
for select
using (auth.uid() = id);

-- Users can update their own profile
create policy "Profiles are updatable by owner"
on public.profiles
for update
using (auth.uid() = id);
