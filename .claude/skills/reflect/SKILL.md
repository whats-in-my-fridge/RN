---
name: reflect
description: Crystallize the current session's learnings into atomic memory fragments. Use when the user asks to "reflect", "기억 저장", "save this session", "remember what we did", or at natural session end points.
disable-model-invocation: true
allowed-tools: Read, Grep, Write, Edit
---

# Session Memory Crystallization

Memory directory: `/c/Users/dlxor/.claude/projects/c--Projects-Capstone-RN-RN/memory`

Analyze this conversation and extract key information as atomic memory fragments.

## Fragment Format

```
### F[YYYYMMDD-N] | [type] | importance:[1-10] | [YYYY-MM-DD]
[Content. 1-3 self-contained sentences that make sense without any other context.]
tags: [keyword1, keyword2, keyword3]
links: [F-id (caused_by|resolved_by|related|superseded_by)] — omit if none
```

## Fragment Types & Rules

| type | 망각 가능 | 기본 importance |
|------|----------|-----------------|
| error | 불가 | 9 |
| preference | 불가 | 8 |
| decision | 가능 | 7 |
| procedure | 가능 | 6 |
| fact | 가능 | 5 |
| relation | 가능 | 4 |

## Steps

1. **Check for duplicates**: Grep `memory/fragments/` for keywords from candidate fragments. Skip anything already captured.

2. **Extract new fragments** from this session — only genuinely new information:
   - `error` — any failure, bug, unexpected behavior (include resolution if found)
   - `preference` — user's workflow, style, or communication preferences expressed
   - `decision` — architectural/implementation choices with rationale
   - `procedure` — repeatable step-by-step process
   - `fact` — stable technical facts about the project or stack
   - `relation` — dependency or connection between two components/modules

3. **Append to correct file** in `memory/fragments/`:
   - errors → `errors.md`
   - preferences → `preferences.md`
   - decisions → `decisions.md`
   - facts → `facts.md`
   - procedures → `procedures.md`
   - relations → `relations.md`

4. **Update `memory/MEMORY.md`** for fragments where type is `error` or `preference`, OR importance >= 8.
   Keep MEMORY.md under 200 lines. If over limit, remove or one-line-summarize old low-importance entries.

5. **Print summary**: N fragments created, N updated, broken down by type. If session had no new information worth saving, say so explicitly — do not pad.
