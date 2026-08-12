<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# Looplyn Agent Guidelines & Strict Operating Rules

## CRITICAL BEHAVIORAL & WORKFLOW RULES (PERMANENT)
1. **NO CODE MODIFICATIONS WITHOUT EXPLICIT PERMISSION**:
   - NEVER make code edits, file changes, or execute modifying logic autonomously without prior discussion and explicit user confirmation.
   - Any question (`?`), discussion topic, or inquiry MUST be answered with clear, detailed explanations FIRST.
2. **DETAILED TECHNICAL REASONING REQUIRED**:
   - Explain every detail, technical trade-off, and justification (down to single lines or structural changes) BEFORE proposing any implementation.
3. **NEVER BE OVERSMART OR ASSUME**:
   - Always ask for intent and align on design decisions with the user before touching any files.
4. **GIT PUSH DIRECTIVE**:
   - NEVER run `git push` autonomously or automatically after committing.
   - ALWAYS perform local commits (`git commit`) only, and wait until the user explicitly requests/commands `git push`.

<!-- END:nextjs-agent-rules -->
