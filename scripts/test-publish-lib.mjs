#!/usr/bin/env node
/**
 * publish-lib.mjs 回歸（2026-11-01）。
 * 踩雷：publish 等到的是「上一個」run（push 當下新 run 還沒註冊），且只驗學習文章頁（舊版也 200）
 *       ⇒ 印「✓ 線上已更新」而文章 404。
 * 雙向：把 pickRun 改回「拿第一個」⇒ ①② 紅；postUrls 回空陣列 ⇒ ④ 紅。
 */
import { pickRun, postUrls } from './publish-lib.mjs'

let pass = 0, fail = 0
const ok = (c, m) => { c ? pass++ : fail++; console.log(`${c ? '✅' : '🔴'} ${m}`) }

const NEW = '3aade8a909c5bc2610b2ee7ed6efd0c97b4c02fa', OLD = '0b04e58acb4c11a5c54ee13ff24d4177a51f9f52'
// ① 2026-11-01 實際情境：新 run 還沒註冊，清單裡只有上一個 ⇒ 必須回 null，不可拿舊的
ok(pickRun([{ databaseId: 41320711994, headSha: OLD }], NEW) === null, '① 新 run 還沒出現時不可拿上一個 run')
// ② 新 run 出現但不在第一個位置
ok(pickRun([{ databaseId: 1, headSha: OLD }, { databaseId: 41322086652, headSha: NEW }], NEW) === '41322086652', '② 依 headSha 挑對的 run')
ok(pickRun([], NEW) === null && pickRun(undefined, NEW) === null, '③ 空清單回 null')

const SITE = 'https://lonck999.github.io/vlog/'
const urls = postUrls([
  'docs/pages/studyNotes/index.md',
  'docs/pages/studyNotes/contents/python/posts/python-day-01.md',
  'docs/pages/studyNotes/contents/vue/Vue/index.md',
], SITE)
ok(urls.length === 1 && urls[0] === `${SITE}pages/studyNotes/contents/python/posts/python-day-01.html`, '④ 只把文章檔轉成線上網址')
ok(postUrls([], SITE).length === 0, '⑤ 沒文章檔時回空')

console.log(`\n${pass}/${pass + fail} 通過`)
process.exit(fail ? 1 : 0)
