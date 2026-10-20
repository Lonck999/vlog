#!/usr/bin/env node
/**
 * 把 Obsidian vault `05-心得/` 裡標了 `publish: true` 的心得，依 `category` 同步進
 * 「學習文章」對應的分類：`docs/pages/studyNotes/contents/<分類>/posts/<slug>.md`，
 * 並改寫 `docs/pages/studyNotes/index.md` 裡該分類的文章清單區塊。
 *
 * 🔴 2026-10-20 改版（Lonck 決定拿掉導覽列「文章」、文章依分類放）：
 *    原本全部寫進 `docs/pages/posts/`。現在每篇必須標 `category:`（八區之一），
 *    沒標或標錯 ⇒ 直接失敗（放錯區或不知道放哪，都比失敗糟）。
 *
 * 🔴 預設不發布（這條不要改成反過來）
 * 🔴 只讀 `05-心得/`。`04-Resources/` 是 AI 代寫、`RawSources/` 是別人的內容，兩者都不發。
 *
 * 用法：
 *   node scripts/sync-posts.mjs            # 實際寫入
 *   node scripts/sync-posts.mjs --dry-run  # 只看會同步哪些
 *
 * 環境變數（測試用）：BLOG_SOURCE_DIR 來源、VLOG_DOCS_DIR 輸出的 docs 根目錄
 *
 * ── slug 為什麼必須有 ─────────────────────────────────────────
 * 不是因為會壞（VitePress 吃得下中文檔名），是文章網址要能貼給別人。
 * ⚠️ 「中文檔名會讓 slug 被吃掉」是 Nuxt Content 專屬的問題，不要把那個理由搬過來。
 */
import { readdir, readFile, writeFile, mkdir, rm, rmdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'

const VAULT_DIR = process.env.BLOG_SOURCE_DIR || join(homedir(), 'Obsidian', '05-心得')
const REPO_ROOT = resolve(fileURLToPath(new URL('../', import.meta.url)))
const DOCS = process.env.VLOG_DOCS_DIR || join(REPO_ROOT, 'docs')
const CONTENTS = join(DOCS, 'pages', 'studyNotes', 'contents')
const INDEX = join(DOCS, 'pages', 'studyNotes', 'index.md')
const DRY = process.argv.includes('--dry-run')

// 🔴 八區與資料夾對應（Lonck 2026-10-20 定的順序）。frontmatter 寫左邊的名字。
const CATEGORIES = [
  ['AI', 'ai'], ['Python', 'python'], ['JavaScript', 'javaScript'], ['TypeScript', 'typeScript'],
  ['Vue', 'vue'], ['股票', 'stock'], ['SCSS', 'SCSS'], ['TailwindCSS', 'tailwindCSS'],
]
const DIR_OF = Object.fromEntries(CATEGORIES)
const EMPTY_TEXT = '⬜ 還沒寫'

// 🔴 來源目錄不存在就直接失敗（「同步完成，0 篇」跟「路徑打錯」長得一模一樣）
if (!existsSync(VAULT_DIR)) { console.error(`✖ 來源目錄不存在：${VAULT_DIR}`); process.exit(1) }
if (!existsSync(INDEX)) { console.error(`✖ 找不到學習文章頁：${INDEX}`); process.exit(1) }

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return { data: {}, body: raw }
  const data = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (!kv) continue
    let val = kv[2].trim()
    if (val === 'true') val = true
    else if (val === 'false') val = false
    else if (/^\[.*\]$/.test(val)) val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    else val = val.replace(/^["']|["']$/g, '')
    data[kv[1]] = val
  }
  return { data, body: raw.slice(m[0].length) }
}
const yamlEscape = s => `"${String(s).replace(/"/g, '\\"')}"`
const stripWikilinks = body => body
  .replace(/!\[\[([^\]]+)\]\]/g, '')
  .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
  .replace(/\[\[([^\]]+)\]\]/g, '$1')
function fail(msg) { console.error(`✖ ${msg}`); process.exit(1) }

