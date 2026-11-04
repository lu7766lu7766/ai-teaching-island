# AI 魔法學習島

> 念對咒語，讓 AI 為你所用。

一座可以在瀏覽器裡探索的 3D 互動學習群島。十一座課程島從「AI 怎麼運作」一路走到「Agent＋Harness 工程」，每座島都有教材、可複製的提示詞（或程式碼）、延伸資源、四題隨堂測驗和兩位會講解觀念的島民。中央的 AI 魔法學習島是總複習島，可以做跨課測驗，十一課都讀完、且各課測驗達 75% 後可以製作紀念證書。

**免費優先**：只用 Google 的免費工具（Gemini、Google AI Studio、Gemini Notebook），需要付費才有的功能改用 OpenCode 的免費模型示範，學員不用綁信用卡就能跟著做。

講師：王子齊（Jac）

## 課程地圖

| 站 | 島嶼 | 海域 | 主題 |
| --- | --- | --- | --- |
| 1 | 水晶球觀測所 | Gemini 免費入門 | 認識 AI 怎麼運作：文字接龍、Token 與上下文、幻覺 |
| 2 | 咒語入門島 | Gemini 免費入門 | 用 Gemini 免費版學會好好提問，用 Gemini Notebook 根據資料提問 |
| 3 | 符文研究所 | Gemini 免費入門 | 提示詞工程：範例、拆解、自我檢查與評估 |
| 4 | 魔法書之島 | Gemini 免費入門 | System Prompt：替 AI 設定固定的身分與規則 |
| 5 | 魔杖工坊 | OpenCode 實作 | 安裝 OpenCode，免帳號使用免費 AI 模型 |
| 6 | 契約之島 | OpenCode 實作 | AGENTS.md 與自訂指令：讓 AI 記住你的做事方法 |
| 7 | 星門渡口 | API 串接 | 在 Google AI Studio 申請 API Key，用 JavaScript 第一次呼叫 Gemini 3.5 Flash-Lite |
| 8 | 鍊金工房 | API 串接 | 多輪對話、結構化 JSON 輸出，把金鑰收進後端正式上線 |
| 9 | 使魔召喚島 | OpenCode 實作 | 打造專屬 Agent：System Prompt＋模型＋權限 |
| 10 | 法器寶庫島 | 進階打造 | Skills 技能包與 MCP 外部工具 |
| 11 | 魔導高塔 | 進階打造 | Agent＝模型＋Harness：設計讓 AI 穩定做對事的整套系統 |

中央的 AI 魔法學習島另有：學習路線、安全使用 AI 的七條守則、AI 工具的六種形態、畢業專題（做一個專屬 AI 小幫手）與名詞小辭典。

## 網站功能

- **3D 群島**：用 three.js 繪製，可以拖曳、縮放，點島嶼打開課程。不支援 WebGL 時會自動改成文字清單。
- **島主**：中央島是咒咒，其他 11 座課程島各有自己的島主（名字與頭銜寫在各島「資料設定」的 `host` 欄位）。點島主就能提問，會依關鍵字帶你到對應的課程島。
- **島民**：每座島有兩位島民，各自負責講解一個重點觀念；每個人的髮型、帽子、服裝和手持道具都呼應他的概念（外觀設定在 `js/characters.mjs`）。
- **講師**：中央島塔前站著講師王子齊（Jac），點他會打開講師介紹。
- **魔法杖尋寶**：中央島與每座課程島各藏 1 把、橋上 2 把，共 14 把。集滿成為「榮譽島民」：進度頁出現徽章、紀念證書加上榮譽島民印記，中央島也會出現以學員姓名命名的分身。
- **學習進度**：記錄已讀課程與測驗分數，存在瀏覽器裡（localStorage）。可以匯出成 JSON 檔，換電腦或換瀏覽器後再匯入。
- **總複習與證書**：中央島從各課題庫抽題做跨課測驗。十一課皆已讀、各課測驗達 75% 後，可以下載 PNG 紀念證書。
- **顯示設定**：晨光／海霧／夜海三種底色、白天／黃昏／夜晚光線、減少動態、背景音樂。
- **完整文字教材**：[`content.html`](content.html) 是所有教材的純文字版，方便列印、搜尋或用螢幕閱讀器閱讀。

