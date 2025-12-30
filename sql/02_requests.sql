/*
==================================================
File Name:    02_requests.sql
Created On:   2025-12-29
Purpose:      Stores user-submitted AI decision
              requests. Acts as the source-of-truth
              input layer for all analyses.
==================================================
*/

create table requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  input_type text not null, -- e.g. 'resume_screening'
  input_text text not null,
  created_at timestamptz default now()
);
