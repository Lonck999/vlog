#!/usr/bin/env node
/**
 * 把 Obsidian vault `05-心得/` 裡標了 `publish: true` 的心得同步進
 * `docs/pages/posts/`，成為 vlog（VitePress）站上的文章。
 *
 * 🔴 預設不發布（這條不要改成反過來）
 * 🔴 只讀 `05-心得/`。`04-Resources/` 是 AI 代寫、`RawSources/` 是別人的內容，兩者都不發。
 *
 * 用法：
 *   node scripts/sync-posts.mjs            # 實際寫入
 *   node scripts/sync-posts.mjs --dry-run  # 只看會同步哪些
 *
 * ── 從 blog（Nuxt Content）移植的注意事項 ──────────────────────
 *
 * ⚠️ blog 版本有一條紅線寫著「中文檔名會讓 Nuxt Content 把 slug 整段吃掉，
 *    多篇互相覆蓋且建置不報錯」。**那是 Nuxt Content 專屬的問題，
 *    VitePress 沒有** —— vlog 站上有 233 個中文檔名的頁面正常運作
 *    （2026-09-22 線上實測 `/pages/life/task/2025/5月/2025-05-07-週三.html` 回 200）。
 *
 * 🔴 所以「必須有 slug」這條**留著但理由換掉**：
 *    不是因為會壞，是因為文章網址要能貼給別人、要能被搜尋引擎好好收錄。
 *    ⚠️ 照抄舊理由的話，那句註解會變成一句假話，
 *       而未來讀到的人會拿它當事實（同 SOUL.md「拿推測代替查得到的事實」）。
 */
import { readdir, readFile, writeFile, mkdir, rm, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { homedir } from 'node:os'
import { fileURLToPath } from 'node:url'

const VAULT_DIR = process.env.BLOG_SOURCE_DIR
  || join(homedir(), 'Obsidian', '05-心得')

const REPO_ROOT = resolve(fileURLToPath(new URL('../', import.meta.url)))
const OUT_DIR = join(REPO_ROOT, 'docs', 'pages', 'posts')
const DRY = process.argv.includes('--dry-run')

// 🔴 來源目錄不存在就直接失敗，不要靜默產生 0 篇
// （「同步完成，0 篇」跟「路徑打錯」長得一模一樣）
if (!existsSync(VAULT_DIR)) {
  console.error(`✖ 來源目錄不存在：${VAULT_DIR}`)
  process.exit(1)
}

/** 極簡 frontmatter 解析：只認 key: value 與 [a, b] 陣列，夠這個用途 */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return { data: {}, body: raw }
  const data = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (!kv) continue
    const key = kv[1]
    let val = kv[2].trim()
    if (val === 'true') val = true
    else if (val === 'false') val = false
    else if (/^\[.*\]$/.test(val)) {
      val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    } else {
      val = val.replace(/^["']|["']$/g, '')
    }
    data[key] = val
  }
  return { data, body: raw.slice(m[0].length) }
}

function yamlEscape(s) {
  return `"${String(s).replace(/"/g, '\\"')}"`
}

/**
 * Obsidian wikilink → 純文字。
 * 連結目標多半沒發布，留著會變成死連結。
 */
function stripWikilinks(body) {
  return body
    .replace(/!\[\[([^\]]+)\]\]/g, '')                 // 內嵌（圖／檔）先拿掉
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')     // [[目標|顯示]] → 顯示
    .replace(/\[\[([^\]]+)\]\]/g, '$1')                // [[目標]] → 目標
}

/**
 * slug（＝網址最後一段）一律取 frontmatter 的 `slug:` 欄位。
 *
 * ⚠️ 理由見檔頭：不是「不給會壞」，是「網址要能貼給別人」。
 *    VitePress 吃得下中文檔名，但 `/posts/什麼時候該讓AI自動做.html`
 *    複製貼上時會變成一長串 percent-encoding。
 */
function requireSlug(data, file) {
  const slug = typeof data.slug === 'string' ? data.slug.trim() : ''
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    console.error(
      `✖ ${file}：標了 publish: true 就必須有 slug（小寫英數與連字號），`
      + `目前是 ${JSON.stringify(data.slug ?? null)}\n`
      + `   例：slug: when-to-let-ai-do-it`,
    )
    process.exit(1)
  }
  return slug
}

const entries = (await readdir(VAULT_DIR)).filter(f => f.endsWith('.md'))
const published = []
const skipped = []

