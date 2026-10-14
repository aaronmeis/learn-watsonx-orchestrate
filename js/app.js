(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=t=>String(t==null?"":t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const SRC=Object.fromEntries(SOURCES.map(s=>[s.n,s]));
const LS={get(k,d){try{const v=localStorage.getItem("lwxo:"+k);return v?JSON.parse(v):d;}catch(e){return d;}},set(k,v){try{localStorage.setItem("lwxo:"+k,JSON.stringify(v));}catch(e){}}};
/* text -> html with S# chips and code chips */
function chip(n){const s=SRC[n];return s?`<a class="cite" href="${esc(s.u)}" target="_blank" rel="noopener" data-src="${n}" title="${esc(s.t)}">S${n}</a>`:"S"+n;}
function rich(t){
  let h=esc(t);
  h=h.replace(/\{\{(.+?)\}\}/g,(m,k)=>{const raw=k.replace(/&amp;/g,"&").replace(/&quot;/g,'"');return CODES[raw]?`<button type="button" class="code" data-code="${esc(raw)}">${k}</button>`:k;});
  h=h.replace(/\[((?:S\d+)(?:\s*,\s*S\d+)*)\]/g,(m,inner)=>"["+inner.replace(/S(\d+)/g,(x,n)=>chip(+n))+"]");
  return h;
}
const srcs=a=>(a&&a.length)?"["+a.map(chip).join(", ")+"]":"";
const strip=t=>String(t).replace(/\{\{(.+?)\}\}/g,"$1").replace(/\[S[\d, S]+\]/g,"");

/* ---- views ---- */
const V={};
V.today=()=>`<span class="badge">Study console</span>
<h1>IBM watsonx Orchestrate, from the inside</h1>
<p class="lead">How watsonx Orchestrate works, from two angles: running it in the cloud and building on it with the ADK. Plus how it plugs into Salesforce, ServiceNow, SAP and Workday. Every claim links to its source (${SOURCES.length} in the ledger); tap a <button type="button" class="code" data-code="ADK">dashed code</button> to see what it means.</p>
<div class="card" style="margin:1rem 0"><h2 style="margin-top:0">About this site</h2><p>An independent learning resource for IBM watsonx Orchestrate: a Start here intro, three tracks (Cloud, SDK, Partner integrations), a control-plane deep dive, ${LABS.length} Fix-it labs, ${PROMPTS.length} AI prompts, a quiz, a glossary and a source ledger. New here? Start with Block 0, pick a track, then try the labs.</p><a class="b" href="#/about">About this site →</a> <a class="b" href="#/curriculum/0">Start here →</a></div>
<div class="grid">${Object.entries(TRACKS).map(([k,T])=>`<div class="card" style="border-color:var(--acc)"><span class="badge">Featured track</span><h2 style="margin-top:.5rem">${esc(T.name)}</h2><p>${esc(T.intro)}</p><a class="b sel" href="#/${k}">Open →</a> <a class="b" href="#/${k}/lab">Lab</a> <a class="b" href="#/${k}/trouble">Troubleshoot</a></div>`).join("")}</div>
<h2>What's here</h2><div class="grid">
${[["curriculum/0","Start here: Block 0","What it is, where it came from (Watson Orchestrate 2021 → watsonx 2023 → agents 2025), and why it exists."],["curriculum/6","Deep dive: control plane","Agentic control plane, orchestrator agent, AI Gateway, eCommerce pilot, and what's only announced."],["methods","Ways to interact","UI, ADK CLI, Python, REST API, embedded chat, Terraform side by side."],["picker","Which method should I use?","Answer three questions, get a recommendation."],["limits","Limits and gotchas","Tenant limits, timeouts, token lifetimes, file sizes."],["prompts","AI prompts",PROMPTS.length+" fill-in prompts in "+PROMPT_CATS.length+" groups, including partner scenarios. Redact first."],["labs","Fix-it labs",LABS.length+" broken setups across Cloud, SDK and Partners."],["guides","Step-by-step guides",GUIDES.length+" hands-on walkthroughs."],["map","Map","What Orchestrate connects to."],["path","Learning path","IBM's own docs in order."]].map(([h,t,d])=>`<div class="card"><h3>${t}</h3><p>${esc(d)}</p><a class="b" href="#/${h}">Open →</a></div>`).join("")}
</div>`;

V.about=()=>`<h1>About this site</h1>
<p class="lead">Learn watsonx Orchestrate is an independent study site for IBM watsonx Orchestrate. It's a learning resource, not IBM's documentation. Everything here points back to IBM's own docs, so you can check a claim in one tap.</p>
<h2>What's inside</h2><ul style="padding-left:1.2rem">
<li><a href="#/curriculum/0">Start here (Block 0)</a>: what Orchestrate is, where it came from, and why it exists, with a few "why do we even do this?" questions.</li>
<li>Three tracks: <a href="#/cloud">Cloud</a> (IBM Cloud and AWS), <a href="#/sdk">SDK</a> (the Agent Development Kit and APIs) and <a href="#/partners">Partner integrations</a> (Agent Connect, Salesforce, ServiceNow, SAP, Workday).</li>
<li><a href="#/curriculum/6">Control-plane deep dive</a>: the agentic control plane, orchestrator agent and AI Gateway, and what's only announced.</li>
<li><a href="#/labs">${LABS.length} Fix-it labs</a>: broken setups with an error, clues one at a time, and a fix to pick.</li>
<li><a href="#/prompts">${PROMPTS.length} AI prompts</a> with fill-in blanks, grouped and searchable.</li>
<li>A <a href="#/quiz">quiz</a>, a <a href="#/glossary">glossary</a> for every code and acronym, and a <a href="#/refs">source ledger</a> of ${SOURCES.length} sources.</li></ul>
<h2>Who it's for</h2><p>People who want to understand how Orchestrate actually works: developers picking up the ADK, platform and cloud admins setting up instances, and anyone wiring it into Salesforce, ServiceNow, SAP or Workday. You don't need prior IBM experience.</p>
<h2>How to use it</h2><ol class="steps"><li>Read <a href="#/curriculum/0">Start here</a>.</li><li>Pick the track that matches your job: <a href="#/cloud">Cloud</a>, <a href="#/sdk">SDK</a> or <a href="#/partners">Partners</a>.</li><li>Break things on purpose in the <a href="#/labs">Fix-it labs</a>.</li><li>Check yourself with the <a href="#/quiz">quiz</a>.</li><li>Use the <a href="#/prompts">AI prompts</a> on your own scenarios. Redact first.</li></ol>
<div class="note flag" role="note"><b>Disclaimer.</b> Educational learning exercise only. Not affiliated with any company or individual, and not endorsed by or prepared for IBM, Salesforce, ServiceNow, SAP, Workday or anyone else. Not security, licensing or compliance advice; verify with official IBM documentation.</div>`;

V.curriculum=()=>`<h1>Curriculum</h1><p class="lead">${BLOCKS.length} blocks plus three featured tracks. Mark blocks done as you go.</p>
<div class="grid">${BLOCKS.map(b=>`<div class="card"><h3>${esc(b.t)}</h3><p>${esc(b.intro)}</p><p><small>About ${b.min} min</small> ${LS.get("done"+b.id,false)?'<span class="ok">✓ done</span>':""}</p><a class="b" href="#/curriculum/${b.id}">Open →</a></div>`).join("")}
${Object.entries(TRACKS).map(([k,T])=>`<div class="card"><h3>Track: ${esc(T.name)}</h3><p>${esc(T.intro.slice(0,120))}…</p><a class="b" href="#/${k}">Open →</a></div>`).join("")}</div>`;

function block(id){const b=BLOCKS.find(x=>x.id==id);if(!b)return V.curriculum();
 const qs=(b.check||[]).map(i=>QUIZ[i]).filter(Boolean);
 return `<a href="#/curriculum">← Curriculum</a><h1>${esc(b.t)}</h1><p class="lead">${rich(b.intro)}</p>
 ${b.sections.map(s=>`<h2>${esc(s.h)}</h2>${s.p.map(p=>`<p>${rich(p)}</p>`).join("")}`).join("")}
 ${b.socratic?`<h2>Why do we even need this?</h2><p>Think about each one before opening it.</p>${b.socratic.map(s=>`<details><summary>${esc(s.q)}</summary><p>${rich(s.a)}</p></details>`).join("")}`:""}
 ${qs.length?`<h2>Self-check</h2>${qs.map((q,i)=>quizItem(q,"b"+b.id+"-"+i)).join("")}`:""}
 <p><button type="button" class="b ${LS.get("done"+b.id,false)?"sel":""}" data-done="${b.id}">${LS.get("done"+b.id,false)?"✓ Marked done":"Mark block done"}</button></p>`;}

V.track=(k,sub)=>{const P=TRACKS[k];
 const nav=`<p><a class="b ${!sub?"sel":""}" href="#/${k}">Concepts</a><a class="b ${sub==="code"?"sel":""}" href="#/${k}/code">Code</a><a class="b ${sub==="lab"?"sel":""}" href="#/${k}/lab">Lab</a><a class="b ${sub==="trouble"?"sel":""}" href="#/${k}/trouble">Troubleshooter</a><a class="b" href="#/labs">Fix-it labs →</a></p>`;
 let body="";
 if(sub==="code") body=`<h2>Code samples</h2><p>Placeholders only. Keys and passwords come from environment variables or a vault, never the file.</p>${P.code.map(c=>`<h3>${esc(c.lang)} ${srcs(c.src)}</h3><pre>${esc(c.c)}</pre>`).join("")}${P.codeFlags.map(f=>`<div class="note flag"><b>Flag.</b> ${rich(f)}</div>`).join("")}`;
 else if(sub==="lab") body=`<h2>Hands-on lab</h2><div class="note">Use a trial or sandbox. Never paste a real key or token into chat, tickets or this site.</div><ol class="steps">${P.lab.map(s=>`<li>${rich(s)}</li>`).join("")}</ol>`;
 else if(sub==="trouble") body=troubleUI(k);
 else body=P.sections.map(s=>`<h2>${esc(s.h)}</h2>${s.p.map(p=>`<p class="${/not documented publicly|unverified|not fully documented/i.test(p)?"note flag":""}">${rich(p)}</p>`).join("")}`).join("");
 return `<span class="badge">Featured track</span><h1>${esc(P.name)}</h1><p class="lead">${rich(P.intro)}</p>${nav}${body}`;};
function troubleUI(k){const T=TRACKS[k].trouble;const st=window._tr&&window._tr.k===k?window._tr:{k};
 return `<h2>Troubleshooter</h2><p>Pick the symptom, then the closest detail.</p><div>${T.map((t,i)=>`<button type="button" class="b ${st.i===i?"sel":""}" data-tr="${i}" data-tk="${k}" aria-pressed="${st.i===i}">${esc(t.q)}</button>`).join("")}</div>
 ${st.i!=null?`<h3 style="margin-top:1rem">${esc(T[st.i].q)}</h3><div>${T[st.i].o.map((o,j)=>`<button type="button" class="b ${st.j===j?"sel":""}" data-tr2="${j}" aria-pressed="${st.j===j}">${esc(o[1])}</button>`).join("")}</div>`:""}
 ${st.i!=null&&st.j!=null?`<div class="note"><b>Try this.</b> ${T[st.i].o[st.j][2].map(rich).join(" ")}</div>`:""}`;}

V.map=()=>{const L=[["Users and channels","Orchestrate chat, embedded web chat, Slack, Teams, WhatsApp, phone",[25,26]],["Your apps","REST API: chat/completions, runs",[52,43]],["Partner agents","Agent Connect, catalog, external and A2A agents",[55,10,71]],["Models","AI gateway: watsonx.ai, Bedrock and other providers",[31,74]]],R=[["Salesforce","OAuth 2.0 auth code connection, sales agents",[59,49]],["ServiceNow","OAuth / basic connection, incident tools",[61,62]],["SAP","S/4HANA procurement agents, SuccessFactors",[63,64]],["Workday","OBO SSO via your IdP, HR agents",[66,68]]];
 const c=x=>`<div class="card"><h3>${x[0]}</h3><p>${x[1]} ${srcs(x[2])}</p></div>`;
 return `<h1>Map: what watsonx Orchestrate connects to</h1><p class="lead">Left: who talks to Orchestrate and what it runs on. Right: systems agents act on, through connections.</p>
 <div class="map"><div class="col">${L.map(c).join("")}</div><div class="hub">watsonx<br>Orchestrate</div><div class="col">${R.map(c).join("")}</div></div>
 <div class="note">Almost every arrow on the right is a connection (basic, API key, OAuth, OBO). When a tool fails, check the connection's kind, scope and draft/live config first ${srcs([18])}.</div>`;};

V.methods=()=>`<h1>Ways to interact with watsonx Orchestrate</h1><p class="lead">Same platform, many doors. Two questions sort them: are you defining agents or calling them, and do you need it repeatable (files and code) or once (UI). </p>
<div class="tw"><table><thead><tr><th>Method</th><th>Who it's for</th><th>Auth</th><th>Best for</th><th>Avoid for</th></tr></thead><tbody>
${METHODS.map(m=>`<tr><td><a href="#m-${m.k}">${esc(m.name)}</a></td><td>${esc(m.who)}</td><td>${esc(m.auth)}</td><td>${esc(m.best)}</td><td>${esc(m.avoid)}</td></tr>`).join("")}</tbody></table></div>
${METHODS.map(m=>`<div class="card" id="m-${m.k}" style="margin:.8rem 0"><h3>${esc(m.name)}</h3>${m.notes.map(n=>`<p>${rich(n)}</p>`).join("")}${m.ex?`<pre>${esc(m.ex)}</pre>`:""}</div>`).join("")}
<p><a class="b sel" href="#/picker">Not sure? Use the picker →</a></p>`;

V.picker=()=>{const a=window._pk||{};const done=PICKER.every(q=>a[q.id]);
 return `<h1>Which interaction method should I use?</h1><p class="lead">Three questions. The answer links to the right guide.</p>
 ${PICKER.map(q=>`<h3 style="margin-top:1rem">${esc(q.q)}</h3><div>${q.o.map(o=>`<button type="button" class="b ${a[q.id]===o[0]?"sel":""}" aria-pressed="${a[q.id]===o[0]}" data-pk="${q.id}" data-val="${o[0]}">${esc(o[1])}</button>`).join("")}</div>`).join("")}
 ${done?`<div class="card" style="margin-top:1.2rem;border-color:var(--acc)">${pick(a)}</div>`:""}
 <p><button type="button" class="b" data-pkreset="1">Start over</button></p>`;};
function pick(a){let r=[];
 if(a.what==="try") r=[["Orchestrate UI and Agent Catalog","Deploy a prebuilt agent and set up its connection [S58, S69].","cloud"]];
 else if(a.what==="prov") r=[["IBM Cloud catalog or Terraform module","Repeatable provisioning with the IBM module [S42].","cloud/code"]];
 else if(a.what==="call") r= a.who==="yes"?[["Embedded web chat","Put the agent in your page; SSO via your IdP [S26, S66].","sdk"]]:[["REST API with IAM tokens","Mint per run; call chat/completions [S41, S52].","guides/5"]];
 else r=[["ADK CLI + Python","Agents in YAML, tools in Python/OpenAPI [S7, S12].","sdk"]];
 if(a.where==="local"&&a.what==="build") r.push(["Start with Developer Edition","Local server on localhost:4321 [S22].","guides/6"]);
 if(a.where==="cloud") r.push(["Set up an environment","env add with the URL and key from Settings → API details [S6].","guides/0"]);
 return `<h3>Recommendation</h3>${r.map(x=>`<p><b>${esc(x[0])}.</b> ${rich(x[1])} <a href="#/${x[2]}">Go →</a></p>`).join("")}`;}

V.limits=()=>`<h1>Limits and gotchas</h1><p class="lead">From IBM's known-issues page and docs ${srcs([24])}. Checked Oct 14, 2026; limits change, so recheck before you rely on one.</p>
<div class="grid">${LIMITS.map(l=>`<div class="card"><h3>${esc(l.h)}</h3><p>${rich(l.p)}</p></div>`).join("")}</div>`;

V.guides=(n)=>{if(n!=null&&GUIDES[n]){const g=GUIDES[n];return `<a href="#/guides">← Guides</a><h1>${esc(g.t)}</h1><p>Sources: ${srcs(g.src)}. All IDs are examples.</p><ol class="steps">${g.steps.map(s=>`<li class="${/Flag/.test(s)?"":""}">${rich(s)}</li>`).join("")}</ol>
 <p>${n>0?`<a class="b" href="#/guides/${n-1}">← Previous</a>`:""}${n<GUIDES.length-1?`<a class="b sel" href="#/guides/${+n+1}">Next guide →</a>`:""}</p>`;}
 return `<h1>Step-by-step guides</h1><p class="lead">Use a trial or Developer Edition. Example instance URL ${esc(EX.instance)}. No secrets appear here.</p>
 <div class="grid">${GUIDES.map((g,i)=>`<div class="card"><h3>${i+1}. ${esc(g.t)}</h3><p>${g.steps.length} steps</p><a class="b" href="#/guides/${i}">Open →</a></div>`).join("")}</div>`;};

V.path=()=>`<h1>Learning path</h1><p class="lead">A sequence through IBM's own material. Links checked Oct 14, 2026 (ibm.com/docs pages block automated checkers, so those were confirmed via search).</p>
${PATH.map(s=>`<h2>${esc(s.stage)}</h2><ul style="padding-left:1.2rem">${s.items.map(i=>`<li><a href="${esc(SRC[i.s].u)}" target="_blank" rel="noopener">${esc(i.t)}</a> <small>(${esc(SRC[i.s].k)}, S${i.s})</small></li>`).join("")}</ul>`).join("")}
<div class="note flag"><b>Flag.</b> IBM doesn't publish a single official watsonx Orchestrate certification path that this site could verify; the ADK docs and IBM Developer tutorials are the best hands-on starting points [${chip(1)}, ${chip(43)}].</div>`;

function quizItem(q,id){const st=LS.get("q:"+id,null);
 return `<div class="card" style="margin:.6rem 0" data-q="${id}"><p><b>${esc(q.q)}</b></p><div>${q.o.map((o,i)=>`<button type="button" class="b ${st!=null&&i===q.a?"sel":""}" data-qa="${i}" data-qid="${id}">${esc(o)}</button>`).join("")}</div>
 ${st!=null?`<p class="${st===q.a?"ok":"no"}">${st===q.a?"Correct.":"Not quite."}</p><p><b>Why / Source:</b> ${rich(q.w)}</p>`:""}</div>`;}
V.quiz=()=>{const score=QUIZ.filter((q,i)=>LS.get("q:"+i,null)===q.a).length;
 return `<h1>Quiz</h1><p class="lead">${QUIZ.length} questions. Each answer shows a Why / Source. Score: ${score}/${QUIZ.length}.</p>${QUIZ.map((q,i)=>quizItem(q,String(i))).join("")}<button type="button" class="b" data-qreset="1">Reset quiz</button>`;};

function glossAll(){return GLOSSARY.map(g=>({t:g.t,c:g.c,d:g.d,s:g.s,code:false})).concat(Object.entries(CODES).map(([k,v])=>({t:k,c:v.c,d:v.n,s:v.s,code:true}))).sort((a,b)=>a.t.localeCompare(b.t));}
V.glossary=()=>{const all=glossAll(),cats=[...new Set(all.map(g=>g.c))].sort();
 return `<h1>Glossary</h1><p class="lead">${all.length} entries, including every code and acronym used on the site (CLI commands, errors, connection kinds, roles, endpoints).</p>
 <p>${cats.map(c=>`<a class="chip" href="#g-${esc(c.replace(/\W/g,""))}">${esc(c)}</a>`).join("")}</p>
 ${cats.map(c=>`<h2 id="g-${esc(c.replace(/\W/g,""))}">${esc(c)}</h2><div class="tw"><table><tbody>${all.filter(g=>g.c===c).map(g=>`<tr><td style="width:30%"><b>${g.code?`<code>${esc(g.t)}</code>`:esc(g.t)}</b></td><td>${esc(g.d)} ${srcs(g.s)}</td></tr>`).join("")}</tbody></table></div>`).join("")}`;};

V.refs=()=>`<h1>Source ledger</h1><p class="lead">${SOURCES.length} sources. IBM documentation is the primary source. Links checked Oct 14, 2026; ibm.com/docs pages block automated checkers and were confirmed via search.</p>
<div class="tw"><table><thead><tr><th>#</th><th>Source</th><th>Publisher</th></tr></thead><tbody>${SOURCES.map(s=>`<tr id="s${s.n}"><td>S${s.n}</td><td><a href="${esc(s.u)}" target="_blank" rel="noopener">${esc(s.t)}</a></td><td>${esc(s.k)}</td></tr>`).join("")}</tbody></table></div>`;



/* ---- Prompts ---- */
function srcBtn(n){const s=SRC[n];return s?`<button type="button" class="cite srcnote" data-note="${n}" aria-label="Source S${n}: ${esc(s.t)}">S${n}</button>`:"";}
function promptText(p,withSrc){let t=PROMPT_WARN+"\n\n"+p.p;if(withSrc)t+="\n\nSources to ground your answer:\n"+p.s.map(n=>`S${n}: ${SRC[n].t} (${SRC[n].u})${SOURCE_NOTES[n]?" - "+SOURCE_NOTES[n]:""}`).join("\n");return t;}
V.prompts=()=>{const f=window._pf==null?-1:window._pf,q=(window._pq||"").toLowerCase();
 const list=PROMPTS.map((p,i)=>[p,i]).filter(([p])=>(f<0||p.c===f)&&(!q||(p.t+" "+p.p).toLowerCase().includes(q)));
 const ws=LS.get("pwsrc",false);
 return `<h1>AI prompts for watsonx Orchestrate</h1><p class="lead">${PROMPTS.length} prompts for deep dives, cloud setup, the ADK, troubleshooting and partner integrations. Fill in the [placeholders]. Each prompt lists the sources it relies on; tap an S# chip for a summary.</p>
 <div class="note flag" role="note"><b>Before you paste anything.</b> ${esc(PROMPT_WARN)}</div>
 <div class="pfilter"><label for="pq" class="nav-group-label">Filter</label><input id="pq" type="search" placeholder="Search prompts" value="${esc(window._pq||"")}">
 <div role="group" aria-label="Categories"><button type="button" class="b ${f<0?"sel":""}" aria-pressed="${f<0}" data-pf="-1">All (${PROMPTS.length})</button>${PROMPT_CATS.map((c,i)=>`<button type="button" class="b ${f===i?"sel":""}" aria-pressed="${f===i}" data-pf="${i}">${esc(c)} (${PROMPTS.filter(p=>p.c===i).length})</button>`).join("")}</div>
 <label class="tgl"><input type="checkbox" id="pwsrc" ${ws?"checked":""}> Include source summaries when copying</label></div>
 <p><small>${list.length} shown</small></p>
 ${list.map(([p,i])=>`<div class="prompt card" id="p${i}"><div class="pmain"><span class="chip">${esc(PROMPT_CATS[p.c])}</span><h3>${esc(p.t)}</h3><pre>${esc(p.p)}</pre>
 <button type="button" class="b sel" data-copy="${i}">Copy prompt</button><span class="copied" id="cp${i}" role="status"></span></div>
 <aside class="psrc" aria-label="Sources cited"><h4>Sources cited</h4>${p.s.map(n=>`<div class="psrow">${srcBtn(n)} <span>${esc(SOURCE_NOTES[n]||SRC[n].t)}</span></div>`).join("")}</aside></div>`).join("")||"<p>No prompts match.</p>"}`;};

/* ---- Fix-it labs ---- */
const labSt=id=>LS.get("lab:"+id,{c:0,w:[],ok:false});
function labStats(){const st=LABS.map(l=>[l,labSt(l.id)]);const solved=st.filter(x=>x[1].ok);
 const has={first:solved.length>0,clean:solved.some(x=>x[1].clean),cloud:st.filter(x=>x[0].track==="Cloud").every(x=>x[1].ok),sdk:st.filter(x=>x[0].track==="SDK").every(x=>x[1].ok),partners:st.filter(x=>x[0].track==="Partners").every(x=>x[1].ok),all:solved.length===LABS.length};
 return {n:solved.length,has};}
V.labs=(n)=>{if(n!=null&&LABS[n])return labView(+n);const s=labStats();
 return `<h1>Fix-it labs</h1><p class="lead">Each lab starts broken. Read the setup and the error, open clues if you need them, then pick the fix. Wrong answers explain themselves. Solved: <b>${s.n}/${LABS.length}</b>.</p>
 <div>${LAB_BADGES.map(b=>`<span class="chip ${s.has[b.k]?"badge-on":""}" title="${esc(b.d)}">${s.has[b.k]?"★":"☆"} ${esc(b.t)}</span>`).join("")}</div>
 ${["Cloud","SDK","Partners"].map(tr=>`<h2>${({Cloud:"Cloud: IBM Cloud and AWS",SDK:"SDK: ADK and APIs",Partners:"Partner integrations"})[tr]}</h2><div class="grid">${LABS.map((l,i)=>[l,i]).filter(x=>x[0].track===tr).map(([l,i])=>`<div class="card"><h3>${i+1}. ${esc(l.t)}</h3><p>${esc(l.symptom.slice(0,90))}${l.symptom.length>90?"…":""}</p><p>${labSt(l.id).ok?'<span class="ok">✓ solved</span>':"Not solved yet"}</p><a class="b" href="#/labs/${i}">Open lab →</a></div>`).join("")}</div>`).join("")}
 <p><button type="button" class="b" data-labreset="1">Reset lab progress</button></p>`;};
function labView(i){const l=LABS[i],st=labSt(l.id);
 return `<a href="#/labs">← Fix-it labs</a><p><span class="badge">${esc(l.track)}</span></p><h1>${i+1}. ${esc(l.t)}</h1>
 <h2>Broken setup</h2><pre>${esc(l.setup)}</pre><h2>Symptom</h2><pre class="err">${esc(l.symptom)}</pre>
 <h2>Clues</h2><div>${l.clues.map((c,j)=>j<st.c?`<div class="note" tabindex="-1">Clue ${j+1}: ${rich(c)}</div>`:"").join("")}
 ${st.c<l.clues.length?`<button type="button" class="b" data-clue="${i}">Show clue ${st.c+1} of ${l.clues.length}</button>`:""}</div>
 <h2>Pick the fix</h2><div role="group" aria-label="Fix options">${l.f.map((o,j)=>{const picked=st.w.includes(j)||(st.ok&&o[1]);return `<button type="button" class="b opt ${picked?(o[1]?"sel":"wrong"):""}" data-lab="${i}" data-opt="${j}" aria-pressed="${picked}">${esc(o[0])}</button>${picked?`<p class="${o[1]?"ok":"no"}" role="status">${o[1]?"✓ ":"✗ "}${rich(o[2])}</p>`:""}`;}).join("")}</div>
 ${st.ok?`<h2>Corrected config</h2><pre>${esc(l.fixed)}</pre><p>Source: ${srcs(l.src)}</p>`:""}
 <p>${i>0?`<a class="b" href="#/labs/${i-1}">← Previous</a>`:""}${i<LABS.length-1?`<a class="b ${st.ok?"sel":""}" href="#/labs/${i+1}">Next lab →</a>`:""}</p>`;}

/* ---- router ---- */
function route(){const h=(location.hash||"#/today").slice(2).split("/");let v=h[0]||"today",html;
 if(v==="curriculum"&&h[1]!=null) html=block(h[1]);
 else if(v==="guides") html=V.guides(h[1]!=null?+h[1]:null);
 else if(TRACKS[v]) html=V.track(v,h[1]);
 else if(v==="prompts"){html=V.prompts();}
 else if(v==="labs") html=V.labs(h[1]!=null?+h[1]:null);
 else html=(V[v]||V.today)();
 $("#view").innerHTML=html;
 const navv=v==="curriculum"&&h[1]==="0"?"b0":v==="curriculum"&&h[1]==="6"?"b6":v;
 $$("#nav .nav-item").forEach(a=>a.classList.toggle("active",a.dataset.v===navv));
 $("#sidebar").classList.remove("open");window.scrollTo(0,0);
 document.title=(v==="today"?"":v[0].toUpperCase()+v.slice(1)+" · ")+"Learn watsonx Orchestrate";}
window.addEventListener("hashchange",route);

/* ---- events ---- */
const pop=$("#pop");
function place(el){pop.hidden=false;const r=el.getBoundingClientRect();const w=Math.min(340,innerWidth-16);
 pop.style.left=Math.max(8,Math.min(r.left,innerWidth-w-8))+"px";pop.style.top=(r.bottom+6+pop.offsetHeight>innerHeight?Math.max(8,r.top-pop.offsetHeight-6):r.bottom+6)+"px";}
function showNote(el){const n=+el.dataset.note,s=SRC[n];if(!s)return;
 pop.innerHTML=`<div class="c">Source S${n} · ${esc(s.k)}</div><div class="k">${esc(s.t)}</div><p>${esc(SOURCE_NOTES[n]||"")}</p><p><a href="${esc(s.u)}" target="_blank" rel="noopener">Open source ↗</a></p>`;place(el);}
function showPop(el){const k=el.dataset.code,c=CODES[k];if(!c)return;
 pop.innerHTML=`<div class="c">${esc(c.c)}</div><div class="k">${esc(k)}</div><p>${esc(c.n)}</p><p>${srcs(c.s)} · <a href="#/glossary">Glossary</a></p>`;
 pop.hidden=false;const r=el.getBoundingClientRect();const w=Math.min(340,innerWidth-16);
 pop.style.left=Math.max(8,Math.min(r.left,innerWidth-w-8))+"px";pop.style.top=(r.bottom+6+pop.offsetHeight>innerHeight?Math.max(8,r.top-pop.offsetHeight-6):r.bottom+6)+"px";}
document.addEventListener("click",e=>{const t=e.target.closest("button,[data-code]");
 if(!e.target.closest("#pop")&&!(t&&(t.dataset.code||t.dataset.note)))pop.hidden=true;
 if(!t)return;const d=t.dataset;
 if(d.code){e.preventDefault();showPop(t);return;}
 if(d.note){e.preventDefault();showNote(t);return;}
 if(d.pf!=null){window._pf=+d.pf;route();}
 if(d.copy!=null){const txt=promptText(PROMPTS[+d.copy],LS.get("pwsrc",false));const msg=$("#cp"+d.copy);
  const done=ok=>{msg.textContent=ok?" Copied.":" Copy failed; select the text and copy it manually.";};
  if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(txt).then(()=>done(true),()=>done(false));else{const ta=document.createElement("textarea");ta.value=txt;document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand("copy");}catch(x){}ta.remove();done(ok);}}
 if(d.done!=null){LS.set("done"+d.done,!LS.get("done"+d.done,false));route();}
 if(d.qa!=null){LS.set("q:"+d.qid,+d.qa);const box=t.closest("[data-q]");const q=/^b/.test(d.qid)?QUIZ[BLOCKS.find(b=>"b"+b.id===d.qid.split("-")[0]).check[+d.qid.split("-")[1]]]:QUIZ[+d.qid];box.outerHTML=quizItem(q,d.qid);}
 if(d.qreset){QUIZ.forEach((q,i)=>LS.set("q:"+i,null));route();}
 if(d.pk){window._pk=Object.assign({},window._pk,{[d.pk]:d.val});route();}
 if(d.pkreset){window._pk={};route();}
 if(d.tr!=null){window._tr={k:d.tk,i:+d.tr};route();}
 if(d.tr2!=null){window._tr=Object.assign({},window._tr,{j:+d.tr2});route();}
 if(d.clue!=null){const l=LABS[+d.clue],st=labSt(l.id);st.c=Math.min(l.clues.length,st.c+1);LS.set("lab:"+l.id,st);route();const nx=$("[data-clue]")||$$("#view .note").pop();if(nx)nx.focus();}
 if(d.opt!=null){const i=+d.lab,l=LABS[i],st=labSt(l.id),j=+d.opt;if(!st.ok){if(l.f[j][1]){st.ok=true;st.clean=st.c===0&&st.w.length===0;}else if(!st.w.includes(j))st.w.push(j);LS.set("lab:"+l.id,st);}route();const b=$(`[data-opt="${j}"]`);if(b)b.focus();}
 if(d.labreset){LABS.forEach(l=>LS.set("lab:"+l.id,null));route();}
});
document.addEventListener("mouseover",e=>{if(!matchMedia("(hover:hover)").matches)return;const t=e.target.closest("[data-code]");if(t)showPop(t);const n=e.target.closest("[data-note]");if(n)showNote(n);});
document.addEventListener("input",e=>{if(e.target.id==="pq"){window._pq=e.target.value;const pos=e.target.selectionStart;route();const i=$("#pq");i.focus();i.setSelectionRange(pos,pos);}});
document.addEventListener("change",e=>{if(e.target.id==="pwsrc")LS.set("pwsrc",e.target.checked);});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){pop.hidden=true;closeP();}
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openP();}});
$("#menuBtn").onclick=()=>{const s=$("#sidebar");s.classList.toggle("open");$("#menuBtn").setAttribute("aria-expanded",s.classList.contains("open"));};

