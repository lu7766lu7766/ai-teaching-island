const includesAny=(q,words)=>words.some(w=>q.includes(w));
// 依關鍵字對應課程島；順序由具體到廣泛，避免「system prompt」被歸到一般提問、「agents.md」被歸到自訂 Agent。
function courseTopic(q){
 if(includesAny(q,['魔導高塔','harness','駕馭','回饋迴圈','事後檢查','事前引導','compaction','上下文壓縮','護欄']))return 'island-07';
 if(includesAny(q,['法器寶庫','skill','技能','mcp','context7','提示注入','promptinjection']))return 'island-06';
 if(includesAny(q,['契約之島','agents.md','agentsmd','/init','專案規則','自訂指令','斜線指令','$arguments','commands']))return 'island-04';
 if(includesAny(q,['鍊金','工房','後端','.env','server','伺服器','上線','部署','429','錯誤處理','多輪','previous_interaction','response_format','結構化輸出','jsonschema','json格式','回傳json']))return 'island-11';
 if(includesAny(q,['星門','渡口','api','金鑰','密鑰','fetch','javascript','前端','flash-lite','flashlite','interactions','temperature']))return 'island-09';
 if(includesAny(q,['符文','提示詞工程','promptengineering','few-shot','fewshot','給範例','拆解','串接','chaining','自我檢查','評估','罵']))return 'island-08';
 if(includesAny(q,['魔法書','systemprompt','系統提示','系統指令','aistudio','systeminstruction']))return 'island-02';
 if(includesAny(q,['使魔','subagent','子agent','agent','代理人','權限','permission','reviewer']))return 'island-05';
 if(includesAny(q,['魔杖工坊','opencode','免費模型','bigpickle','安裝','/models','/undo','plan','build']))return 'island-03';
 if(includesAny(q,['水晶球','觀測所','token','幻覺','hallucination','知識截止','上下文長度','contextwindow','語言模型','llm','ai怎麼運作','ai是什麼','記憶功能','文字接龍']))return 'island-10';
 if(includesAny(q,['咒語入門','gemini','提問','問問題','提示詞','prompt','五要素','查證','notebook','notebooklm','筆記本','多模態','rag','先找再答']))return 'island-01';
 return null;
}
export function answerIslandQuestion(input,data){const q=String(input).trim().toLowerCase().replace(/[？?！!，,。\s]/g,'');const center={id:'center',name:data.center.name};const result=(text,ids=[])=>({text,sources:ids.map(id=>id==='center'?center:{id,name:data.courses.find(c=>c.id===id)?.name}).filter(x=>x.name)});
 if(!q)return result('我是島主咒咒！你可以問我課程內容、網站怎麼用，或該從哪一座島開始。',['center']);
 if(includesAny(q,['答案','正解','選哪個','第幾題','第1題','第2題','第3題','第4題']))return result('我不直接提供測驗答案喔！你可以問我教材概念，或先作答再閱讀每題解析；我們一起把觀念弄懂。',[]);
 if(includesAny(q,['魔法杖','榮譽島民','撿','收集魔杖','幾把']))return result('群島上藏了 14 把魔法杖：中央島和每座課程島各 1 把，另外 2 把在橋上。點島名或島面放大後，點發光的魔法杖就能撿起，進度會記在中央廣場的「進度與證書」。集滿 14 把就成為「榮譽島民」：你的分身會出現在中央島散步，紀念證書也會加上榮譽島民印記。魔法杖紀錄存在這個瀏覽器，也會一起匯出到進度備份檔。',['center']);
 const explicit=courseTopic(q);
 if(explicit&&!includesAny(q,['證書','測驗','考試','總複習','已讀','我的進度','本站','這個網站'])){const c=data.courses.find(c=>c.id===explicit);return result(c.name+'：'+c.blocks.map(b=>b.text).join('\n\n')+'\n\n以上依本站教材整理，實際功能以官方最新版本為準。',[explicit]);}
 const centerBlock=title=>{const b=data.center.blocks.find(b=>b.title.includes(title));return b?b.title+'：\n'+b.text:null;};
 if(includesAny(q,['專題','作品','小幫手'])&&centerBlock('畢業專題'))return result(centerBlock('畢業專題'),['center']);
 if(includesAny(q,['辭典','名詞','詞彙','術語'])&&centerBlock('名詞小辭典'))return result(centerBlock('名詞小辭典'),['center']);
 if(includesAny(q,['安全','守則','隱私','個資','著作權','版權','揭露','抄襲','倫理','提示注入','promptinjection','注入','偏見','歧視','最小權限'])&&centerBlock('守則'))return result(centerBlock('守則'),['center']);
 if(includesAny(q,['工具形態','六種形態','網頁版','桌面版','手機app','命令列','編輯器','挑工具','用哪個工具'])&&centerBlock('六種形態'))return result(centerBlock('六種形態'),['center']);
 if(includesAny(q,['你是誰','島主','咒咒','介紹自己']))return result('我是咒咒，中央島的島主！其他每座課程島也各有一位島主，例如水晶球觀測所的觀星師望望、鍊金工房的鍊金術士爐爐；點島上的島主就能問他們。我們都依本站教材與功能說明協助導覽，不會連到外部 AI，也不直接揭露測驗答案。中央島塔前站著的是講師王子齊（Jac），點他可以看講師介紹。',['center']);
 if(includesAny(q,['證書','證明','畢業','75']))return result('要領取學習完成紀念證書，十一課都標記已讀，而且各課測驗至少 75 分。到中央廣場的「進度與證書」輸入姓名，就能下載 PNG 或列印／另存 PDF；這是學習紀念，不代表官方認證。',['center']);
 if(includesAny(q,['進度','存在哪','存哪裡','保存','儲存','重置','接續','不同電腦','換電腦']))return result('閱讀紀錄與測驗最高分保存在目前瀏覽器。重新整理會保留；換瀏覽器或裝置不會自動同步。中央廣場「進度與證書」可匯出 JSON 備份，換裝置後匯入接續；會合併已讀並保留最高分，也可清除紀錄。若瀏覽器拒絕儲存，會提示「僅本次有效」，這次操作仍可繼續，但重新整理後不會保留。',['center']);
 if(includesAny(q,['室內','學習室','進入中央','中央主島']))return result('先點中央主島聚焦外觀，再點主建築進入3D學習室；可拖曳旋轉或雙指縮放，點室內咒咒才會開啟廣場教材。按「返回中央島」回戶外；課程清單仍可直接查看廣場、測驗與證書。',['center']);
 if(includesAny(q,['導覽列','側欄','收攏','收合導覽']))return result('右上「收合導覽／開啟導覽」可隱藏或恢復左側功能清單，讓群島使用全部寬度。此設定保存在目前瀏覽器；不影響你的學習進度。',['center']);
 if(includesAny(q,['控制列','收起設定','隱藏設定','展開設定']))return result('右上「控制列」按鈕可顯示或隱藏上方控制列；其中有底色、日夜光線、減少動態、音樂、音量和文字清單。咒咒介紹及操作說明收進右上「？」。',['center']);
 if(includesAny(q,['清單','搜尋','找課','分類','段落']))return result('按下上方控制列的「文字清單」，就能展開十一座課程島，搜尋關鍵字，點選章節直接讀教材。旁邊的課程清單也能依四個海域篩選，不用操作 3D 就能讀完全部課程。',['center']);
 if(includesAny(q,['學習單','開放題']))return result('本站沒有學習單功能，每課只有教材與隨堂測驗；十一課已讀、每課測驗至少 75 分即可領取紀念證書。',['center']);
 if(includesAny(q,['測驗','考試','總複習','抽題','分數','及格']))return result('每課有四題隨堂測驗，提交後會顯示缺答、分數與逐題解析，並保留最高分。中央廣場的總複習每次從十一課各抽一題，共十一題；證書資格仍以各課測驗達 75 分為準。',['center']);
 if(includesAny(q,['白天','夜晚','夜海','黃昏','主題','色調','日夜','萬聖節','南瓜','蝙蝠','巫婆帽']))return result('現在是可愛萬聖節小島，使用奶油橘、薰衣草紫與鼠尾草綠，島上有笑臉南瓜、巫婆帽屋頂與空中蝙蝠。開啟「減少動態」也會停止蝙蝠飛行及振翅。上方控制列有晨光、海霧、夜海三種底色，以及白天／夜晚開關與光線選單。選夜海時會預設夜晚光線，之後還能獨立改成白天或黃昏。你的選擇會保存在這個瀏覽器。',['center']);
 if(includesAny(q,['人物','居民','島民','島嶼','點島','建築','放大','小人','散步','走路','橋','旋轉','縮放','全景','動態','暈']))return result('先點島名或島面聚焦放大，再點主建築讀教材。聚焦後可點22位具名島民的頭頂提示，看各自不同的關鍵概念；每座島也都有沿步道走動的咒咒可提問。島民沿環形步道與橋行走，開啟「減少動態」會暫停，按「回到全景」可重新選島。',['center']);
 if(includesAny(q,['音樂','聲音','播放']))return result('按下「開啟音樂」才會開始播放你提供的背景音樂 The_Uninvited_Guest_s_Waltz，再按一次即可關閉；可用旁邊音量滑桿調整0–100%，網站會記住音量；不會自動播放聲音。',['center']);
 if(includesAny(q,['作者','講師','聯絡',String(data.speaker.name||'').toLowerCase()||'講師']))return result(`網站作者是${data.site.author}${data.speaker.name?`，講師為${data.speaker.name}${data.speaker.alias?'／'+data.speaker.alias:''}`:''}。中央廣場有講師介紹${data.site.contact?'與聯絡連結':''}。`,['center']);
 if(includesAny(q,['從哪','開始','幾座','有哪些課','怎麼學','推薦','入門','順序','路線']))return result('這裡有十一座課程島與中央廣場，依難易度排列：水晶球觀測所（AI 怎麼運作）→ 咒語入門島（Gemini 免費版提問）→ 符文研究所（提示詞工程）→ 魔法書之島（System Prompt）→ 魔杖工坊（OpenCode 安裝與免費模型）→ 契約之島（AGENTS.md）→ 星門渡口（申請 API Key、用 JavaScript 串接 Gemini API）→ 鍊金工房（多輪對話、結構化輸出、後端上線）→ 使魔召喚島（自訂 Agent）→ 法器寶庫島（Skills 與 MCP）→ 魔導高塔（Harness 工程）。建議從第一站照順序前進，也能依需要直接選課。',['island-10','island-03','island-07']);
 const tokens=[...new Set(q.match(/[a-z0-9]+|[\u4e00-\u9fff]{2}/g)||[])].filter(t=>!['什麼','怎麼','如何','可以','請問','老師'].includes(t));let candidates=[];for(const c of data.courses)for(const b of c.blocks){const hay=(c.name+b.title+b.text).toLowerCase();const score=tokens.reduce((sum,t)=>sum+(hay.includes(t)?t.length:0),0);if(score>=4)candidates.push({c,b,score});}candidates.sort((a,b)=>b.score-a.score);if(candidates.length){const best=candidates[0];return result(best.b.title+'：'+best.b.text,[best.c.id]);}
 return result('目前本站教材找不到這個問題的可靠答案，我不會亂猜。你可以問「怎麼拿證書」、「OpenCode 免費模型怎麼用」、「Harness 是什麼」，或用清單搜尋課程。',[]);
}
