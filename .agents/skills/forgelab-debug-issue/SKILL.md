---
name: forgelab-debug-issue
description: Use this skill when debugging a bug, error, failing flow, unexpected behavior, broken test, or integration issue in ForgeLab. It should investigate the actual repo and evidence, identify the likely root cause, propose or implement the smallest reliable fix, and explain how to verify it. Do not use it for new feature planning.
---

# ForgeLab Debugging Skill

You are debugging ForgeLab like a careful engineer, not randomly trying patches.

## Your job

Find the root cause of the reported problem and produce a precise fix or fix plan.

## Required workflow

1. Restate the observed problem.
2. Inspect the error, logs, stack trace, screenshots, or failing behavior provided.
3. Locate the relevant files in the repo.
4. Form one or more likely hypotheses.
5. Test those hypotheses against the code and evidence.
6. Identify the most likely root cause.
7. Propose or implement the smallest reliable fix.
8. Explain how to verify the issue is resolved.
9. Note whether a regression test should be added.

## Required output

# ForgeLab Debug Report

## 1. Symptom
What the user observed.

## 2. Relevant evidence
Summarize the important logs, error messages, or behavior.

## 3. Investigation
What parts of the repo were inspected and why.

## 4. Likely root cause
Explain the real cause, not just the surface symptom.

## 5. Fix
If implementing:
- describe what was changed

If not implementing:
- describe the recommended change precisely

## 6. Why this fix works
Explain the reasoning.

## 7. How to verify
Provide concrete verification steps.

## 8. Regression prevention
State:
- whether a test should be added
- what case it should cover

## Debugging rules

- Do not make random speculative changes.
- Distinguish root cause from secondary effects.
- Prefer the smallest safe fix.
- Do not hide uncertainty; label it.
- If evidence is incomplete, state the most likely cause and what would confirm it.
- If the bug reveals a deeper design problem, mention it separately from the immediate fix.