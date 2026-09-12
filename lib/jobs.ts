export type Profile={months:number;graduation:number;floor:number;skills:string[]};
export const defaultProfile:Profile={months:6,graduation:2025,floor:15,skills:['Python','C++','Java','SQL','FastAPI','Flask','PostgreSQL','Redis','Docker','AWS','React','TypeScript','RAG','LangGraph','PyTorch','TensorFlow','Machine Learning','Git','REST','Data Structures','Algorithms','MongoDB','Celery','Kubernetes'].filter(s=>s!=='Kubernetes'&&s!=='TypeScript')};
export type Source={id:string;company:string;provider:'greenhouse'|'ashby'|'lever'|'amazon';board:string};
const greenhouseBoards:Record<string,string>={stripe:'Stripe',coinbase:'Coinbase',twilio:'Twilio',databricks:'Databricks',rubrik:'Rubrik',okta:'Okta',postman:'Postman',netskope:'Netskope',cloudflare:'Cloudflare',figma:'Figma',discord:'Discord',reddit:'Reddit',lyft:'Lyft',brex:'Brex',airtable:'Airtable',datadog:'Datadog',hubspot:'HubSpot',elastic:'Elastic',mongodb:'MongoDB',samsara:'Samsara'};
const ashbyBoards:Record<string,string>={sarvam:'Sarvam AI',ema:'Ema',browserbase:'Browserbase',plane:'Plane',linear:'Linear',perplexity:'Perplexity',cursor:'Cursor',vercel:'Vercel',replit:'Replit',modal:'Modal',ramp:'Ramp',deel:'Deel',sentry:'Sentry'};
export const sources:Source[]=[{id:'amazon',company:'Amazon',provider:'amazon',board:'amazon'},...Object.entries(greenhouseBoards).map(([board,company])=>({id:board,company,provider:'greenhouse' as const,board})),...Object.entries(ashbyBoards).map(([board,company])=>({id:board,company,provider:'ashby' as const,board}))];
export const watchlist=[
 {company:'Google',url:'https://www.google.com/about/careers/applications/jobs/results/?q=Software%20Engineer&location=India'},
 {company:'Microsoft',url:'https://jobs.careers.microsoft.com/global/en/search?q=software%20engineer&lc=India'},
 {company:'PayPal',url:'https://paypal.wd1.myworkdayjobs.com/en-US/jobs'},
 {company:'Atlassian',url:'https://www.atlassian.com/company/careers/all-jobs'},
 {company:'NVIDIA',url:'https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite'},
 {company:'Adobe',url:'https://careers.adobe.com/us/en/search-results'},
 {company:'Uber',url:'https://www.uber.com/global/en/careers/list/'},
 {company:'Salesforce',url:'https://careers.salesforce.com/en/jobs/'},
 {company:'Flipkart',url:'https://www.flipkartcareers.com/'},
 {company:'Walmart Global Tech',url:'https://careers.walmart.com/us/en/teams/technology'},
 {company:'JPMorgan Chase',url:'https://www.jpmorganchase.com/careers'},
 {company:'Goldman Sachs',url:'https://www.goldmansachs.com/careers'},
 {company:'DE Shaw',url:'https://www.deshawindia.com/careers'},
 {company:'Arcesium',url:'https://www.arcesium.com/careers'},
 {company:'Tower Research',url:'https://www.tower-research.com/open-positions/'},
 {company:'CRED',url:'https://cred.club/careers'},
 {company:'Razorpay',url:'https://razorpay.com/jobs/'},
 {company:'Meesho',url:'https://www.meesho.io/jobs'},
 {company:'Swiggy',url:'https://careers.swiggy.com/'},
 {company:'Zomato',url:'https://www.zomato.com/careers'},
 {company:'PhonePe',url:'https://www.phonepe.com/careers/'},
 {company:'Groww',url:'https://groww.in/careers'},
 {company:'Myntra',url:'https://careers.myntra.com/'},
 {company:'Zoho',url:'https://www.zoho.com/careers/'},
 {company:'Freshworks',url:'https://www.freshworks.com/company/careers/'},
 {company:'BrowserStack',url:'https://www.browserstack.com/careers'},
 {company:'Chargebee',url:'https://www.chargebee.com/careers/'},
 {company:'InMobi',url:'https://www.inmobi.com/company/careers'},
 {company:'Mindtickle',url:'https://www.mindtickle.com/careers/'},
 {company:'Thoughtworks',url:'https://www.thoughtworks.com/careers'},
 {company:'SAP',url:'https://jobs.sap.com/go/All-Jobs/879901/'},
 {company:'Oracle',url:'https://www.oracle.com/careers/'},
 {company:'Cisco',url:'https://jobs.cisco.com/'},
 {company:'Intel',url:'https://jobs.intel.com/en/search-jobs/India/599/1'},
 {company:'ServiceNow',url:'https://careers.servicenow.com/'},
 {company:'Qualcomm',url:'https://careers.qualcomm.com/careers'},
 {company:'Arm',url:'https://careers.arm.com/'},
 {company:'OpenAI',url:'https://openai.com/careers/search/'},
 {company:'Anthropic',url:'https://www.anthropic.com/careers'},
 {company:'Hugging Face',url:'https://apply.workable.com/huggingface/'},
 {company:'Scale AI',url:'https://scale.com/careers'},
 {company:'Mistral AI',url:'https://mistral.ai/careers'},
 {company:'Cohere',url:'https://cohere.com/careers'},
 {company:'Snowflake',url:'https://careers.snowflake.com/us/en/search-results'},
 {company:'Palantir',url:'https://www.palantir.com/careers/'},
 {company:'Confluent',url:'https://www.confluent.io/about/careers/'},
 {company:'HashiCorp',url:'https://www.hashicorp.com/career/open-positions'}
];
export type Job={id:string;source:string;company:string;title:string;location:string;url:string;description:string;requirements?:string;posted:string|null;dateLabel:string;pay:string;collected:string};
export type Row={id:string;source:string;payload:string;status:string;notes:string;followup:string;first_seen:string;last_seen:string;availability:string};
export function plain(s:string){return (s||'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<\/(?:p|li|div|h\d)>|<br\s*\/?>/gi,'\n').replace(/<[^>]+>/g,' ').replace(/&nbsp;|&#160;/g,' ').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/[ \t]+/g,' ').replace(/\n\s*\n/g,'\n').trim();}
const patterns:Record<string,RegExp>={'Python':/\bpython\b/i,'C++':/\bc\+\+/i,'Java':/\bjava\b/i,'JavaScript':/\bjavascript\b/i,'TypeScript':/\btypescript\b/i,'Go':/\bgolang\b|\bGo programming\b/,'SQL':/\bsql\b/i,'FastAPI':/\bfastapi\b/i,'Flask':/\bflask\b/i,'PostgreSQL':/\bpostgres(?:ql)?\b/i,'Redis':/\bredis\b/i,'Docker':/\bdocker\b/i,'AWS':/\baws\b|amazon web services/i,'React':/\breact\b/i,'RAG':/\brag\b|retrieval.augmented/i,'LangGraph':/\blanggraph\b/i,'PyTorch':/\bpytorch\b/i,'TensorFlow':/\btensorflow\b/i,'Machine Learning':/machine learning/i,'Git':/\bgit\b/i,'REST':/\brest(?:ful)?\b/i,'Data Structures':/data structures/i,'Algorithms':/\balgorithms\b/i,'MongoDB':/\bmongodb\b/i,'Celery':/\bcelery\b/i,'Kubernetes':/\bkubernetes\b|\bk8s\b/i,'Spring':/\bspring\b/i,'Kafka':/\bkafka\b/i};
export function assess(j:Job,p:Profile){
 const raw=(j.requirements||j.description).replace(/[–—‑−]/g,'-'); const required=raw.split(/\n\s*(?:preferred qualifications|nice.to.haves?|bonus points|what would be great|good to have)\s*[:\n]/i)[0];
 const experienceLines=required.split(/\n|[.;](?=\s)/).filter(l=>/experience|\byears?\s+(?:in|of|building|developing|working|writing)/i.test(l)&&!/preferred|nice to have|bonus|university education|years? of (?:study|education)/i.test(l));
 const nums=experienceLines.flatMap(l=>[...l.matchAll(/(\d+(?:\.\d+)?)\s*(?:[-]|to)?\s*(?:\d+\s*)?\+?\s*years?\b/gi)].map(m=>Number(m[1])));
 const min=nums.length?Math.max(...nums):null;
 const early=/new grad|graduate|fresher|entry.level|junior|emerging talent|\bSDE[ -]?1\b|engineer[ ,(-]+(?:I|1|L1)(?:\b|\))/i.test(j.title);
 const cohortLines=required.split(/\n|\./).filter(l=>/(?:graduat(?:e|es|ing|ion)|class of|batch)/i.test(l)&&/20[2-3]\d/.test(l));
 const cohorts=cohortLines.flatMap(l=>[...l.matchAll(/20[2-3]\d/g)].map(m=>Number(m[0])));
 const cohortMismatch=cohorts.length>0&&!cohorts.includes(p.graduation);
 const student=/currently enrolled|currently pursuing|must be enrolled/i.test(required);
 const intern=/\bintern(?:ship)?\b/i.test(j.title);
 const senior=/senior|\bsr\.?\s|staff|principal|architect|manager|\blead\b|\bIII\b|\bIV\b/i.test(j.title);
 let eligibility=cohortMismatch||student||senior?'Not eligible':min!==null&&min>p.months/12?(min<=1?'1-year stretch':'Experience gap'):min!==null||early?'Likely eligible':'Verify requirements';
 if(intern&&['Likely eligible','Verify requirements'].includes(eligibility))eligibility='Verify student eligibility';
 const mentioned=Object.keys(patterns).filter(s=>patterns[s].test(j.description));
 const matched=mentioned.filter(s=>p.skills.some(x=>x.toLowerCase()===s.toLowerCase()));
 const gaps=mentioned.filter(s=>!matched.includes(s));
 const fit=mentioned.length?Math.round(matched.length/mentioned.length*100):null;
 const payText=j.pay+'\n'+j.description; const pm=payText.match(/(?:₹|INR\s*)?(\d+(?:\.\d+)?)\s*(?:[-–]\s*(\d+(?:\.\d+)?)\s*)?(?:LPA|lakhs?\s*(?:per annum|annually|p\.?a\.?))/i);
 const low=pm?Number(pm[1]):null; const high=pm?Number(pm[2]||pm[1]):null;
 const payState=low===null?'Undisclosed':low>p.floor?'Above target':high!>p.floor?'Overlaps target':'Below target';
 return {min,eligibility,fit,matched,gaps,experienceEvidence:experienceLines.filter(l=>/years?/i.test(l)),cohortEvidence:cohortLines,student,intern,payState,payEvidence:pm?.[0]||j.pay||'Not disclosed in the source',early};
}
export function relevant(j:Job){return /software|backend|back.end|full.stack|frontend|front.end|machine learning|\bai\b|sde|developer/i.test(j.title)&&!/senior|\bsr\.?\s|staff|principal|architect|manager|\blead\b|\bIII\b|\bIV\b/i.test(j.title)&&/india|bengaluru|bangalore|hyderabad|pune|chennai|mumbai|gurugram|gurgaon|noida|delhi|\bIN,|IND\b/i.test(j.location);}
export function safeUrl(s:string){try{let u=new URL(s);return u.protocol==='https:'&&!u.username&&!u.password?u.href:''}catch{return ''}}
