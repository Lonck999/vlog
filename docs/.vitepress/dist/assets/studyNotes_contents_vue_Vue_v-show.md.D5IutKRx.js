import{_ as i,c as a,a1 as t,o as n}from"./chunks/framework.B0cMFUTE.js";const r=JSON.parse('{"title":"v-show","description":"","frontmatter":{},"headers":[],"relativePath":"studyNotes/contents/vue/Vue/v-show.md","filePath":"studyNotes/contents/vue/Vue/v-show.md"}'),h={name:"studyNotes/contents/vue/Vue/v-show.md"};function p(e,s,l,k,E,d){return n(),a("div",null,s[0]||(s[0]=[t(`<h1 id="v-show" tabindex="-1">v-show <a class="header-anchor" href="#v-show" aria-label="Permalink to &quot;v-show&quot;">​</a></h1><p><code>v-show</code>的使用場景跟<code>v-if</code>有點像，你可能會想說那這樣要他幹嘛？</p><p>會留著就代表它好是有一定的功能，有些角度比<code>v-if</code>還好用所以才留著的</p><p>我們先來看<code>v-show</code>的範例：</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-show</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;showChart&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      &lt;!-- 假設這是一個耗資很高的圖表元件 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ComplexChart</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> :data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;chartData&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> @click</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;toggleChart&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;切換圖表顯示/隱藏&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>就像我說的，他跟<code>v-if</code>真的很像，但是他的使用邏輯是完全不一樣的，</p><p><code>v-show</code>的概念比較像是有隱藏斗篷的 DOM 元素，其實他一直都是存在的，</p><p>但你不想讓他出現，他就披著好好的躲起來，</p><p>你想讓他出現，他就把隱藏斗篷脫下，顯現於大眾視野中。</p><p>簡單來說這個元素一直都在，只是他現在是<code>display: none;</code>，當條件有到時<code>display: block;</code></p><p>但是<code>v-if</code>不是，<code>v-if</code>是會將達成條件的 DOM 新增，當不需要時或條件改變成未達成後，直接將這個 DOM 卸載掉，要用的時候再重新新增回來，很耗載入成本。</p><p>常用的場景，例如：標籤頁、試題答案、範例動畫開關、等等...</p>`,12)]))}const c=i(h,[["render",p]]);export{r as __pageData,c as default};