const entries = (await readdir(VAULT_DIR)).filter(f => f.endsWith('.md'))
const published = []
let skipped = 0
for (const file of entries) {
  const { data, body } = parseFrontmatter(await readFile(join(VAULT_DIR, file), 'utf8'))
  if (data.publish !== true) { skipped++; continue }
  if (!data.title || !data.date) fail(`${file}：標了 publish: true 但缺 title 或 date`)
  const slug = typeof data.slug === 'string' ? data.slug.trim() : ''
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))
    fail(`${file}：標了 publish: true 就必須有 slug（小寫英數與連字號），目前是 ${JSON.stringify(data.slug ?? null)}\n   例：slug: when-to-let-ai-do-it`)
  const dir = DIR_OF[data.category]
  if (!dir)
    fail(`${file}：標了 publish: true 就必須有 category，目前是 ${JSON.stringify(data.category ?? null)}\n   可用：${CATEGORIES.map(c => c[0]).join('／')}`)
  const fm = ['---', `title: ${yamlEscape(data.title)}`, `date: ${yamlEscape(data.date)}`,
    data.description ? `description: ${yamlEscape(data.description)}` : null,
    `tags: [${(Array.isArray(data.tags) ? data.tags : []).map(yamlEscape).join(', ')}]`,
    'generated: true', '---', '', `# ${data.title}`, ''].filter(v => v !== null).join('\n')
  published.push({ slug, dir, category: data.category, title: data.title, date: String(data.date), source: file,
    content: fm + stripWikilinks(body).trimStart() })
}

// 🔴 slug 全站唯一（不同分類同 slug 雖然不會覆蓋，但網址只差一段很容易貼錯）
const seen = new Map()
for (const p of published) {
  if (seen.has(p.slug)) fail(`slug 撞名「${p.slug}」：${seen.get(p.slug)} 與 ${p.source}`)
  seen.set(p.slug, p.source)
}
published.sort((a, b) => b.date.localeCompare(a.date))

console.log(`來源：${VAULT_DIR}`)
console.log(`掃到 ${entries.length} 篇，其中 publish: true 共 ${published.length} 篇`)
for (const p of published) console.log(`  ✓ ${p.source} → ${p.category}：studyNotes/contents/${p.dir}/posts/${p.slug}.md`)
if (skipped) console.log(`  （未發布 ${skipped} 篇）`)

// ── 改寫學習文章頁的區塊（先算好，dry-run 也要驗標記存在）──────────
let index = await readFile(INDEX, 'utf8')
for (const [name, dir] of CATEGORIES) {
  const re = new RegExp(`(<!-- posts:${dir} BEGIN -->)[\\s\\S]*?(<!-- posts:${dir} END -->)`)
  if (!re.test(index)) fail(`學習文章頁少了「${name}」的文章區塊標記 <!-- posts:${dir} BEGIN/END -->`)
  const mine = published.filter(p => p.dir === dir)
  // 0 篇時：該區沒有其他內容 ⇒「還沒寫」；有既有筆記 ⇒ 空著
  const hasNotes = existsSync(join(CONTENTS, dir)) &&
    (await readdir(join(CONTENTS, dir))).some(f => f !== 'posts')
  const inner = mine.length
    ? mine.map(p => `- [${p.title}](/pages/studyNotes/contents/${dir}/posts/${p.slug}.md) <Badge type="info" text="${p.date}" />`).join('\n')
    : (hasNotes ? '' : EMPTY_TEXT)
  index = index.replace(re, `$1\n${inner}\n$2`)
}

if (DRY) { console.log('\n--dry-run：沒有寫入任何檔案'); process.exit(0) }

// ── 重建每個分類的 posts/ ───────────────────────────────────────
// 🔴 rm 的「刪對」與「刪錯」輸出完全一樣 ⇒ 先全部檢查完，有任何手寫檔就整批不刪。
const toDelete = []
for (const [, dir] of CATEGORIES) {
  const out = join(CONTENTS, dir, 'posts')
  if (!existsSync(out)) continue
  for (const f of await readdir(out)) {
    const p = join(out, f)
    if ((await stat(p)).isDirectory()) fail(`${out} 裡有子目錄 ${f} —— 這不是同步產生的，停手不刪`)
    if (!f.endsWith('.md')) fail(`${out} 裡有非 .md 檔 ${f} —— 停手不刪`)
    if (!(await readFile(p, 'utf8')).includes('generated: true'))
      fail(`${dir}/posts/${f} 沒有 generated: true 標記 —— 這像是手寫的檔案，停手不刪。\n   要它消失請從 vault 移除 publish: true，或自己手動刪。`)
    toDelete.push(p)
  }
}
for (const p of toDelete) await rm(p)   // 明確列舉，不用萬用字元
for (const [, dir] of CATEGORIES) {
  const out = join(CONTENTS, dir, 'posts')
  const mine = published.filter(p => p.dir === dir)
  if (mine.length) {
    await mkdir(out, { recursive: true })
    for (const p of mine) await writeFile(join(out, `${p.slug}.md`), p.content, 'utf8')
  } else if (existsSync(out) && (await readdir(out)).length === 0) {
    await rmdir(out)   // 0 篇就不留空目錄
  }
}
await writeFile(INDEX, index, 'utf8')
console.log(`\n✓ 已寫入 ${published.length} 篇，並更新學習文章頁的 ${CATEGORIES.length} 個分類區塊`)
