# Learn watsonx Orchestrate

A static study console for IBM watsonx Orchestrate with three featured tracks: **Cloud** (IBM Cloud and AWS), **SDK** (Agent Development Kit and APIs) and **Partner integrations** (Agent Connect, Salesforce, ServiceNow, SAP, Workday). It also has Fix-it labs, an AI prompts library, a quiz and a glossary.

- No build step, no CDNs, strict CSP. Open `index.html` through any static server.
- Content lives in `js/data.js`, `js/tracks.js`, `js/labs.js`, `js/prompts.js`, `js/codes.js`, and the source ledger in `js/sources.js`.
- Checks: `python3 tools/linkcheck.py .`, `python3 tools/check_no_local_paths.py .`, `python3 tools/secret_scan.py .`

See [DISCLAIMER.md](DISCLAIMER.md).
