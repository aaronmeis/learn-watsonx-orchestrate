/* Content for Learn watsonx Orchestrate. [S#] = source chip, {{CODE}} = code note (see js/codes.js). */
window.EX={instance:"https://api.us-south.watson-orchestrate.cloud.ibm.com/instances/00000000-0000-0000-0000-000000000000",agent:"11111111-1111-1111-1111-111111111111",region:"us-south"};

window.BLOCKS=[
{id:0,t:"Block 0: What watsonx Orchestrate is, and why it exists",min:30,
 intro:"Start here. Before the CLI, get the shape of the thing: what it is, where it came from, and what problem it solves.",
 sections:[
  {h:"What it is",p:["IBM watsonx Orchestrate is IBM's platform for building, running and governing AI agents. IBM now calls it an agent management platform: one control plane for agents, tools and workflows, whether they were built in Orchestrate or somewhere else [S36].","Under the hood an agent is an LLM plus instructions, tools, collaborator agents and optional knowledge bases. You ask; the agent picks tools or hands off to collaborators, step by step [S2]."]},
  {h:"Where it came from",p:["IBM announced Watson Orchestrate at Think on May 11, 2021, as a preview inside IBM Automation Cloud Paks: natural-language task automation for business users, working through Slack and email with apps like Salesforce, SAP and Workday [S44].","At Think 2023 IBM launched the watsonx platform and said Watson Assistant and Watson Orchestrate would be combined with foundation models [S45]. IBM's lifecycle page lists watsonx Orchestrate SaaS general availability on March 31, 2023 [S46].","In May 2025 IBM repositioned it around agents: build-your-own agents, prebuilt HR, sales and procurement agents, 80+ app integrations and an {{Agent Catalog}} with 150+ agents and tools [S47]. IBM listed the sales and procurement agents as generally available later that year [S49].","The pro-code side is the {{ADK}}: a Python package and CLI first published to PyPI on April 30, 2025 (1.0.0), with 2.0.0 on November 25, 2025 [S34, S33]. Dates come from PyPI's release history."]},
  {h:"Two ways in",p:["Cloud: buy a plan, provision an instance on IBM Cloud or AWS (or run it on-premises), assign roles, connect apps, and use the agent builder UI and catalog [S35, S37, S38].","SDK: install the ADK with pip, describe agents, tools, connections and knowledge bases as YAML or Python files, and push them to an environment with the orchestrate CLI. Developer Edition gives you a local copy to test against [S3, S22]."]},
  {h:"Not the same as watsonx.ai",p:["watsonx.ai is where models are hosted and tuned. Orchestrate consumes models (from watsonx.ai, Groq-hosted and other providers) to run agents. You pick the model per agent with the llm field [S31, S7]."]}
 ],
 socratic:[
  {q:"Why not just call an LLM API directly from your app?",a:"You can, and for one prompt that's fine. The moment the model has to do things (create a ticket, look up an order) you need tool definitions, credentials for each system, per-user auth, logging, evaluation and someone to say which agent may call what. Orchestrate's pitch is that those pieces live in one governed place [S36, S2, S17]."},
  {q:"Why keep credentials in 'connections' instead of inside the tool code?",a:"Because tool code gets copied, committed and shared. A connection holds the secret separately, can be per user (member) or shared (team), and can differ between draft and live. IBM's docs say credentials are set by CLI on purpose so they don't end up in YAML files [S2, S18]."},
  {q:"Why have both agents and agentic workflows?",a:"Agents reason freely each turn, which is flexible but less predictable. Workflows follow an explicit graph of nodes with branches, loops and human steps. When the process must happen the same way every time, the workflow wins; when the request is open-ended, the agent wins [S2, S28]."},
  {q:"Why would you run a local Developer Edition at all?",a:"So you can import, break and re-import agents without touching a shared tenant or burning your plan's usage. It runs on localhost:4321 with its own UI and API [S22]. The trade-off: there's no live environment, so deploy commands fail there [S9]."}
 ],
 check:[0,1,2,3,4]},
{id:1,t:"Block 1: Core concepts",min:45,
 intro:"The nouns you'll meet in every YAML file and error message.",
 sections:[
  {h:"Agents",p:["Three kinds: {{kind: native}} (built in Orchestrate), external (hosted elsewhere, reached over external_chat or {{A2A}}), and assistant (a watsonx Assistant instance used as a collaborator) [S2].","Each agent has a name, description and instructions. The description matters most in multi-agent setups: the supervisor reads it to pick a collaborator [S2]."]},
  {h:"Agent style",p:["{{react_core}} is the recommended style. 'default' and 'react' ({{ReAct}}) are deprecated and will be removed [S8]."]},
  {h:"Tools and toolkits",p:["A tool is one callable function with input and output schemas. Types: Python ({{@tool}}), OpenAPI (one operation from a spec), agentic workflow, and Langflow [S2].","A toolkit groups tools. {{MCP}} toolkits wrap MCP servers (local stdio, or remote HTTP/SSE/streamable HTTP); Python toolkits run several tools in one process. Imported toolkit tools are named toolkit_name:tool_name [S2]."]},
  {h:"Connections",p:["A connection stores credentials for a tool, toolkit or knowledge base. It has an {{app_id}}, a kind (basic, bearer, api_key, {{key_value}}, several OAuth flows) and a scope: {{member}} or {{team}} [S2, S18]."]},
  {h:"Knowledge bases and skills",p:["A {{KB}} is a document collection the agent searches to ground answers. Limits: up to 100 files per KB file; 25 MB for docx/pdf/pptx, 5 MB for csv/html/txt, 1 MB for xlsx [S21].","An agent skill is a folder with a SKILL.md: a scoped procedure the agent loads only when needed [S2]."]},
  {h:"Draft and live",p:["Importing puts an agent in {{draft}}. orchestrate agents deploy promotes it to {{live}} [S9]."]}
 ],check:[5,6,7]},
{id:2,t:"Block 2: Cloud deployment and plans",min:40,
 intro:"Where it runs, what it costs, and who can do what.",
 sections:[
  {h:"Where it runs",p:["Managed SaaS on IBM Cloud or AWS, or on-premises (IBM Software Hub / Cloud Pak for Data) [S35, S5].","IBM Cloud regions: Paris, Dallas (us-south), Frankfurt, London, São Paulo, Sydney, Tokyo, Toronto, and Washington DC (us-east, Premium only) [S37]."]},
  {h:"Plans",p:["IBM's pricing page lists a 30-day Trial, Essentials (from USD 530/month), Standard (from USD 6,360/month) and Premium (custom). Prices are indicative and vary by country [S35]. Checked Oct 14, 2026; recheck before quoting.","Premium adds data isolation and a HIPAA-ready option [S35]. IBM said the sales and procurement agents come with Standard and Premium [S49]."]},
  {h:"Roles",p:["Three instance roles: user ({{WO User}} on IBM Cloud), builder ({{Writer}}), admin ({{Manager}}) [S38].","Admins and Builders automatically get access to every workspace, including private ones. To limit someone to some workspaces, give them WO User and grant workspace roles explicitly [S39]."]}
 ],check:[8,9,10]},
{id:3,t:"Block 3: Talking to it from code",min:40,
 intro:"Three doors: the ADK CLI, the Python library, and the REST API.",
 sections:[
  {h:"API authentication",p:["On IBM Cloud you swap an API key for an {{IAM}} bearer token at {{iam.cloud.ibm.com/identity/token}}; it lasts up to 60 minutes [S41, S40].","Get the API key and service instance URL from Settings → API details inside Orchestrate, not from the IBM Cloud resource page [S6]."]},
  {h:"Useful endpoints",p:["{{/v1/orchestrate/{agent_id}/chat/completions}} offers a chat-completions-style call per agent [S52]. {{/v1/orchestrate/runs}} starts a run with agent_id and thread_id [S43]."]}
 ],check:[11,12]},
{id:4,t:"Block 4: Governance, evaluation and observability",min:30,
 intro:"How you prove an agent works and keep it inside the lines.",
 sections:[
  {h:"Controls",p:["{{orchestrate controls}} manages policy controls such as guardrails and PII filtering [S29]."]},
  {h:"Evaluation",p:["The evaluation framework runs test cases against agents and tools, quick evals, rubric evals, and LLM vulnerability (red-team) testing [S27]."]},
  {h:"Traces",p:["Traces show what an agent did, via CLI or Python; external agents can export traces with OpenTelemetry [S54]."]},
  {h:"CI/CD",p:["IBM's CI/CD guide describes a GitOps approach: agents, tools and KBs as files in Git, promoted between tenants by pipeline [S50]."]}
 ],check:[13]},
{id:6,t:"Block 6: Deep dive: control plane, orchestrator agent, AI Gateway",min:35,
 intro:"IBM's 2026 framing: Orchestrate as the agentic control plane. What that means in practice, and what's marketing.",
 sections:[
  {h:"The agentic control plane",p:["On May 5, 2026 IBM described new 'agentic control plane' capabilities: one place to run, manage and govern agents regardless of how they were built or where they run [S71].","IBM listed six areas. Running agents across frameworks (IBM native, Langflow, LangGraph and {{A2A}} agents today, more 'coming soon'), observability and evaluation, building and debugging, identity, credentials and audit logging, controls and guardrails through a unified AI gateway, and cost and outcome optimization [S71].","Analogy: an air-traffic control tower. It doesn't fly the planes. It knows where every one is, who's allowed to land, and logs every move. Agents from different builders are the planes."]},
  {h:"The orchestrator agent",p:["IBM introduced an orchestrator agent feature that uses fine-tuned foundation models, including IBM Granite, to reason over each turn of a multi-turn conversation and route work to agents, assistants and skills [S72].","Careful with summaries that say it's 'built on Granite': IBM's wording is models 'including' Granite. In today's ADK, you choose each agent's model with the llm field, and supervisors route to {{collaborators}} by description [S72, S7, S2]."]},
  {h:"AI Gateway",p:["IBM's AWS blog describes an AI Gateway that connects agents to foundation models from Amazon Bedrock and other providers, chosen per task [S74].","The ADK docs cover the same layer from the developer side: model choice, virtual models and model policies [S31].","The control plane announcement puts runtime control enforcement, guardrails and monitoring in a unified AI gateway [S71]. {{orchestrate controls}} is the CLI side of guardrails [S29]."]},
  {h:"Buying agents: the eCommerce pilot",p:["On May 1, 2026 IBM announced a limited-time pilot that lets you buy selected partner-built agents on IBM.com, bundled with an Orchestrate subscription [S73, S35]."]},
  {h:"What isn't verified here",p:["Vendor comparison matrices, adoption forecasts and risk rankings that circulate in secondary research aren't on this site, because no primary source backs them. Treat any 'X is stronger than Y' table as opinion until you can check it yourself.","Lists of every supported model family vary by region and deployment. Check the LLM page for your environment rather than a summary [S31]."]}
 ],
 socratic:[
  {q:"Why would a company need a control plane if it already has agents working?",a:"Because they're spread across teams and frameworks, and nobody can answer 'which agents can touch payroll, and what did they do yesterday?' IBM's pitch is one operational layer for identity, audit, evaluation and guardrails, without rebuilding the agents [S71]."},
  {q:"Why route models through a gateway instead of calling them directly?",a:"So policy, logging and model choice live in one place. Swap a model for a task and the guardrails still apply [S74, S71]."}
 ],check:[20,21]},
{id:5,t:"Block 5: Limits and gotchas",min:20,
 intro:"Numbers and traps from IBM's known-issues page.",
 sections:[{h:"See the Limits view",p:["The Limits view collects tenant limits, timeouts and file sizes with sources [S24, S21]."]}],check:[14]}
];

