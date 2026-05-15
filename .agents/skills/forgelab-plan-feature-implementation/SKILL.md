---
name: forgelab-plan-feature-implementation
description: Use this skill before implementing a meaningful ForgeLab feature. It should inspect the existing repo, determine what files and layers are affected, propose a safe implementation sequence, identify database/API/frontend/testing work, and expose risks before code is changed. Do not use it for trivial single-line edits.
---

# ForgeLab Feature Implementation Planner

You are preparing a ForgeLab feature for disciplined implementation.

This skill is for development planning, not product brainstorming.

## Your job

Given a feature request, inspect the existing ForgeLab repository and produce a concrete implementation plan that a developer can safely execute.

The plan must reflect the actual codebase, not an imaginary architecture.

## Required workflow

1. Restate the feature in engineering terms.
2. Inspect the repository areas likely to be affected.
3. Identify existing conventions to follow.
4. Determine whether the feature requires:
   - database/schema changes
   - backend route/controller changes
   - service/domain logic
   - API client changes
   - frontend components/pages
   - form validation
   - AI integration
   - file processing
   - tests
5. Propose the smallest valuable implementation slice.
6. Give a safe order of work.
7. Flag unknowns or risky assumptions before implementation.

## Required output

# ForgeLab Feature Implementation Plan

## 1. Feature to implement

Describe the feature precisely.

## 2. Existing repo findings

Summarize what relevant code already exists and what patterns should be followed.

## 3. Scope for this coding pass

Define exactly what should be built now.

## 4. Out of scope

Define what should not be added yet.

## 5. Files or areas likely to change

List actual files/directories if they can be identified from the repo.

Group by:

- database/schema
- backend
- frontend
- shared types/contracts
- tests
- config/env

## 6. Proposed implementation design

### Database

What data structures or schema changes are needed?

### Backend

What endpoints, services, validations, and authorization checks are needed?

### Frontend

What screens, components, forms, states, and API calls are needed?

### AI or RAG, if relevant

What should happen at the model/service boundary?

## 7. Data flow

Explain the feature flow from user action to persisted result.

Use a Mermaid sequence diagram when the flow is non-trivial.

## 8. Edge cases and failure states

Cover:

- invalid input
- loading states
- empty states
- unauthorized access
- server errors
- AI failures if relevant
- upload/processing failures if relevant

## 9. Test plan

Specify:

- unit tests
- integration tests
- UI/manual verification steps

## 10. Safe implementation order

Provide an ordered sequence:

1.
2.
3.
4.

The sequence should reduce rework and make debugging easier.

## 11. Risks and technical decisions

List risks, unresolved questions, or trade-offs that matter before coding.

## 12. Definition of done

State exactly what proves this feature is complete for the current pass.

## 13. First coding step

End with the first concrete change that should be made.

## Rules

- Inspect the repo before planning.
- Follow existing conventions where they are sound.
- Prefer minimal vertical progress over broad unfinished scaffolding.
- Do not silently expand scope.
- Do not treat tests as optional.
- If architecture is unclear, say so and recommend the smallest clarifying move.
