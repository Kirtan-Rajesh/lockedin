const valid=/^[A-Za-z0-9_-]{8,160}$/;
export function workspaceId(req:Request){
 const platform=req.headers.get('oai-authenticated-user-id')?.trim();
 const local=req.headers.get('x-launchpad-user-id')?.trim();
 return platform&&valid.test(platform)?platform:local&&valid.test(local)?local:'anonymous';
}
export function scoped(id:string,user:string){return `${user}:${id}`;}
export function clientHeaders():Record<string,string>{
 if(typeof window==='undefined')return {};
 let id=window.localStorage.getItem('launchpad-user-id');
 if(!id){id=crypto.randomUUID();window.localStorage.setItem('launchpad-user-id',id);}
 return {'X-Launchpad-User-ID':id};
}