window.METHODS=[
 {k:"ui",name:"Orchestrate UI (agent builder, catalog)",who:"Business builders, admins",auth:"IBM Cloud / AWS sign-in",best:"Trying catalog agents, connections, quick builds",avoid:"Repeatable promotion between environments",notes:["No-code agent builder and the Agent Catalog of prebuilt agents [S47, S58].","Admins set connection credentials under Manage → Connections [S18]."]},
 {k:"adk",name:"ADK CLI (orchestrate)",who:"Developers",auth:"API key via env activate",best:"Agents, tools, connections, KBs as files; scripting; CI/CD",avoid:"End-user chat",notes:["pip install ibm-watsonx-orchestrate; Python 3.11+ [S3, S34].","{{orchestrate env add}} then {{orchestrate env activate}} [S5]."],ex:"orchestrate env add -n dev -u <service-instance-url> --type ibm_iam --activate\norchestrate agents import -f agents/helper.yaml\norchestrate agents deploy --name helper"},
 {k:"py",name:"Python library (ibm_watsonx_orchestrate)",who:"Developers",auth:"Same environment",best:"Python tools with @tool, agents defined in Python",avoid:"Non-Python stacks",notes:["{{@tool}} functions run in an isolated container with their own virtualenv [S12]."]},
 {k:"rest",name:"REST API",who:"App developers",auth:"IAM bearer token (IBM Cloud), MCSP token (AWS), ZenApiKey (on-prem)",best:"Calling agents from your own app or UI",avoid:"Defining agents (use the ADK)",notes:["See Getting started with the API [S40] and IBM's custom UI tutorial [S43]."],ex:"POST <instance-url>/v1/orchestrate/<agent-id>/chat/completions\nAuthorization: Bearer <token>"},
 {k:"chat",name:"Embedded web chat and channels",who:"End users",auth:"Optional JWT / SSO",best:"Putting an agent in a website, Slack, Teams, WhatsApp",avoid:"OAuth member connections (UI only today)",notes:["Channels include web chat, Slack, Microsoft Teams, Twilio WhatsApp/SMS, Genesys, Facebook Messenger [S25].","IBM lists OAuth connections as not supported in embedded web chat [S24]."]},
 {k:"tf",name:"Terraform (IBM module)",who:"Platform teams",auth:"IBM Cloud API key",best:"Provisioning the service instance as code",avoid:"Agent content",notes:["Plans lite, essentials-agentic-mau, standard-agentic-mau; needs Resource Group Viewer and Orchestrate Editor platform access [S42]."]}
];

