#!/usr/bin/env python3
"""Link check: internal refs must exist; every external URL in the site must resolve (200 after redirects).
Usage (repo root): python3 tools/linkcheck.py . [--no-external]"""
import re,os,sys,glob,urllib.request,concurrent.futures as cf
root=sys.argv[1] if len(sys.argv)>1 else "."; bad=[]
files=[os.path.join(root,"index.html")]+glob.glob(os.path.join(root,"js","*.js"))
ext=set(); n=0
for f in files:
    s=open(f,encoding="utf-8").read()
    for h in re.findall(r'(?:href|src)=["\']([^"\'$]+)["\']',s)+re.findall(r'["\']((?:assets|css|js)/[^"\'$]+\.[a-z0-9]+)["\']',s):
        if h.startswith(("http","#","data:","mailto:")): continue
        n+=1
        if not os.path.exists(os.path.join(root,h.split("#")[0])): bad.append((f,h))
    ext|=set(u.rstrip('.,);') for u in re.findall(r'https://[^\s"\'<>`\\]+',s) if not re.search(r'^https://(i\.ytimg\.com|www\.youtube-nocookie\.com)[;/]?$|localhost|example\.com|<|\$|\{|login\.salesforce\.com/services|login\.microsoftonline|service-now\.com|workday\.com|iam\.cloud\.ibm\.com/identity|iam\.platform|watson-orchestrate\.cloud\.ibm\.com',u))
ext.discard("https://graph.microsoft.com"); ext.discard("https://management.azure.com/")
print(f"internal refs {n}, broken {len(bad)}")
for b in bad: print("BROKEN",*b)
if "--no-external" not in sys.argv:
    def chk(u):
        try:
            r=urllib.request.urlopen(urllib.request.Request(u,headers={"User-Agent":"Mozilla/5.0"}),timeout=25); return u,r.status
        except Exception as e: return u,getattr(e,"code",str(e))
    with cf.ThreadPoolExecutor(8) as ex: res=list(ex.map(chk,sorted(ext)))
    # ibm.com/docs answers 403 to non-browser clients (bot protection); listed, not failed
    soft=[r for r in res if r[1]==403 and "ibm.com/docs/" in r[0]]
    fails=[r for r in res if r[1]!=200 and r not in soft]
    for u,c in soft: print("SOFT",c,u)
    print(f"external urls {len(res)}, failing {len(fails)}")
    for u,c in fails: print("FAIL",c,u)
    bad+=fails
sys.exit(1 if bad else 0)
