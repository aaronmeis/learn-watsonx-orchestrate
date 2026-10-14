/* Architecture section: five views drawn from IBM's public docs. Gaps IBM does not publish are marked Unverified. */
(function(){
const S=window.SOURCES,has=n=>S.some(s=>s.n===n);
[{n:75,t:"Agentic Control Plane (product page)",u:"https://www.ibm.com/products/watsonx-orchestrate/agent-control-plane",k:"IBM product page"},
 {n:76,t:"Introducing the agentic control plane (Jul 2, 2026)",u:"https://www.ibm.com/new/announcements/introducing-the-agentic-control-plane",k:"IBM Announcements"},
 {n:77,t:"watsonx Orchestrate agentic control plane (IBM Developer article)",u:"https://developer.ibm.com/articles/watsonx-orchestrate-agentic-control-plane/",k:"IBM Developer"},
 {n:78,t:"Agent Catalog (product page)",u:"https://www.ibm.com/products/watsonx-orchestrate/agent-catalog",k:"IBM product page"},
 {n:79,t:"Agent Connect: onboard a native agent",u:"https://connect.watson-orchestrate.ibm.com/agent/onboard-native",k:"IBM Agent Connect"},
 {n:80,t:"Developer Edition setup",u:"https://developer.watson-orchestrate.ibm.com/developer_edition/wxOde_setup",k:"IBM ADK docs"},
 {n:81,t:"Installing watsonx Orchestrate on premises",u:"https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=notes-installing-watsonx-orchestrate-premises",k:"IBM Documentation"},
 {n:82,t:"Managing voice",u:"https://developer.watson-orchestrate.ibm.com/voice/managing_voice",k:"IBM ADK docs"}
].forEach(s=>{if(!has(s.n))S.push(s);});
const C=window.CODES,add=(k,c,n,s)=>{if(!C[k])C[k]={c,n,s};};
add("OpenTelemetry","Standard","An open standard for traces, metrics and logs. Orchestrate's control plane collects OpenTelemetry spans, including spans external agents send back.",[75,77]);
add("RBAC","Acronym","Role-based access control: what you can do depends on your role. Orchestrate pairs it with team workspaces.",[75]);
add("cpd","Config value","The ADK environment type for on-premises installs on IBM Cloud Pak for Data or IBM Software Hub (orchestrate env add --type cpd).",[5]);
add("LLM","Acronym","Large language model: the model an agent reasons with. On premises you must configure a default LLM first.",[5,2]);
add("SaaS","Acronym","Software as a service: IBM runs the platform and you get an instance. Orchestrate SaaS runs on IBM Cloud, AWS or AWS Gov.",[1]);
add("API","Acronym","Application programming interface: the HTTPS endpoints your own code calls.",[1]);
add("UI","Acronym","User interface: the screens you click through in a browser.",[1]);
add("ISV","Acronym","Independent software vendor: a company that builds software, here partner agents listed through Agent Connect.",[79]);
add("SSO","Acronym","Single sign-on: one login for many apps through your identity provider.",[5]);
add("SIEM","Acronym","Security information and event management: a central security log and alerting system.",[75]);
add("DR","Acronym","Disaster recovery: how a service comes back after a regional outage.",[1]);
add("SLA","Acronym","Service level agreement: the uptime the provider commits to in the contract.",[1]);
add("EKS","Acronym","Amazon Elastic Kubernetes Service: one place you can host your own external agent.",[10]);
add("GKE","Acronym","Google Kubernetes Engine: another place you can host your own external agent.",[10]);
add("PNG","File type","A lossless image format. Each diagram here is a PNG exported from Draw.io.",[]);
add("Draw.io","Tool","A free diagram editor. The diagrams on this page were drawn in it.",[]);
add("/.well-known/agent-card.json","Path","The standard URL where an A2A agent publishes its card (name, skills, endpoint) so others can discover it.",[10]);
add("external_chat","Config value","The ADK provider for external agents that speak a chat-completions style API rather than A2A.",[10]);
add("A2A 0.3.0","Version","The version of the agent-to-agent protocol Orchestrate supports for external agents.",[10]);
add("localhost:4321","Address","Where Developer Edition's local server listens on your laptop (API under /api/v1, docs under /docs).",[22,80]);
add("localhost:3000","Address","Where Developer Edition's local UI opens in your browser.",[22,80]);
add("orchestrate env add","CLI command","ADK command that registers an instance (cloud, AWS, on-prem or local); orchestrate env activate then sends commands there.",[5]);
add("--with-voice","CLI flag","Developer Edition start-up flag that adds the voice services.",[80,82]);
add("--with-doc-processing","CLI flag","Developer Edition start-up flag that adds document processing; it needs about 24 GB of RAM.",[80]);
add("us-south","Region code","An example cluster name IBM's docs use for a SaaS instance (Dallas region).",[5]);
add("ap-south-1","Region code","An AWS region code (Mumbai) that appears as an example cluster in IBM's docs.",[5]);
const G=window.GLOSSARY;
[{t:"Architecture view",c:"Site",d:"One way of looking at the same system: overview, conceptual, logical, physical or infrastructure.",s:[]},
 {t:"Agentic Control Plane",c:"Concept",d:"Orchestrate's governance layer: agent directory, catalog, runtime policy, credentials, scheduling, analytics and tracing.",s:[75,76]},
 {t:"Developer Edition",c:"Product",d:"A local copy of Orchestrate on your laptop for building and testing before you push to an instance.",s:[22,80]},
 {t:"Collaborator agent",c:"Concept",d:"An agent that another agent can hand part of a task to.",s:[2]},
 {t:"Connection",c:"Concept",d:"Stored credentials and settings that let tools reach one enterprise app.",s:[2]},
 {t:"Unverified / gap",c:"Site",d:"Something IBM does not publish. Ask IBM before designing around it.",s:[]}
].forEach(g=>{if(!G.some(x=>x.t===g.t))G.push(g);});
window.ARCH=[
{id:"overview",f:"01-overview-wxo.png",t:"1. Overview: what sits where",
 p:["People reach Orchestrate through the Agent Chat {{UI}}, the Orchestrate {{API}}, messaging channels (Teams, Slack, WhatsApp, Messenger) and voice. [S25, S82]",
    "In the middle is the Agentic Control Plane. It holds the agent directory, the governed catalog, runtime policy, credentials, scheduling, and analytics with {{OpenTelemetry}} tracing. [S75, S76]",
    "Under it sit agents and orchestration, tools, models, and knowledge sources with their connections. Enterprise systems and outside agents are on the right. [S2]",
    "Builders use the no-code Agent Builder or the pro-code {{ADK}}. A laptop running Developer Edition pushes agents and tools into any instance. [S1, S22]",
    "IBM names five offerings: Orchestrate on AWS, AWS Gov, IBM Cloud, on-premises, and Developer Edition. [S1]"],u:[]},
{id:"conceptual",f:"02-conceptual-wxo.png",t:"2. Conceptual: capabilities and who uses them",
 p:["Build: the no-code Agent Builder, or the {{ADK}} (Python plus a CLI). Tools can be Python, OpenAPI, {{MCP}} or Skills, and you can import LangGraph agents. [S1, S2]",
    "Orchestrate: one agent plans the work and hands parts to collaborator agents. Workflows and scheduling are built in. [S75, S77]",
    "Connect: enterprise apps (Salesforce, ServiceNow, SAP, Workday, Microsoft 365), external agents over {{A2A}} or chat completions, and knowledge sources. [S10, S78]",
    "Govern and operate: agent directory, runtime policy, credential management, {{RBAC}} with team workspaces, analytics and tracing. [S75, S77]",
    "Distribute: the governed Agent Catalog and the Agent Connect partner program. IBM reviews an agent before it is listed. [S78, S79]",
    "Who uses it: business users, builders, admins or the platform team, and partners or {{ISV}}s."],u:[]},
{id:"logical",f:"03-logical-wxo.png",t:"3. Logical: components and flow",
 p:["A request comes in from a channel and lands on a native agent: instructions, an {{LLM}}, tools and collaborators. [S2]",
    "The agent reasons with the model layer. IBM manages the models on SaaS; on premises you must set a default {{LLM}} first. [S5]",
    "It calls tools, and tools reach enterprise systems through connections that hold each app's credentials. [S2]",
    "It searches knowledge sources and delegates to collaborator agents. External agents are called over {{A2A 0.3.0}} (found through {{/.well-known/agent-card.json}}) or {{external_chat}}. You can't chat with an external agent directly; attach it to a native agent. [S10]",
    "The control plane governs the run (policy, guardrails, credentials) and collects analytics and {{OpenTelemetry}} spans, including spans external agents send back. [S75, S77]"],
 u:["Where conversation memory and state are stored. IBM does not publish this."]},
{id:"physical",f:"04-physical-wxo.png",t:"4. Physical: where it runs",
 p:["{{SaaS}} on IBM Cloud: you get an instance with a service URL and an API key, and sign in through IBM Cloud {{IAM}}. [S5]",
    "{{SaaS}} on AWS or AWS Gov: sign-in goes through {{MCSP}} (v2 first, then v1). The docs show example clusters such as {{us-south}} and {{ap-south-1}}. [S5]",
    "On premises: runs on IBM Cloud Pak for Data or IBM Software Hub, on Red Hat OpenShift. The ADK uses the {{cpd}} environment type. [S81, S5]",
    "Developer Edition: a local server at {{localhost:4321}} and a UI at {{localhost:3000}}. Optional add-ons: Langfuse, {{--with-voice}} and {{--with-doc-processing}} (about 24 GB RAM). Since ADK 2.0 it no longer needs a separate container engine. [S22, S80]",
    "The ADK CLI is the same everywhere: {{orchestrate env add}} and activate decide which instance your commands go to. [S5]",
    "External agents run on your own infrastructure, for example IBM Cloud Code Engine, {{EKS}} or {{GKE}}. [S10]"],
 u:["How the runtime is built inside the SaaS service (pods, regions per tenant, scaling). Not published."]},
{id:"infrastructure",f:"05-infrastructure-wxo.png",t:"5. Infrastructure: identity, network, data, observability, regions",
 p:["What IBM publishes, and what it doesn't, area by area. The icons on this diagram are generic infrastructure symbols, not Azure products."],
 tbl:[["Identity","IBM Cloud {{IAM}}; {{MCSP}} v1/v2; {{cpd}} auth; {{RBAC}} and team workspaces [S5, S75]","How end-user {{SSO}} is federated"],
      ["Secrets","Connections hold app credentials; the control plane manages credentials; external agent credentials stay with the agent's owner [S2, S75, S10]","Which secret store sits underneath"],
      ["Network","HTTPS service URL and {{API}}; {{A2A}} and chat completions; channel connectors [S5, S10]","Private connectivity, IP allow-listing"],
      ["Data","Your knowledge sources; agent and tool definitions stored in the instance [S2]","Where conversation and state are stored; data residency"],
      ["Observe","Control-plane analytics; {{OpenTelemetry}}; Langfuse in Developer Edition [S75, S80]","Log export to a {{SIEM}}"],
      ["Regions","IBM Cloud, AWS, AWS Gov, on premises; example clusters {{us-south}}, {{ap-south-1}} [S5]","Full region list, {{DR}} and {{SLA}}"]],
 u:["Every item in the right-hand column is unverified. Confirm with IBM before making design decisions."]}
];
})();
