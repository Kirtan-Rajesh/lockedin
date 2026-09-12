'use client';
import {useEffect,useRef,useState} from 'react';
export default function ResumePdfPreview({data}:{data:Uint8Array}){
 const container=useRef<HTMLDivElement>(null),[error,setError]=useState('');
 useEffect(()=>{
  let disposed=false,task:any;const renders:any[]=[];setError('');container.current?.replaceChildren();
  (async()=>{
   const lib=await import('pdfjs-dist');if(disposed)return;
   lib.GlobalWorkerOptions.workerSrc='/latex/pdf.worker.min.mjs';
   task=lib.getDocument({data:new Uint8Array(data)});const doc=await task.promise;
   for(let i=1;i<=doc.numPages;i++){
    if(disposed)return;const page=await doc.getPage(i);if(disposed)return;
    const viewport=page.getViewport({scale:1.5});const canvas=document.createElement('canvas');canvas.width=viewport.width;canvas.height=viewport.height;canvas.setAttribute('aria-label',`Résumé page ${i} of ${doc.numPages}`);canvas.setAttribute('role','img');container.current?.appendChild(canvas);
    const render=page.render({canvas,viewport});renders.push(render);await render.promise;
   }
  })().catch(e=>{if(!disposed)setError(e instanceof Error?e.message:'PDF preview unavailable.');});
  return()=>{disposed=true;renders.forEach(r=>r.cancel());void task?.destroy();};
 },[data]);
 return <div className="pdf-pages" aria-label="Compiled resume PDF">{error&&<p role="alert">{error} You can still download the compiled PDF.</p>}<div ref={container}/></div>;
}
