#!/usr/bin/env node
/**
 * sync-posts.mjs 的回歸測試。
 *
 * 🔴 這支在防什麼
 *    sync-posts 會**刪除整個輸出目錄再重建** —— 那是它正確運作的一部分
 *    （vault 取消 publish 時，站上那篇也要消失）。
 *    但同一個動作弄錯的代價是**刪掉手寫的檔案，而且沒有任何輸出**
 *    （AGENTS.md §5：rm 的「刪對」與「刪錯」輸出完全一樣）。
 *
 * 🔴 所以最重要的是第 ⑧ 組「手寫檔案不可被刪」：
 *    一個「什麼都刪」的版本會讓 ①～⑦ 全綠。
 *
 * 用法：node scripts/test-sync-posts.mjs
 */
import { mkdtemp, writeFile, readFile, readdir, rm, mkdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

const run_ = promisify(execFile)
const REPO = resolve(fileURLToPath(new URL('../', import.meta.url)))
const SCRIPT = join(REPO, 'scripts', 'sync-posts.mjs')
const OUT = join(REPO, 'docs', 'pages', 'posts')

const results = []
function ck(name, ok, detail = '') {
  results.push({ ok, name, detail })
  console.log(`  ${ok ? '✅' : '❌ FAIL'}  ${name}`)
  if (!ok && detail) console.log(`        ${detail}`)
}

async function sync(srcDir, ...args) {
  try {
    const { stdout, stderr } = await run_('node', [SCRIPT, ...args], {
      env: { ...process.env, BLOG_SOURCE_DIR: srcDir },
    })
    return { code: 0, out: stdout + stderr }
  } catch (e) {
    return { code: e.code ?? 1, out: (e.stdout ?? '') + (e.stderr ?? '') }
  }
}

async function post(dir, name, fm, body = '內文段落。\n') {
  await writeFile(join(dir, name), `---\n${fm}\n---\n\n${body}`, 'utf8')
}

async function ls() {
  if (!existsSync(OUT)) return []
  return (await readdir(OUT)).sort()
}

// 🔴 輸出目錄現在可能有真實產出 —— 測試前先保存，結束一定還原
const HAD_OUT = existsSync(OUT)
const SAVED = HAD_OUT
  ? Object.fromEntries(await Promise.all(
      (await readdir(OUT)).map(async f => [f, await readFile(join(OUT, f), 'utf8')])))
  : null

const SRC = await mkdtemp(join(tmpdir(), 'syncposts-'))

try {
  console.log('\n【①】正常：有 slug / title / date')
  await post(SRC, '好文.md',
    'publish: true\ntitle: 測試文章\ndate: 2026-09-22\nslug: hello-world\ntags: [a, b]')
  let r = await sync(SRC, '--dry-run')
  ck('① rc=0', r.code === 0, `rc=${r.code}`)
  ck('① 點名了那篇', r.out.includes('hello-world'))
  ck('① 🔴 --dry-run 不可寫檔', (await ls()).length === (HAD_OUT ? Object.keys(SAVED).length : 0))

  console.log('\n【②】publish: true 但沒 slug → 必須失敗')
  await post(SRC, '沒slug.md', 'publish: true\ntitle: 沒有 slug\ndate: 2026-09-22')
  r = await sync(SRC, '--dry-run')
  ck('② rc=1', r.code === 1, `rc=${r.code}`)
  ck('② 訊息說得出怎麼修', r.out.includes('slug:'), r.out.slice(0, 80))
  await rm(join(SRC, '沒slug.md'))

  console.log('\n【③】缺 title / date → 必須失敗')
  await post(SRC, '沒title.md', 'publish: true\ndate: 2026-09-22\nslug: no-title')
  r = await sync(SRC, '--dry-run')
  ck('③ 缺 title rc=1', r.code === 1, `rc=${r.code}`)
  await rm(join(SRC, '沒title.md'))
  await post(SRC, '沒date.md', 'publish: true\ntitle: 沒日期\nslug: no-date')
  r = await sync(SRC, '--dry-run')
  ck('③ 缺 date rc=1', r.code === 1, `rc=${r.code}`)
  await rm(join(SRC, '沒date.md'))

  console.log('\n【④】slug 撞名 → 必須失敗')
  // 🔴 不擋的話後者會靜默覆蓋前者 —— 少一篇文章，沒有任何訊息
  await post(SRC, '撞名A.md', 'publish: true\ntitle: A\ndate: 2026-09-21\nslug: hello-world')
  r = await sync(SRC, '--dry-run')
  ck('④ rc=1', r.code === 1, `rc=${r.code}`)
  ck('④ 兩個來源都點名', r.out.includes('好文.md') && r.out.includes('撞名A.md'))
  await rm(join(SRC, '撞名A.md'))

  console.log('\n【⑤】來源目錄不存在 → 必須失敗')
  // 🔴 「同步完成，0 篇」跟「路徑打錯」長得一模一樣
  r = await sync(join(tmpdir(), '絕對不存在的目錄-syncposts'), '--dry-run')
  ck('⑤ rc=1', r.code === 1, `rc=${r.code}`)
  ck('⑤ 明講是來源不存在', r.out.includes('來源目錄不存在'))

  console.log('\n【⑥】真的寫檔 ＋ 索引排序')
  await post(SRC, '乙.md', 'publish: true\ntitle: 第二篇\ndate: 2026-09-22\nslug: second-post')
  await post(SRC, '丙.md', 'publish: true\ntitle: 第三篇\ndate: 2026-09-20\nslug: third-post')
  await rm(join(SRC, '好文.md'))
  r = await sync(SRC)
  ck('⑥ rc=0', r.code === 0, `rc=${r.code}`)
  let files = await ls()
  ck('⑥ 🔴 檔案真的產出（不是只印訊息）',
    files.includes('second-post.md') && files.includes('third-post.md'), files.join(','))
  ck('⑥ 有索引頁', files.includes('index.md'))
  const idx = await readFile(join(OUT, 'index.md'), 'utf8')
  ck('⑥ 🔴 索引依日期新到舊',
    idx.indexOf('second-post') < idx.indexOf('third-post'))
  const one = await readFile(join(OUT, 'second-post.md'), 'utf8')
  ck('⑥ 產出含 generated 標記', one.includes('generated: true'))
  ck('⑥ 產出含 H1 標題', one.includes('# 第二篇'))

  console.log('\n【⑦】取消發布 → 站上那篇要消失')
  await rm(join(SRC, '丙.md'))
  r = await sync(SRC)
  files = await ls()
  ck('⑦ 🔴 third-post 消失了', !files.includes('third-post.md'), files.join(','))
  ck('⑦ second-post 還在', files.includes('second-post.md'))

  console.log('\n【⑧】🔴 手寫檔案不可被刪（最重要的一組）')
  // 一個「什麼都刪」的版本會讓上面 ①～⑦ 全綠，但它會吃掉手寫的東西。
  const hand = join(OUT, '我手寫的.md')
  await writeFile(hand, '---\ntitle: 手寫\n---\n\n這是我自己寫的。\n', 'utf8')
  r = await sync(SRC)
  ck('⑧ rc=1（停手）', r.code === 1, `rc=${r.code}`)
  ck('⑧ 🔴 手寫檔還在', existsSync(hand))
  ck('⑧ 訊息說得出為什麼', r.out.includes('generated: true'), r.out.slice(0, 90))
  await rm(hand)

  console.log('\n【⑨】輸出目錄有子目錄 → 停手不刪')
  await mkdir(join(OUT, '子目錄'), { recursive: true })
  r = await sync(SRC)
  ck('⑨ rc=1', r.code === 1, `rc=${r.code}`)
  ck('⑨ 子目錄還在', existsSync(join(OUT, '子目錄')))
  await rm(join(OUT, '子目錄'), { recursive: true })

  console.log('\n【⑩】真實 vault 現況（不寫檔）')
  r = await sync(join(process.env.HOME, 'Obsidian', '05-心得'), '--dry-run')
  ck('⑩ rc=0', r.code === 0, `rc=${r.code}`)
  ck('⑩ 掃得到文章', /掃到 \d+ 篇/.test(r.out), r.out.slice(0, 80))
} finally {
  // 還原輸出目錄
  await rm(OUT, { recursive: true, force: true })
  if (SAVED) {
    await mkdir(OUT, { recursive: true })
    for (const [f, c] of Object.entries(SAVED)) await writeFile(join(OUT, f), c, 'utf8')
  }
  await rm(SRC, { recursive: true, force: true })
}

const passed = results.filter(r => r.ok).length
console.log(`\n${'='.repeat(60)}`)
console.log(`${passed}/${results.length} 通過`)
if (passed !== results.length) {
  for (const r of results) if (!r.ok) console.log(`  ❌ ${r.name}  ${r.detail}`)
  process.exit(1)
}
