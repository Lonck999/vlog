#!/usr/bin/env node
/**
 * sync-posts.mjs 的回歸測試（2026-10-20 改版：文章依 category 放進學習文章各區）。
 *
 * 🔴 這支在防什麼
 *    sync-posts 會**刪掉各分類 posts/ 再重建**（vault 取消 publish 時站上那篇也要消失），
 *    同一個動作弄錯的代價是**刪掉手寫的檔案，而且沒有任何輸出**（AGENTS.md §5）。
 *    ⇒ 最重要的是「手寫檔案不可被刪」：一個「什麼都刪」的版本會讓其他組全綠。
 *
 * 🔴 全部在暫存的 docs 副本上跑（VLOG_DOCS_DIR），不碰真的站。
 *    舊版直接寫 repo 的 docs/pages/posts/ 再還原 —— 測到一半被砍就會留下垃圾。
 *
 * 用法：node scripts/test-sync-posts.mjs
 */
import { mkdtemp, writeFile, readFile, readdir, rm, mkdir, cp } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

const run_ = promisify(execFile)
const REPO = resolve(fileURLToPath(new URL('../', import.meta.url)))
const SCRIPT = join(REPO, 'scripts', 'sync-posts.mjs')

const results = []
function ck(name, ok, detail = '') {
  results.push({ ok, name, detail })
  console.log(`  ${ok ? '✅' : '❌ FAIL'}  ${name}`)
  if (!ok && detail) console.log(`        ${detail}`)
}

const TMP = await mkdtemp(join(tmpdir(), 'syncposts-'))
const SRC = join(TMP, 'vault'); await mkdir(SRC)
const DOCS = join(TMP, 'docs')
await mkdir(join(DOCS, 'pages', 'studyNotes'), { recursive: true })
await cp(join(REPO, 'docs', 'pages', 'studyNotes'), join(DOCS, 'pages', 'studyNotes'), { recursive: true })
const INDEX = join(DOCS, 'pages', 'studyNotes', 'index.md')
const C = join(DOCS, 'pages', 'studyNotes', 'contents')

async function sync(src, ...args) {
  try {
    const { stdout, stderr } = await run_('node', [SCRIPT, ...args], {
      env: { ...process.env, BLOG_SOURCE_DIR: src, VLOG_DOCS_DIR: DOCS } })
    return { code: 0, out: stdout + stderr }
  } catch (e) { return { code: e.code ?? 1, out: (e.stdout ?? '') + (e.stderr ?? '') } }
}
const post = (name, fm, body = '內文段落。\n') => writeFile(join(SRC, name), `---\n${fm}\n---\n\n${body}`, 'utf8')
const ls = async (dir) => existsSync(join(C, dir, 'posts')) ? (await readdir(join(C, dir, 'posts'))).sort() : []
const section = (idx, dir) => idx.match(new RegExp(`<!-- posts:${dir} BEGIN -->([\\s\\S]*?)<!-- posts:${dir} END -->`))?.[1] ?? null

