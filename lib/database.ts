import {env} from 'cloudflare:workers';
export function database(){const db=(env as unknown as {DB:D1Database}).DB;if(!db)throw Error('Storage is unavailable');return db;}
export function failure(e:unknown){console.error(e);return Response.json({error:e instanceof Error?e.message:'Request failed. Please retry.'},{status:500});}
export function guard(req:Request){const o=req.headers.get('origin');if((o&&o!==new URL(req.url).origin)||req.headers.get('sec-fetch-site')==='cross-site')throw Error('Cross-site request rejected');}
