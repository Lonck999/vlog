/**
 * publish.mjs 用到的純函式（拆出來才測得到）。
 *
 * 🔴 2026-11-01 踩雷：publish 原本用 `gh run list --limit 1` 拿「最新一個 run」——
 *    push 完的當下，新 run 還沒註冊，最新的是 16 分鐘前「每日學習日誌」那個（早已 success）
 *    ⇒ 印「✓ 線上已更新」，實際文章頁 404，新 run 還在 in_progress。
 *    而且最後只驗「學習文章頁回 200」—— 那頁本來就在，舊版也回 200 ⇒ 驗不出任何東西。
 *    兩個洞疊在一起，「成功」訊息跟真的成功長得一模一樣。
 */

/** 從 `gh run list --json databaseId,headSha` 的結果挑出「這次 commit」的 run；沒有就回 null（不可退而求其次拿別的） */
export function pickRun(runs, sha) {
  const hit = (runs || []).find(r => r.headSha === sha)
  return hit ? String(hit.databaseId) : null
}

/** 這次 commit 新增／修改的文章檔 → 線上網址（只認 studyNotes/contents/<區>/posts/<slug>.md） */
export function postUrls(files, site) {
  const re = /^docs\/pages\/studyNotes\/contents\/([^/]+)\/posts\/([^/]+)\.md$/
  return (files || []).map(f => f.match(re)).filter(Boolean)
    .map(([, dir, slug]) => `${site}pages/studyNotes/contents/${dir}/posts/${slug}.html`)
}