window.PICKER=[
 {id:"what",q:"What do you want to do?",o:[["try","Try an agent or catalog agent"],["build","Build agents and tools"],["call","Call an agent from my app"],["prov","Provision the instance"]]},
 {id:"where",q:"Where are you working?",o:[["local","My laptop first"],["cloud","Straight on IBM Cloud/AWS"]]},
 {id:"who",q:"Is a person signed in when it runs?",o:[["yes","Yes"],["no","No, a backend or pipeline"]]}
];

window.LIMITS=[
 {h:"Tenant resource limits",p:"Max 1,000 tools, 5 toolkits, 1,000 agents and 10 LangGraph agents per environment; draft and live count separately [S24]."},
 {h:"Python tool timeout",p:"Python tools have a 2-minute request timeout including startup; calls over ~90 seconds hit it. Use an OpenAPI tool for long operations [S24]."},
 {h:"Knowledge base files",p:"Up to 100 files per KB file. docx/pdf/pptx 25 MB, csv/html/txt 5 MB, xlsx 1 MB [S21]."},
 {h:"AWS API keys",p:"On AWS you're limited to 10 API keys, and keys can't be retrieved again after generation [S6]."},
 {h:"IAM token lifetime",p:"IBM Cloud IAM tokens last up to 60 minutes; read expires_in [S41]."},
 {h:"OAuth in embedded chat",p:"OAuth connections work in the Orchestrate UI, not embedded web chat; SSO/IdP connections are for embedded web chat [S24, S51]."},
 {h:"Header size",p:"8 KB per header. Large SSO tokens in x-wxo-access-token cause {{HTTP 431}} on remote MCP tools [S23]."},
 {h:"Region",p:"Washington DC (us-east) on IBM Cloud is Premium only [S37]."},
 {h:"Developer Edition",p:"No live environment: deploy fails and live connection configs are ignored [S9, S18]."}
];

