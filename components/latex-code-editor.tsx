'use client';
import {useEffect,useRef} from 'react';
import {EditorState} from '@codemirror/state';
import {EditorView,keymap,lineNumbers,highlightActiveLine,drawSelection} from '@codemirror/view';
import {StreamLanguage,syntaxHighlighting,defaultHighlightStyle} from '@codemirror/language';
import {stex} from '@codemirror/legacy-modes/mode/stex';
import {history,historyKeymap,defaultKeymap,indentWithTab} from '@codemirror/commands';
import {searchKeymap,highlightSelectionMatches} from '@codemirror/search';
export default function LatexCodeEditor({value,onChange,onSave}:{value:string;onChange:(s:string)=>void;onSave:()=>void}){
 const host=useRef<HTMLDivElement>(null),view=useRef<EditorView|null>(null),callbacks=useRef({onChange,onSave});
 callbacks.current={onChange,onSave};
 useEffect(()=>{const editor=new EditorView({parent:host.current!,state:EditorState.create({doc:value,extensions:[lineNumbers(),drawSelection(),highlightActiveLine(),history(),highlightSelectionMatches(),StreamLanguage.define(stex),syntaxHighlighting(defaultHighlightStyle),EditorView.lineWrapping,keymap.of([{key:'Mod-s',run:()=>{callbacks.current.onSave();return true;}},...defaultKeymap,...historyKeymap,...searchKeymap,indentWithTab]),EditorView.contentAttributes.of({'aria-label':'LaTeX source',spellcheck:'false'}),EditorView.updateListener.of(u=>{if(u.docChanged)callbacks.current.onChange(u.state.doc.toString());}),EditorView.theme({'&':{height:'100%',fontSize:'14px'},'.cm-scroller':{overflow:'auto',fontFamily:'Consolas, monospace'},'.cm-content':{padding:'16px 0'},'.cm-gutters':{background:'#f2f5f6',color:'#74818c',borderRight:'1px solid #dfe5e8'}})]})});view.current=editor;return()=>{editor.destroy();view.current=null;};},[]);
 useEffect(()=>{const v=view.current;if(v&&v.state.doc.toString()!==value)v.dispatch({changes:{from:0,to:v.state.doc.length,insert:value}});},[value]);
 return <div ref={host} className="latex-code"/>;
}