/* theme */
function setTheme(t){document.documentElement.dataset.theme=t;LS.set("theme",t);$("#themeBtn").textContent=t==="house-light"?"Dark mode":"Light mode";}
$("#themeBtn").onclick=()=>setTheme(document.documentElement.dataset.theme==="house-light"?"house-dark":"house-light");
setTheme(LS.get("theme","house-dark"));

/* search palette */
const IDX=[].concat(
 [["Today","today"],["About this site","about"],["Fix-it labs","labs"],["AI prompts","prompts"],["Curriculum","curriculum"],["Cloud track","cloud"],["Cloud lab","cloud/lab"],["Cloud code","cloud/code"],["Cloud troubleshooter","cloud/trouble"],["SDK track","sdk"],["SDK lab","sdk/lab"],["SDK code","sdk/code"],["SDK troubleshooter","sdk/trouble"],["Partner integrations","partners"],["Partner lab","partners/lab"],["Partner code","partners/code"],["Partner troubleshooter","partners/trouble"],["Map","map"],["Ways to interact","methods"],["Method picker","picker"],["Limits and gotchas","limits"],["Guides","guides"],["Learning path","path"],["Quiz","quiz"],["Glossary","glossary"],["Source ledger","refs"]].map(([t,h])=>({t,k:"View",h})),
 BLOCKS.map(b=>({t:b.t,k:"Block",h:"curriculum/"+b.id,x:b.sections.map(s=>s.h+" "+s.p.join(" ")).join(" ")})),
 PROMPTS.map((p,i)=>({t:p.t,k:"Prompt · "+PROMPT_CATS[p.c],h:"prompts",x:p.p})),
 LABS.map((l,i)=>({t:l.t,k:"Fix-it lab",h:"labs/"+i,x:l.symptom+" "+l.setup})),
 GUIDES.map((g,i)=>({t:g.t,k:"Guide",h:"guides/"+i,x:g.steps.join(" ")})),
 [].concat(...Object.entries(TRACKS).map(([k,T])=>T.sections.map(s=>({t:s.h,k:"Track · "+T.short,h:k,x:s.p.join(" ")})))),
 METHODS.map(m=>({t:m.name,k:"Method",h:"methods",x:m.notes.join(" ")})),
 glossAll().map(g=>({t:g.t,k:g.code?"Code":"Term",h:"glossary",x:g.d})));