window.GUIDES=[
 {t:"Install the ADK and connect to a cloud instance",src:[3,5,6],steps:["Check Python is 3.11 or later [S3].","Create a virtual environment and run pip install --upgrade ibm-watsonx-orchestrate [S3].","In Orchestrate: user icon → Settings → API details. Copy the service instance URL; generate an API key and store it in a vault [S6].","Run {{orchestrate env add}} -n dev -u <url> --type ibm_iam (IBM Cloud) or --type mcsp (AWS) --activate [S6].","Run orchestrate env list and look for (active) [S5]."]},
 {t:"Write and import your first Python tool",src:[12],steps:["Create hello_tool.py with a function decorated by {{@tool}} and a clear docstring [S12].","Run {{orchestrate tools import}} -k python -f hello_tool.py [S12].","If it needs packages, add -r requirements.txt; IBM checks them against an allowlist [S12]."]},
 {t:"Create a native agent in YAML and deploy it",src:[7,9],steps:["Write agent.yaml with spec_version: v1, kind: native, name, llm, style: react_core, description, instructions, tools [S7].","{{orchestrate agents import}} -f agent.yaml (lands in draft) [S9].","Test in the UI, then {{orchestrate agents deploy}} --name <agent> [S9]."]},
 {t:"Add a connection and bind it to a tool",src:[18,19,23],steps:["orchestrate connections add -a my_api [S18].","{{orchestrate connections configure}} -a my_api --env draft --type team --kind api_key --url https://api.example.com [S18].","{{orchestrate connections set-credentials}} -a my_api --env draft --api-key \"$MY_API_KEY\" (from your shell, never a file) [S18].","Import the tool with -a my_api [S12]."]},
 {t:"Add a remote MCP server as a toolkit",src:[15],steps:["{{orchestrate toolkits add}} --kind mcp --name docs --description \"Docs search\" --url https://mcp.example.com/mcp --transport streamable_http --tools \"*\" [S15].","Reference the toolkit in your agent's toolkits list [S2]."]},
 {t:"Call an agent from your app",src:[40,41,43,52],steps:["POST to {{iam.cloud.ibm.com/identity/token}} with your API key to get an access token [S41].","GET <instance-url>/v1/orchestrate/agents to find the agent ID [S43].","POST <instance-url>/v1/orchestrate/<agent-id>/chat/completions with Bearer auth [S52].","Refresh the token before expires_in runs out [S41]."]},
 {t:"Run Developer Edition locally",src:[22,23],steps:["Install a container runtime (Docker or similar) [S23].","Create a .env with your entitlement/registry settings per IBM's install page [S3].","{{orchestrate server start}} -e .env, then open localhost:3000 [S22].","orchestrate env activate local [S5]."]}
];

