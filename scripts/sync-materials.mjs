import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {loadMarkdownMaterials} from '../js/materials.mjs';
export const siteRoot=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export async function syncMaterials(){const d=await loadMarkdownMaterials(p=>readFile(resolve(siteRoot,p),'utf8'));await writeFile(resolve(siteRoot,'data/content.json'),JSON.stringify(d,null,2)+'\n');
 const blocks=bs=>bs.map(b=>`<h3>${esc(b.title)}</h3><p>${esc(b.text)}</p>`).join('');
 const speaker=d.speaker;let body=`<a href="./">返回群島首頁</a><h1>${esc(d.site.title)}</h1><p>${esc(d.editorialNote)}</p><h2>講師介紹：${esc(speaker.name)}／${esc(speaker.alias)}</h2>`+[['學歷','education'],['經歷','experience']].filter(([,k])=>speaker[k]).map(([l,k])=>`<p>${l}：${esc(speaker[k])}</p>`).join('')+'<ul>'+speaker.current.map(s=>`<li>${esc(s)}</li>`).join('')+'</ul>'+blocks(d.center.blocks);
 for(const c of d.courses){body+=`<section><h2>${c.order}. ${esc(c.name)}</h2><p>${esc(c.intro)}</p><p>${esc(c.goalLabel)}：${esc(c.goal)}</p>`+blocks(c.blocks);if(c.comparison){const t=c.comparison;body+='<table><thead><tr>'+t.headers.map(h=>`<th>${esc(h)}</th>`).join('')+'</tr></thead><tbody>'+t.rows.map(r=>'<tr>'+r.map(v=>`<td>${esc(v)}</td>`).join('')+'</tr>').join('')+'</tbody></table>';}
 body+=c.prompts.map((p,i)=>`<h3>${esc(c.promptTitles[i])}</h3><pre>${esc(p)}</pre>`).join('')+c.links.map(l=>`<p><a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}</a> ${esc(l.note)}</p>`).join('');body+='<h3>自編練習題</h3>'+c.quiz.map(q=>`<details><summary>${esc(q.question)}</summary><ol>${q.options.map(o=>`<li>${esc(o.text)}</li>`).join('')}</ol><p>正確答案：${esc(q.options.find(o=>o.id===q.answer).text)}<br>${esc(q.explanation)}</p></details>`).join('')+'</section>';}
 await writeFile(resolve(siteRoot,'content.html'),'<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>完整文字教材｜'+esc(d.site.title)+'</title><style>body{font:18px/1.8 system-ui;max-width:850px;margin:auto;padding:24px;background:#fffaf1;color:#382e42}pre,p{white-space:pre-wrap;overflow-wrap:anywhere}table{border-collapse:collapse}td,th{border:1px solid;padding:8px}a{color:#5f357e}</style><body><main>'+body+'</main></body></html>');return d;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){try{const d=await syncMaterials();console.log(`已由 Markdown 同步 ${d.courses.length} 座課程島與中央島。`);}catch(e){console.error('教材同步失敗：'+e.message);process.exitCode=1;}}
