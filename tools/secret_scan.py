#!/usr/bin/env python3
"""Fail on anything that looks like a credential. Usage: python3 tools/secret_scan.py ."""
import os,re,sys
root=sys.argv[1] if len(sys.argv)>1 else "."
P=[(r"eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}","JWT"),(r"gh[pousr]_[A-Za-z0-9]{30,}","GitHub token"),(r"github_pat_[A-Za-z0-9_]{20,}","GitHub PAT"),
   (r"AKIA[0-9A-Z]{16}","AWS key"),(r"-----BEGIN [A-Z ]*PRIVATE KEY-----","private key"),(r"[A-Za-z0-9~_.-]{3}8Q~[A-Za-z0-9~_.-]{31,34}","Entra client secret"),
   (r"(?i)(client_secret|password|api[_-]?key)\s*[:=]\s*['\"][^'\"<$]{8,}['\"]","assigned secret"),(r"AccountKey=[A-Za-z0-9+/=]{20,}","storage key"),(r"xox[baprs]-[A-Za-z0-9-]{10,}","Slack token")]
hits=0
for d,ds,fs in os.walk(root):
    ds[:]=[x for x in ds if x not in(".git","node_modules")]
    for f in fs:
        if f.endswith((".png",".jpg",".ico")): continue
        p=os.path.join(d,f)
        for i,l in enumerate(open(p,encoding="utf-8",errors="replace"),1):
            for pat,lab in P:
                if re.search(pat,l): hits+=1; print(f"{os.path.relpath(p,root)}:{i}: [{lab}]")
print(f"secret-scan hits: {hits}"); sys.exit(1 if hits else 0)