window.PATH=[
 {stage:"Orient",items:[{t:"What is the ADK",s:1},{t:"Core concepts",s:2},{t:"Product page",s:36}]},
 {stage:"Set up",items:[{t:"Install the ADK",s:3},{t:"Developer Edition",s:22},{t:"Remote environments",s:5}]},
 {stage:"Build",items:[{t:"Native agents",s:7},{t:"Python tools",s:12},{t:"Connections",s:18},{t:"MCP toolkits",s:15},{t:"Examples",s:32}]},
 {stage:"Run and govern",items:[{t:"Evaluation",s:27},{t:"Controls",s:29},{t:"CI/CD approach",s:50}]},
 {stage:"Partners",items:[{t:"Agent Connect",s:55},{t:"Prebuilt agents",s:58}]}
];

window.GLOSSARY=[
 {t:"watsonx Orchestrate",c:"Product",d:"IBM's agent management platform for building, running and governing AI agents.",s:[36]},
 {t:"Agent",c:"Concept",d:"LLM plus instructions, tools, collaborators and optional knowledge bases.",s:[2]},
 {t:"Tool",c:"Concept",d:"A callable function with input/output schemas: Python, OpenAPI, workflow or Langflow.",s:[2]},
 {t:"Toolkit",c:"Concept",d:"A group of tools: MCP or Python.",s:[2]},
 {t:"Connection",c:"Concept",d:"Stored credentials for a tool, toolkit or KB, identified by app_id.",s:[2,17]},
 {t:"Agentic workflow",c:"Concept",d:"Graph of nodes (agents, tools, human steps) exposed as a tool.",s:[28]},
 {t:"Agent skill",c:"Concept",d:"Folder with a SKILL.md procedure an agent loads on demand.",s:[2]},
 {t:"Developer Edition",c:"Concept",d:"Local Orchestrate server for development.",s:[22]},
 {t:"Service instance URL",c:"Cloud",d:"The per-instance API base URL from Settings → API details.",s:[6]},
 {t:"Workspace",c:"Cloud",d:"A space for agents and tools inside an instance, with Owner/Editor roles.",s:[39]},
 {t:"Prebuilt agent",c:"Partners",d:"Ready-to-use catalog agent integrated with an enterprise app.",s:[58]},
 {t:"Illustrative",c:"Site",d:"Label for numbers or examples that aren't from a cited source.",s:[]}
];