## 在自己電腦上執行

網站是純靜態檔案，不需要安裝套件或建置，但因為會用 `fetch` 讀取 Markdown 教材，**必須透過本機伺服器開啟**，直接雙擊 `index.html` 會讀不到教材。

在專案資料夾執行下面任一行，再用瀏覽器打開 <http://localhost:8000>：

```bash
python3 -m http.server 8000
```

```bash
npx serve -l 8000
```

## 修改教材

所有教材都放在 `islands/` 底下的 Markdown 檔，一座島一個資料夾：

```
islands/
├── manifest.json            # 島嶼清單與順序
├── AI魔法學習島/教材.md      # 中央島：網站設定、講師介紹、學習路線
└── 咒語入門島/教材.md        # 各課程島（其餘八座同樣格式）
```

每份課程教材由固定的 `##` 分區組成，**分區名稱不要改**：

| 分區 | 格式 | 內容 |
| --- | --- | --- |
| 資料設定 | `json` 區塊 | 順序、識別碼、名稱、海域、簡介、學習目標、比較表 |
| 教材內容 | `###` 標題＋文字 | 課程正文，可自由增刪段落 |
| 教材提示詞 | `###` 標題＋程式碼區塊 | `text` 區塊顯示「複製提示詞」按鈕；程式碼範例改用 `html`、`js`、`json` 或 `bash`，按鈕會變成「複製程式碼」 |
| 延伸資源 | `json` 區塊 | 外部連結，必須是完整的 http(s) 網址 |
| 隨堂測驗 | `json` 區塊 | 剛好四題，題目識別碼不可重複 |
| 島民概念 | `json` 區塊 | 兩位島民，`topic` 是對應「教材內容」第幾段（從 0 開始） |

改完 Markdown 後，執行下面這行重新產生 `data/content.json` 和 `content.html`（需要 Node.js）：

```bash
node scripts/sync-materials.mjs
```

格式有錯時，這個指令和網頁都會顯示是哪個檔案、哪個分區出了問題。

這個指令也會依目前的程式與教材內容產生版本號，寫進 `index.html`。瀏覽器看到新版本號就會重新下載程式，不會出現「舊程式＋新教材」的錯誤。**改了任何 JS、CSS 或教材後，推上去前都要執行一次。**

### 新增或刪除整座島

島嶼數量寫死在程式和 3D 場景裡，除了新增教材檔和更新 `islands/manifest.json`，還要一起修改：

- `js/materials.mjs` 的 `COURSE_COUNT`
- `js/world.mjs` 的島嶼座標與橋梁樣式
- `js/scene.mjs` 的島嶼配色、標籤高度、橋梁連接與地標造型
- `js/host.mjs` 咒咒的關鍵字導覽
- `index.html`、`js/app.mjs`、`js/certificate.mjs` 裡寫著課程數量的文字

## 專案結構

```
index.html              # 主頁
content.html            # 自動產生的完整文字教材
styles.css
islands/                # 教材來源（Markdown）
data/content.json       # 自動產生的教材資料
js/
├── app.mjs             # 主程式：清單、課程面板、測驗、進度
├── materials.mjs       # Markdown 教材解析與格式檢查
├── scene.mjs           # 3D 場景與各島地標
├── world.mjs           # 島嶼位置與橋梁
├── host.mjs            # 島主咒咒的問答導覽
├── residents.mjs       # 島民
├── certificate.mjs     # 紀念證書
├── progress-transfer.mjs  # 進度匯出／匯入
└── ...                 # 海面、橋梁、室內、音樂、節慶裝飾等
scripts/sync-materials.mjs  # 教材同步指令
vendor/                 # three.js（MIT 授權，見 THREE-LICENSE.txt）
assets/                 # 吉祥物、講師照片、背景音樂
```

## 部署

專案根目錄已經放了 `.nojekyll`，可以直接用 GitHub Pages 發佈：到 repo 的 **Settings → Pages**，Source 選 `Deploy from a branch`，分支選 `main`、資料夾選 `/ (root)`。其他任何能放靜態檔案的主機也都可以。

## 注意事項

教材依 Google Gemini 與 OpenCode 官方文件整理。AI 工具更新很快，免費模型名單、使用額度和操作畫面都可能變動，請以官方頁面為準。測驗為自編練習題。
