#!/usr/bin/env python3
"""Fail if any published file contains a local machine path or workstation detail.
Usage (repo root): python3 tools/check_no_local_paths.py [.]"""
import os, re, sys
ROOT = sys.argv[1] if len(sys.argv) > 1 else "."
PATTERNS = [
    (r"(?<![A-Za-z0-9])[A-Za-z]:(\\\\?|/)(?!/)", "drive-letter path"),
    (r"\\\\Users\\\\|\\Users\\|/Users/[A-Za-z]", "user-profile path"),
    (r"(?<![A-Za-z0-9.])/home/[A-Za-z]", "/home path"),
    (r"(?<![A-Za-z0-9.])/workspace/", "/workspace path"),
    
    (r"build_library\.py", "private build script"),
    (r"(?m)(^|[>`\s])cd\s+(\"|')?([A-Za-z]:|~|/|\\\\|\.\.?[\\/])", "cd command"),
    (r"(?m)(^|[>`\s])nlm\s+[a-z-]+\s", "nlm CLI line"),
    (r"Learning\\\\|Learning\\[A-Za-z]", "vault backslash path"),
]
SKIP_DIRS = {".git", "tools", "node_modules"}
EXT = {".html", ".js", ".json", ".md", ".css", ".txt", ".svg", ".webmanifest", ".xml", ".csv"}
hits = 0
for d, dirs, files in os.walk(ROOT):
    dirs[:] = [x for x in dirs if x not in SKIP_DIRS]
    for f in files:
        if os.path.splitext(f)[1].lower() not in EXT: continue
        p = os.path.join(d, f)
        for n, line in enumerate(open(p, encoding="utf-8", errors="replace"), 1):
            for pat, label in PATTERNS:
                m = re.search(pat, line)
                if m:
                    hits += 1
                    s = max(0, m.start() - 40)
                    print(f"{os.path.relpath(p, ROOT)}:{n}: [{label}] ...{line[s:m.end()+50].strip()}...")
print(f"local-path hits: {hits}")
sys.exit(1 if hits else 0)
