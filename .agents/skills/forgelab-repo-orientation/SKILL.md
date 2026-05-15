---
name: forgelab-repo-orientation
description: Use this skill when Codex needs to understand the ForgeLab repository before implementing, debugging, reviewing, or planning work. It should inspect the codebase structure, identify the stack, locate important modules, summarize architecture, and explain where future changes likely belong. Do not use it for tiny isolated edits where repository understanding is unnecessary.
---

# ForgeLab Repo Orientation

You are helping the developer understand the ForgeLab codebase before significant work begins.

ForgeLab is an AI-powered project execution workspace that helps solo developers, startup founders, and technical mentors turn vague software ideas into structured, research-backed, buildable products.

The product may include or later include:

- authentication
- workspaces
- projects
- raw idea capture
- AI-generated editable PRDs
- AI-generated editable milestone plans
- research topics, notes, and decisions
- document upload
- RAG-powered Q&A over project materials
- dashboard views for blockers, milestones, and recent decisions

## Your job

Inspect the repository and produce a clear orientation report.

Do not immediately propose large refactors.
Do not guess the stack if it can be found in files.
Do not overwhelm with every file; focus on the structure that matters.

## Required workflow

1. Inspect the repository tree.
2. Identify the major technical areas:
   - frontend
   - backend
   - database/schema
   - AI integration
   - document/RAG code, if present
   - authentication
   - testing
   - deployment/config
3. Locate the main entry points.
4. Identify the current architectural style.
5. Explain how data likely flows through the application.
6. Identify where a developer should look first for common tasks.
7. Identify areas that appear incomplete, unclear, or risky.

## Required output

# ForgeLab Repository Orientation

## 1. Current stack

State the stack found in the repo:

- frontend
- backend
- database
- ORM/query layer
- AI SDK/provider if present
- testing tools
- build/deployment tools

## 2. Top-level folder map

Show the important folders and what each one likely owns.

## 3. Runtime entry points

Identify:

- frontend start point
- backend start point
- API registration area
- database initialization if present

## 4. Domain/module map

Group code by ForgeLab business concerns where possible:

- auth
- workspaces
- projects
- PRDs
- milestones/tasks
- research
- documents/RAG
- dashboard

If some modules do not exist yet, say so.

## 5. Main request/data flow

Explain how a typical user action travels:
UI → API client → backend route/controller → service → database → response.

If the repository uses a different shape, describe the actual shape.

## 6. Key files worth reading first

List the most important files for a new developer to understand.

## 7. Architecture diagram

Generate a Mermaid flowchart showing the current architecture at a useful level of detail.

## 8. Development risks or confusion points

Call out:

- unclear boundaries
- missing abstractions
- duplicated patterns
- inconsistent organization
- areas likely to become problematic as ForgeLab grows

## 9. Where future work should likely go

When relevant, identify where upcoming features should probably be implemented.

## Rules

- Base the report on actual repo inspection.
- Distinguish clearly between what exists and what is only expected later.
- Be specific and concise.
- Prefer “I found” over “probably” when the repository confirms something.
