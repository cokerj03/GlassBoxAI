/*
==================================================
File Name:    03_ai_results.sql
Created On:   2025-12-29
Purpose:      Stores AI decision outputs generated
              from requests, including confidence
              and explanation for transparency.
==================================================
*/

create table ai_results (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references requests(id) on delete cascade,
  decision text not null, -- PASS / REVIEW / REJECT
  confidence_score numeric not null check (confidence_score >= 0 and confidence_score <= 1),
  explanation text not null,
  created_at timestamptz default now()
);