#!/usr/bin/env node
/**
 * 發布：同步 vault → commit → push → **等 GitHub Actions 真的部署完並驗線上**。
 *
 * 🔴 為什麼要 commit 同步產物（各分類的 `posts/` ＋ 學習文章頁）：
 * GitHub Actions 的建置機器上沒有 Obsidian vault。如果那些檔不進版控，
 * 雲端建出來會是**零篇文章而且不報錯** —— 本機看起來好好的，線上是空的。
 *
 * 🔴 為什麼要等 Actions 跑完才宣告成功（2026-09-22 從 blog 移植時補的）：
 * `git push` 回 0 只代表**推上去了**，不代表**站上看得到**。
 * AGENTS.md §1：驗終點，不驗過程。
 * blog 版本 push 完就印「Vercel 會自動重新部署」—— 那是猜的，不是驗的。
 *
 * 用法：
 *   npm run publish
 *   npm run publish -- --no-wait   # 不等部署（趕時間時用，但就沒驗到終點）
 */
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('../', import.meta.url)))
const NO_WAIT = process.argv.includes('--no-wait')
// 🔴 2026-10-20：文章改成依分類放進學習文章各區 ⇒ 產物在整個 studyNotes/ 底下
const POSTS = 'docs/pages/studyNotes'
const SITE = 'https://lonck999.github.io/vlog/'

function git(...args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
}

// 1. 同步（失敗會直接丟出，不吞 exit code）
//    🔴 不可寫成 `... || echo 失敗` —— 那會把失敗吞掉、exit code 變 0，
//       於是「看起來成功」和「真的成功」再也分不出來。
execFileSync('node', ['scripts/sync-posts.mjs'], { cwd: root, stdio: 'inherit' })

// 2. 只有文章目錄有變動才 commit
const changed = git('status', '--porcelain', '--', POSTS)
if (!changed) {
  console.log('\n沒有文章變動，不需要發布。')
  process.exit(0)
}

console.log('\n變動：')
console.log(changed)

git('add', POSTS)
const count = git('diff', '--cached', '--name-only', '--', POSTS)
  .split('\n').filter(Boolean).length
git('commit', '-m', `posts: 同步 ${count} 個檔案變動`)

// 3. push —— 🔴 用當前分支，不要寫死 main
//    （fin-wise 踩過：寫死 main 但實際在別的分支，指令根本失敗，
//      卻因為被 || echo 包住而印出「pushed」，四小時後才發現。）
const branch = git('rev-parse', '--abbrev-ref', 'HEAD')
git('push', 'origin', branch)
const sha = git('rev-parse', 'HEAD')
console.log(`\n→ 已推上 origin/${branch}（${sha.slice(0, 7)}）`)

if (NO_WAIT) {
  console.log('⚠️ --no-wait：沒有驗證線上是否真的更新。')
  process.exit(0)
}

// 4. 🔴 驗終點：等 Actions 跑完，再打線上網址確認
console.log('\n等待 GitHub Actions 部署…')
try {
  const runId = execFileSync('gh',
    ['run', 'list', '--limit', '1', '--json', 'databaseId', '--jq', '.[0].databaseId'],
    { cwd: root, encoding: 'utf8' }).trim()
  execFileSync('gh', ['run', 'watch', runId, '--exit-status'],
    { cwd: root, stdio: 'inherit' })
} catch {
  console.error('🔴 GitHub Actions 部署失敗 —— 站上還是舊的。')
  console.error('   看紀錄：gh run view --log-failed')
  process.exit(1)
}

// Pages 的 CDN 需要幾秒才吃到新版
await new Promise(r => setTimeout(r, 15000))

const res = await fetch(`${SITE}pages/studyNotes/`)
if (!res.ok) {
  console.error(`🔴 線上學習文章頁回 ${res.status} —— 部署成功但頁面不在。`)
  process.exit(1)
}
console.log(`\n✓ 線上已更新：${SITE}pages/studyNotes/`)
console.log(`  commit: ${git('log', '--oneline', '-1')}`)
