export const COURSE_COUNT=11;
// 同一個解析器供網站及本機同步工具使用；教材從 .md 讀取，無第三方套件。
function sections(source){let fence=false,current=null;const out=[];for(const line of source.replace(/\r/g,'').split('\n')){if(!fence&&/^## /.test(line)){current={title:line.slice(3).trim(),lines:[]};out.push(current);}else if(current)current.lines.push(line);if(/^```/.test(line))fence=!fence;}if(fence)throw Error('Markdown 的程式碼區塊未以 ``` 結束。');return new Map(out.map(s=>[s.title,s.lines.join('\n').trim()]));}
function jsonSection(s,key){const value=s.get(key);if(value===undefined)throw Error('缺少「'+key+'」段落。');const match=/^```json\n([\s\S]*?)\n```$/.exec(value);if(!match)throw Error('「'+key+'」須保留完整 json 程式碼區塊。');try{return JSON.parse(match[1]);}catch{throw Error('「'+key+'」的 JSON 格式不正確。');}}
function subsections(text){let fence=false,current=null;const out=[];for(const line of (text||'').split('\n')){if(!fence&&/^### /.test(line)){current={title:line.slice(4).trim(),lines:[]};out.push(current);}else if(current)current.lines.push(line);else if(line.trim())throw Error('教材段落須以 ### 標題開頭。');if(/^```/.test(line))fence=!fence;}return out.map(s=>({title:s.title,text:s.lines.join('\n').trim()}));}
export function parseIslandMarkdown(source,central=false){const s=sections(source),meta=jsonSection(s,'資料設定'),blocks=subsections(s.get('教材內容'));if(!blocks.length)throw Error('至少需要一段教材內容。');if(central)return {...meta,center:{...meta.center,blocks}};
 const prompts=subsections(s.get('教材提示詞'));for(const p of prompts){const m=/^```(text|html|js|javascript|json|bash)\n([\s\S]*?)\n```$/.exec(p.text);if(!m)throw Error('提示詞須以 text 程式碼區塊包住（程式碼範例可用 html、js、json、bash）。');p.kind=m[1]==='text'?'prompt':'code';p.text=m[2];}
 const course={...meta,blocks,prompts:prompts.map(p=>p.text),promptTitles:prompts.map(p=>p.title),promptKinds:prompts.map(p=>p.kind),links:jsonSection(s,'延伸資源'),quiz:jsonSection(s,'隨堂測驗')},residents=jsonSection(s,'島民概念');
 if(!course.id||!course.name||!Array.isArray(course.quiz)||course.quiz.length!==4)throw Error('課程必須保留識別碼、名稱與四題測驗。');
 for(const q of course.quiz)if(!q.id||!q.question||!Array.isArray(q.options)||!q.options.some(o=>o.id===q.answer)||!q.explanation)throw Error('測驗題目、選項、答案或解析不完整。');
 for(const l of course.links)if(!/^https?:\/\//.test(l.url))throw Error('延伸資源須使用完整 http(s) 網址。');
 for(const person of residents)if(person.island!==course.id||!blocks[person.topic])throw Error('島民的 island 或 topic 對應不到教材段落，請同步調整。');
 return {course,residents};
}
export async function loadMarkdownMaterials(read){const manifest=JSON.parse(await read('islands/manifest.json')),central=parseIslandMarkdown(await read(manifest.center),true),items=await Promise.all(manifest.courses.map(async path=>{try{return parseIslandMarkdown(await read(path));}catch(e){throw Error(path+'：'+e.message);}}));const data={...central,courses:items.map(x=>x.course),residents:items.flatMap(x=>x.residents).sort((a,b)=>Number(a.id.slice(9))-Number(b.id.slice(9)))};
 if(data.courses.some(c=>!c.host?.name||!c.host?.title))throw Error('每座課程島的資料設定須有 host（島主 name 與 title）。');const hostNames=data.courses.map(c=>c.host.name);if(new Set([...hostNames,'咒咒',...data.residents.map(r=>r.name)]).size!==hostNames.length+1+data.residents.length)throw Error('島主與島民的名字不可重複，也不可叫咒咒。');
 const n=data.courses.length;if(n!==COURSE_COUNT||new Set(data.courses.map(c=>c.id)).size!==n||data.courses.some((c,i)=>c.order!==i+1))throw Error('本專案須有'+COURSE_COUNT+'課且順序（order）連續；增減整島需同步修改場景位置（js/world.mjs）與 COURSE_COUNT。');
 const questionIds=data.courses.flatMap(c=>c.quiz.map(q=>q.id));if(new Set(questionIds).size!==n*4)throw Error('測驗識別碼不可重複。');
 const people=n*2;if(data.residents.length!==people||new Set(data.residents.map(r=>r.id)).size!==people||new Set(data.residents.map(r=>r.name)).size!==people||new Set(data.residents.map(r=>r.concept)).size!==people)throw Error('每座島須有2位島民，識別碼、姓名與概念皆不可重複。');
 return data;
}