let pSel=0,pRes=[];
function openP(){$("#palette").hidden=false;$("#pInput").value="";renderP();$("#pInput").focus();}
function closeP(){$("#palette").hidden=true;}
function renderP(){const q=$("#pInput").value.toLowerCase().trim();
 pRes=(q?IDX.filter(i=>(i.t+" "+strip(i.x||"")).toLowerCase().includes(q)).sort((a,b)=>(b.t.toLowerCase().includes(q))-(a.t.toLowerCase().includes(q))):IDX.slice(0,17)).slice(0,30);pSel=0;
 $("#pList").innerHTML=pRes.map((r,i)=>`<li role="option" data-i="${i}" class="${i===0?"act":""}">${esc(r.t)} <small>${esc(r.k)}</small></li>`).join("")||"<li>No matches</li>";}
$("#pInput").addEventListener("input",renderP);
$("#pInput").addEventListener("keydown",e=>{if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();pSel=(pSel+(e.key==="ArrowDown"?1:-1)+pRes.length)%Math.max(1,pRes.length);$$("#pList li").forEach((l,i)=>l.classList.toggle("act",i===pSel));}
 if(e.key==="Enter"&&pRes[pSel]){location.hash="#/"+pRes[pSel].h;closeP();}});
$("#pList").addEventListener("click",e=>{const li=e.target.closest("li[data-i]");if(li){location.hash="#/"+pRes[+li.dataset.i].h;closeP();}});
$("#palette").addEventListener("click",e=>{if(e.target.id==="palette")closeP();});
$("#navSearch").onclick=openP;

route();
if("serviceWorker" in navigator&&location.protocol!=="file:")navigator.serviceWorker.register("sw.js").catch(()=>{});
})();