try {
  console.log('\n【①】正常：有 slug／title／date／category')
  await post('好文.md', 'publish: true\ntitle: 測試文章\ndate: 2026-09-22\nslug: hello-world\ncategory: Vue\ntags: [a, b]')
  let r = await sync(SRC, '--dry-run')
  ck('① rc=0', r.code === 0, r.out.slice(-200))
  ck('① 點名了那篇與分類', r.out.includes('hello-world') && r.out.includes('Vue'))
  ck('① 🔴 --dry-run 不可寫檔', (await ls('vue')).length === 0)

  console.log('\n【②】缺 slug／title／date → 必須失敗')
  await post('沒slug.md', 'publish: true\ntitle: 沒有 slug\ndate: 2026-09-22\ncategory: Vue')
  r = await sync(SRC, '--dry-run'); ck('② 缺 slug rc=1', r.code === 1); ck('② 訊息說得出怎麼修', r.out.includes('slug:'))
  await rm(join(SRC, '沒slug.md'))
  await post('沒title.md', 'publish: true\ndate: 2026-09-22\nslug: no-title\ncategory: Vue')
  r = await sync(SRC, '--dry-run'); ck('② 缺 title rc=1', r.code === 1); await rm(join(SRC, '沒title.md'))

  console.log('\n【③】🔴 category 缺／錯 → 必須失敗（不知道放哪比失敗糟）')
  await post('沒分類.md', 'publish: true\ntitle: 沒分類\ndate: 2026-09-22\nslug: no-cat')
  r = await sync(SRC, '--dry-run'); ck('③ 缺 category rc=1', r.code === 1)
  ck('③ 訊息列出可用分類', r.out.includes('TailwindCSS') && r.out.includes('股票'), r.out.slice(0, 120))
  await rm(join(SRC, '沒分類.md'))
  await post('錯分類.md', 'publish: true\ntitle: 錯分類\ndate: 2026-09-22\nslug: bad-cat\ncategory: vue')
  r = await sync(SRC, '--dry-run'); ck('③ 大小寫錯（vue）也擋', r.code === 1); await rm(join(SRC, '錯分類.md'))

  console.log('\n【④】slug 撞名（不同分類也擋）')
  await post('撞名A.md', 'publish: true\ntitle: A\ndate: 2026-09-21\nslug: hello-world\ncategory: AI')
  r = await sync(SRC, '--dry-run'); ck('④ rc=1', r.code === 1); ck('④ 兩個來源都點名', r.out.includes('好文.md') && r.out.includes('撞名A.md'))
  await rm(join(SRC, '撞名A.md'))

  console.log('\n【⑤】來源目錄不存在 → 必須失敗')
  r = await sync(join(TMP, '絕對不存在'), '--dry-run'); ck('⑤ rc=1', r.code === 1); ck('⑤ 明講來源不存在', r.out.includes('來源目錄不存在'))

  console.log('\n【⑥】真的寫檔：依分類放、清單依日期新到舊')
  await post('乙.md', 'publish: true\ntitle: 第二篇\ndate: 2026-09-23\nslug: second-post\ncategory: Vue')
  await post('丙.md', 'publish: true\ntitle: AI 第一篇\ndate: 2026-09-20\nslug: ai-first\ncategory: AI')
  r = await sync(SRC); ck('⑥ rc=0', r.code === 0, r.out.slice(-200))
  ck('⑥ 🔴 Vue 兩篇真的產出在 vue/posts/', JSON.stringify(await ls('vue')) === '["hello-world.md","second-post.md"]', (await ls('vue')).join(','))
  ck('⑥ 🔴 AI 那篇在 ai/posts/（不是 vue）', JSON.stringify(await ls('ai')) === '["ai-first.md"]')
  let idx = await readFile(INDEX, 'utf8')
  const vue = section(idx, 'vue')
  ck('⑥ 學習文章頁 Vue 區列出兩篇且新到舊', vue && vue.indexOf('second-post') >= 0 && vue.indexOf('second-post') < vue.indexOf('hello-world'), vue)
  ck('⑥ 🔴 AI 區「還沒寫」換成文章連結', !section(idx, 'ai').includes('還沒寫') && section(idx, 'ai').includes('ai-first'))
  ck('⑥ 🔴 沒文章的 Python 區仍是「還沒寫」', section(idx, 'python').includes('還沒寫'))
  ck('⑥ 🔴 有既有筆記的 JavaScript 區不可被寫「還沒寫」', !section(idx, 'javaScript').includes('還沒寫'))
  const one = await readFile(join(C, 'vue', 'posts', 'second-post.md'), 'utf8')
  ck('⑥ 產出含 generated 標記與 H1', one.includes('generated: true') && one.includes('# 第二篇'))
  const before = idx; r = await sync(SRC)
  ck('⑥ 重跑一次結果相同（idempotent）', (await readFile(INDEX, 'utf8')) === before)

  console.log('\n【⑦】取消發布 → 那篇消失、區塊回到「還沒寫」、空目錄拿掉')
  await rm(join(SRC, '丙.md')); r = await sync(SRC)
  ck('⑦ 🔴 ai/posts/ 整個目錄拿掉', !existsSync(join(C, 'ai', 'posts')))
  idx = await readFile(INDEX, 'utf8')
  ck('⑦ AI 區回到「還沒寫」', section(idx, 'ai').includes('還沒寫'))
  ck('⑦ Vue 兩篇還在', (await ls('vue')).length === 2)

  console.log('\n【⑧】🔴 手寫檔案不可被刪（最重要的一組）')
  const hand = join(C, 'vue', 'posts', '我手寫的.md')
  await writeFile(hand, '---\ntitle: 手寫\n---\n\n這是我自己寫的。\n', 'utf8')
  r = await sync(SRC)
  ck('⑧ rc=1（停手）', r.code === 1); ck('⑧ 🔴 手寫檔還在', existsSync(hand))
  ck('⑧ 🔴 同批其他檔也沒被先刪掉（整批不刪）', (await ls('vue')).length === 3, (await ls('vue')).join(','))
  ck('⑧ 訊息說得出為什麼', r.out.includes('generated: true'))
  await rm(hand)

  console.log('\n【⑨】學習文章頁少了區塊標記 → 失敗（不可靜默略過那一區）')
  const saved = await readFile(INDEX, 'utf8')
  await writeFile(INDEX, saved.replace('<!-- posts:stock END -->', ''), 'utf8')
  r = await sync(SRC, '--dry-run'); ck('⑨ rc=1', r.code === 1); ck('⑨ 點名是哪一區', r.out.includes('股票'), r.out.slice(0, 120))
  await writeFile(INDEX, saved, 'utf8')

  console.log('\n【⑩】真實 vault ＋ 真實學習文章頁（不寫檔）')
  try {
    const { stdout } = await run_('node', [SCRIPT, '--dry-run'], { env: { ...process.env, BLOG_SOURCE_DIR: '', VLOG_DOCS_DIR: '' } })
    ck('⑩ rc=0 且掃得到文章', /掃到 \d+ 篇/.test(stdout), stdout.slice(0, 80))
  } catch (e) { ck('⑩ rc=0', false, (e.stdout ?? '') + (e.stderr ?? '')) }
} finally {
  await rm(TMP, { recursive: true, force: true })
}

const passed = results.filter(r => r.ok).length
console.log(`\n${'='.repeat(60)}\n${passed}/${results.length} 通過`)
if (passed !== results.length) { for (const r of results) if (!r.ok) console.log(`  ❌ ${r.name}  ${r.detail}`); process.exit(1) }
