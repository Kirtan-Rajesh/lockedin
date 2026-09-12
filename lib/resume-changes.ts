export type ResumeChange={before:string;after:string;reason:string};
export type Optimization={summary:string;changes:ResumeChange[];warnings:string[]};
export function validateOptimization(value:unknown,source:string):Optimization {
  const v=value as Optimization;
  if(!v||typeof v.summary!=='string'||!Array.isArray(v.changes)||v.changes.length>25||!Array.isArray(v.warnings)||!v.warnings.every(x=>typeof x==='string'))throw Error('Invalid optimization report.');
  const ranges:Array<[number,number]>=[];
  for(const c of v.changes){
    if(!c||typeof c.before!=='string'||!c.before||typeof c.after!=='string'||typeof c.reason!=='string'||!c.reason||c.before===c.after)throw Error('Each suggestion must contain an exact original passage, a different replacement and a reason.');
    const i=source.indexOf(c.before);
    if(i<0||source.indexOf(c.before,i+1)>=0)throw Error('A suggested passage is missing or ambiguous. Optimize the current draft again.');
    if(ranges.some(([a,b])=>i<b&&i+c.before.length>a))throw Error('Suggestions overlap. Request independent changes.');
    ranges.push([i,i+c.before.length]);
  }
  return v;
}
export function applyChanges(source:string,changes:ResumeChange[]) {
  validateOptimization({summary:'Apply',changes,warnings:[]},source);
  const ordered=changes.map(c=>({...c,index:source.indexOf(c.before)})).sort((a,b)=>b.index-a.index);
  for(const c of ordered)source=source.slice(0,c.index)+c.after+source.slice(c.index+c.before.length);
  if(source.length>50000)throw Error('The revised draft exceeds the document size limit.');
  return source;
}
