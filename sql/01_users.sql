/*
==================================================
File Name:    01_users.sql
Created On:   2025-12-29
Purpose:      Stores application users and roles.
              Supports future authentication,
              authorization, and governance controls.
==================================================
*/

create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text not null default 'user',
  created_at timestamptz default now()
);