window.QUIZ=[
 {q:"When did IBM first announce Watson Orchestrate?",o:["Think 2019","Think 2021","Think 2023","2025"],a:1,w:"Announced May 11, 2021 at Think, in preview with IBM Automation Cloud Paks [S44]."},
 {q:"What is the ADK packaged as?",o:["A Java SDK","A Python library and CLI","A VS Code extension only","A Docker image only"],a:1,w:"The ADK is a Python library and command-line tool [S1]."},
 {q:"Which agent kind is hosted on another framework?",o:["native","external","assistant","toolkit"],a:1,w:"External agents are hosted outside Orchestrate and reached via external_chat or A2A [S2]."},
 {q:"Where should you put a third-party API key used by a tool?",o:["In the tool's Python code","In the agent YAML","In a connection","In the docstring"],a:2,w:"Connections hold credentials so tools don't embed them [S2, S18]."},
 {q:"Which runs on localhost:4321?",o:["The IAM service","Developer Edition API server","The embedded chat","Langfuse only"],a:1,w:"Developer Edition's server runs on localhost:4321 [S22]."},
 {q:"Which agent style is recommended?",o:["default","react","react_core","planner"],a:2,w:"react_core is recommended; default and react are deprecated [S8]."},
 {q:"What does importing an agent do?",o:["Deploys it live","Puts it in draft","Deletes the old one","Publishes to the catalog"],a:1,w:"Imported agents enter a draft (undeployed) state [S9]."},
 {q:"Max size for a PDF in a knowledge base?",o:["1 MB","5 MB","25 MB","100 MB"],a:2,w:"docx, pdf and pptx files can be up to 25 MB [S21]."},
 {q:"Which IBM Cloud region needs Premium?",o:["Dallas","Frankfurt","Washington DC (us-east)","Tokyo"],a:2,w:"us-east is Premium only [S37]."},
 {q:"On IBM Cloud, the Builder role maps to…",o:["Viewer","Writer","Manager","Reader"],a:1,w:"Builder is Writer on IBM Cloud [S38]."},
 {q:"Where do you get the API key for the ADK on IBM Cloud?",o:["IBM Cloud resource list credentials","Orchestrate Settings → API details","The Terraform state","PyPI"],a:1,w:"IBM says not to use resource-page credentials; use Settings → API details [S6]."},
 {q:"How long does an IBM Cloud IAM token last?",o:["5 minutes","Up to 60 minutes","24 hours","Never expires"],a:1,w:"IAM tokens are valid up to 60 minutes; check expires_in [S41]."},
 {q:"Which env type do you use for an AWS-hosted instance?",o:["ibm_iam","mcsp","cpd","aws_sigv4"],a:1,w:"AWS instances use --type mcsp [S6]."},
 {q:"Which command manages guardrails and PII filtering?",o:["orchestrate policies","orchestrate controls","orchestrate guard","orchestrate env"],a:1,w:"orchestrate controls manages policy controls [S29]."},
 {q:"Python tool calls over about 90 seconds…",o:["Run forever","Hit the 2-minute timeout","Become async automatically","Are retried 3 times"],a:1,w:"Python tools have a 2-minute timeout including startup [S24]."},
 {q:"Which command renamed in ADK 2.0 adds an MCP toolkit?",o:["toolkits import","toolkits add","mcp add","tools import -k mcp"],a:1,w:"2.0 renamed 'toolkits import' to 'toolkits add' [S14]."},
 {q:"An OpenAPI tool spec must have…",o:["OpenAPI 3.1","A servers block with exactly one URL","XML responses","No operationId"],a:1,w:"One server URL, operationId per path, OpenAPI 3.0, JSON bodies [S13]."},
 {q:"What does 'No app-id given' mean?",o:["Wrong model","Tool needs a connection and you didn't pass --app-id","Agent YAML invalid","Token expired"],a:1,w:"The tool declares expected_credentials; pass --app-id on import [S23]."},
 {q:"Which connection kind can a Python toolkit bind?",o:["basic","key_value only","oauth_auth_code_flow","bearer"],a:1,w:"Only key_value connections are supported for Python toolkits [S12]."},
 {q:"Why must a Salesforce OAuth connection include offline_access or refresh_token?",o:["For MFA","To get a refresh token so it keeps working","For admin consent","It's optional"],a:1,w:"Without it the connection breaks after the first access token expires [S51, S59]."},
 {q:"What did IBM call the capabilities it announced on May 5, 2026?",o:["Agent Mesh","Agentic control plane","Watson Studio","Agent Hub"],a:1,w:"IBM's announcement calls them the agentic control plane [S71]."},
 {q:"Which models does IBM say the orchestrator agent uses?",o:["Only GPT models","Fine-tuned foundation models, including IBM Granite","Only Llama","No model"],a:1,w:"IBM: fine-tuned foundation models, including IBM Granite [S72]."}
];
window.BLOCKS.sort((a,b)=>a.id-b.id);
