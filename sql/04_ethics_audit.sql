/*
==================================================
File Name:    04_ethics_audit.sql
Created On:   2025-12-29
Purpose:      Stores bias indicators, ethical risk
              assessments, and fairness notes
              associated with AI requests.
==================================================
*/

create table ethics_audit (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references requests(id) on delete cascade,
  bias_flags jsonb,
  risk_level text not null, -- LOW / MEDIUM / HIGH
  fairness_notes text,
  created_at timestamptz default now()
);
