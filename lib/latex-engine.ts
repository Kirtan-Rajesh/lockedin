// SwiftLaTeX pdfTeX runs in a dedicated browser worker. Only public TeX packages
// are fetched; the resume source stays in the worker's in-memory filesystem.
export class LatexEngine {
  private worker?: Worker;
  private ready?: Promise<void>;
  close() { this.worker?.terminate(); this.worker=undefined; this.ready=undefined; }
  async compile(source:string,onProgress?:(message:string)=>void):Promise<{pdf:Uint8Array;log:string}> {
    if (!this.ready) {
      const worker=this.worker=new Worker('/latex/swiftlatexpdftex.js');
      this.ready=new Promise((resolve,reject)=>{
        const timer=setTimeout(()=>{this.close();reject(Error('LaTeX engine could not start. Retry compilation.'));},30000);
        worker.onerror=()=>{clearTimeout(timer);this.close();reject(Error('LaTeX engine failed to load.'));};
        worker.onmessage=e=>{clearTimeout(timer);if(e.data.result==='ok')resolve();else reject(Error('LaTeX engine startup failed.'));};
      });
    }
    await this.ready;
    const worker=this.worker!;
    return new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>{this.close();reject(Error('Compilation timed out. Check your source or retry when the TeX package server is reachable.'));},180000);
      worker.onerror=()=>{clearTimeout(timer);this.close();reject(Error('The LaTeX compiler stopped. Retry compilation.'));};
      worker.onmessage=e=>{if(e.data.cmd==='progress'){onProgress?.(e.data.message);return;}if(e.data.cmd!=='compile')return;clearTimeout(timer);if(e.data.result==='ok'&&e.data.pdf)resolve({pdf:new Uint8Array(e.data.pdf),log:e.data.log||''});else reject(Error(e.data.log||'LaTeX compilation failed.'));};
      worker.postMessage({cmd:'settexliveurl',url:'https://texlive.texlyre.org/'});
      worker.postMessage({cmd:'writefile',url:'main.tex',src:source});
      worker.postMessage({cmd:'setmainfile',url:'main.tex'});
      worker.postMessage({cmd:'compilelatex'});
    });
  }
}
