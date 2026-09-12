import initial from './initial-jobs.json';
import {scoped} from './identity';
// Bounded first-run snapshot import; schema creation belongs to Drizzle migrations.
// INSERT OR IGNORE preserves any records already collected by a concurrent refresh.
export async function initialise(db:D1Database,user='anonymous'){
 const marker=scoped('initialised',user);if(await db.prepare('SELECT id FROM settings WHERE id=?').bind(marker).first())return;
 const [jobs,scans,settings]=await Promise.all([db.prepare('SELECT * FROM jobs').all<any>(),db.prepare('SELECT * FROM scans').all<any>(),db.prepare('SELECT * FROM settings').all<any>()]);
 const statements:any[]=[];const legacyJobs=jobs.results.filter((r:any)=>r.id.split(':').length===2);const sourceJobs=legacyJobs.length?legacyJobs:initial.jobs;
 for(const r of sourceJobs){const id=scoped(r.id,user);statements.push(db.prepare('INSERT OR IGNORE INTO jobs(id,source,payload,status,notes,followup,first_seen,last_seen,availability) VALUES(?,?,?,?,?,?,?,?,?)').bind(id,r.source,r.payload,r.status||'Saved',r.notes||'',r.followup||'',r.first_seen,r.last_seen,r.availability||'Listed'));}
 const legacyScans=scans.results.filter((r:any)=>!r.id.includes(':'));for(const r of legacyScans.length?legacyScans:initial.scans)statements.push(db.prepare('INSERT OR IGNORE INTO scans(id,checked,result) VALUES(?,?,?)').bind(scoped(r.id,user),r.checked,r.result));
 for(const r of settings.results.filter((r:any)=>['profile','sources'].includes(r.id)))statements.push(db.prepare('INSERT OR IGNORE INTO settings(id,payload) VALUES(?,?)').bind(scoped(r.id,user),r.payload));
 statements.push(db.prepare('INSERT OR IGNORE INTO settings(id,payload) VALUES(?,?)').bind(marker,'true'));await db.batch(statements);
}