for (const file of entries) {
  const raw = await readFile(join(VAULT_DIR, file), 'utf8')
  const { data, body } = parseFrontmatter(raw)
  if (data.publish !== true) {
    skipped.push(file)
    continue
  }
  if (!data.title || !data.date) {
    console.error(`✖ ${file}：標了 publish: true 但缺 title 或 date`)
    process.exit(1)
  }

  const fm = [
    '---',
    `title: ${yamlEscape(data.title)}`,
    `date: ${yamlEscape(data.date)}`,
    data.description ? `description: ${yamlEscape(data.description)}` : null,
    `tags: [${(Array.isArray(data.tags) ? data.tags : []).map(yamlEscape).join(', ')}]`,
    // 🔴 給 sidebar 產生器用的標記。沒有它，重建目錄時分不出
    //    「這個檔是同步來的」與「有人手寫在這裡的」。
    'generated: true',
    '---',
    '',
    `# ${data.title}`,
    '',
  ].filter(v => v !== null).join('\n')

  published.push({
    slug: requireSlug(data, file),
    title: data.title,
    date: String(data.date),
    source: file,
    content: fm + stripWikilinks(body).trimStart(),
  })
}

// 🔴 slug 撞名要當場擋 —— 兩篇同 slug 會後者覆蓋前者，**而且不會報錯**
const seen = new Map()
for (const p of published) {
  if (seen.has(p.slug)) {
    console.error(`✖ slug 撞名「${p.slug}」：${seen.get(p.slug)} 與 ${p.source}`)
    process.exit(1)
  }
  seen.set(p.slug, p.source)
}

published.sort((a, b) => b.date.localeCompare(a.date))

console.log(`來源：${VAULT_DIR}`)
console.log(`輸出：${OUT_DIR}`)
console.log(`掃到 ${entries.length} 篇，其中 publish: true 共 ${published.length} 篇`)
for (const p of published) console.log(`  ✓ ${p.source} → pages/posts/${p.slug}.md`)
if (skipped.length) console.log(`  （未發布 ${skipped.length} 篇）`)

if (DRY) {
  console.log('\n--dry-run：沒有寫入任何檔案')
  process.exit(0)
}

// ── 重建輸出目錄 ────────────────────────────────────────────────
//
// 🔴 為什麼要重建：vault 把 `publish: true` 拿掉時，站上那篇也要消失。
//    只寫不刪的話，取消發布永遠不會生效。
//
// 🔴 但 rm -rf 的「刪對」與「刪錯」輸出完全一樣（都是沒有輸出），
//    所以刪之前先確認那個目錄**只含我們產生的檔案**。
//    AGENTS.md §5：刪除一律明確列舉，不用萬用字元。
if (existsSync(OUT_DIR)) {
  const olds = await readdir(OUT_DIR)
  for (const f of olds) {
    const p = join(OUT_DIR, f)
    if ((await stat(p)).isDirectory()) {
      console.error(`✖ ${OUT_DIR} 裡有子目錄 ${f} —— 這不是同步產生的，停手不刪`)
      process.exit(1)
    }
    if (!f.endsWith('.md')) {
      console.error(`✖ ${OUT_DIR} 裡有非 .md 檔 ${f} —— 停手不刪`)
      process.exit(1)
    }
    const head = await readFile(p, 'utf8')
    if (!head.includes('generated: true')) {
      console.error(
        `✖ ${f} 沒有 generated: true 標記 —— 這像是手寫的檔案，停手不刪。\n`
        + `   要它消失請從 vault 移除 publish: true，或自己手動刪。`,
      )
      process.exit(1)
    }
  }
  // 確認過才逐一刪除（明確列舉，不用萬用字元）
  for (const f of olds) await rm(join(OUT_DIR, f))
}

await mkdir(OUT_DIR, { recursive: true })
for (const p of published) {
  await writeFile(join(OUT_DIR, `${p.slug}.md`), p.content, 'utf8')
}

// ── 產生文章索引頁 ──────────────────────────────────────────────
// 🔴 沒有索引頁的話，文章只能靠直接打網址進去 —— 等於沒發布。
const indexLines = [
  '---',
  'title: 文章',
  'generated: true',
  '---',
  '',
  '# 文章',
  '',
]
if (published.length === 0) {
  indexLines.push('（還沒有發布的文章）')
} else {
  for (const p of published) {
    indexLines.push(`- [${p.title}](./${p.slug}.md) <Badge type="info" text="${p.date}" />`)
  }
}
await writeFile(join(OUT_DIR, 'index.md'), indexLines.join('\n') + '\n', 'utf8')

console.log(`\n✓ 已寫入 ${published.length} 篇 ＋ 索引頁到 docs/pages/posts/`)
