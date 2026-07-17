# Root Repository Mistake Shield

Verdict: **CAUTION**

## Destructive Action Preflight

The v0.2.0 structured preflight is the first safety surface for supported destructive intent. It does not execute a command.

Recorded exhibit:

| Field | Value |
| --- | --- |
| Operation | `recursive_delete` |
| Requested target | `$HOME/..` |
| Resolved boundary | `<USER_HOME_PARENT>` |
| Decision | `BLOCKED` |
| Execution | `NOT_RUN` |
| Executed | `false` |
| Review | `HUMAN REVIEW REQUIRED` |

The analyzer compares the canonical target—not only the typed string—with filesystem root, user home/parent, a verified Git repository root, `.git`, outside-repository paths, and symlink/inspection uncertainty. Unsupported variables, substitution, chaining, wildcards, multiple targets, and unsupported command forms fail closed. A specific non-symlinked repository subpath is only `CAUTION`, never a destructive CLEAR.

Public output uses redacted boundary tokens. Tests and `npm run demo:safety` use harmless intent strings/fixture paths and perform no deletion.

## Legacy action-text compatibility check

The older `cct mistake-shield --action <text>` interface remains available. It combines Review Gate scope, destructive/high-risk words, known repository risks, and Memory Lens minefields. When it recognizes the documented destructive-command subset, it attaches the structured preflight.

Legacy `CLEAR` means only that no configured rule matched. It is not approval and it is never a claim that an action is safe.

## Optional Codex hook boundary

The repository's optional hook matches `Bash` `PreToolUse`. BLOCKED can return the documented deny result; CAUTION can only add context. A real check denied a nonexistent harmless probe before execution with Codex CLI `0.144.3`, `gpt-5.6-sol`, and a read-only sandbox. The check used a one-off vetted hook-trust bypass only, not approval or sandbox bypass.

Normal project/hash trust was not verified. Official Codex hook coverage is incomplete, hook failure may allow the tool workflow to continue, and unsupported/nested tool paths are outside the proof. Sandboxing and permissions remain primary.

## Current root action

The sanitized v0.2.0 panel has passed 1920×1080 visual and privacy review. Record new clip 03 from the prepared Shield view, then keep the real public YouTube URL, replacement clip 11, and immutable v2 tag/release pending until their external dependencies exist.
