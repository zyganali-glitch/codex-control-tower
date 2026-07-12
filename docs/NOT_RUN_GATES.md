# Root Repository NOT_RUN Gates

The following checks are intentionally visible and must not be described as passed:

| Gate | Status | Why | Next evidence |
| --- | --- | --- | --- |
| Remote commit match | NOT_RUN | No release commit has been pushed at this checkpoint. | Compare `git rev-parse HEAD` with `git ls-remote origin refs/heads/main`. |
| GitHub-hosted CI | NOT_RUN | Requires the public push. | Observe the workflow result for the pushed SHA. |
| Published Devpost rules review | NOT_RUN | Detailed rules were not yet published on 12 July 2026. | Recheck the official rules page on/after challenge opening. |
| Final screenshot privacy review | NOT_RUN | Existing temporary captures are not submission assets. | Capture sanitized repo-relative screens and inspect each frame. |
| Accessibility audit | NOT_RUN | No automated or manual accessibility audit was executed. | Run keyboard, contrast, semantics, and screen-reader checks. |
| Load/concurrency test | NOT_RUN | The product is a local CLI/dashboard prototype. | Define a realistic corpus and performance budget. |
| Real OpenAI/provider integration | NOT_RUN | Default product deliberately requires no API key. | Only run an explicitly enabled optional integration. |
| Independent security review | NOT_RUN | No external reviewer has signed off. | Review filesystem, command, dependency, and publication boundaries. |
| Deployment | NOT_RUN | No hosted product is claimed. | Add only if the competition submission requires it. |
