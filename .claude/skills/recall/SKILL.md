---
name: recall
description: Search memory fragments for past learnings relevant to a topic. Use when the user asks to "recall", "기억 찾아줘", "what do you remember about [X]", "check memory", or when past context on a specific topic would help.
allowed-tools: Read, Grep
---

# Memory Recall

Memory directory: `/c/Users/dlxor/.claude/projects/c--Projects-Capstone-RN-RN/memory`

Search for fragments relevant to: $ARGUMENTS

## Steps

1. **Read `memory/MEMORY.md`** — scan for immediate hits on the topic.

2. **Grep `memory/fragments/`** — search all fragment files for the keywords in $ARGUMENTS.
   Search both content and tags fields.

3. **Rank results**:
   - Type `error` or `preference` → always include if even loosely related
   - Exact keyword match in content → highest priority
   - Keyword in tags only → medium priority
   - Linked fragments (one hop via `links:`) → include if parent is relevant

4. **Return top 10 fragments** with:
   - Fragment ID, type, importance, date
   - Full content
   - Any direct links (one hop only — do not recurse further)

5. If $ARGUMENTS is empty, return the 10 most recently added fragments across all files.

## Output Format

```
[F20250101-1 | error | importance:9 | 2025-01-01]
Content of the fragment here.
tags: tag1, tag2
links: F20250101-2 (resolved_by)
---
```

If no relevant fragments found, say so directly. Do not fabricate or approximate memories.
