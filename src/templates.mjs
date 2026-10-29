import { company, services, process, brands } from './content.mjs';

export const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.4"/></svg>';
const northeast = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.4"/></svg>';
const phone = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 3 3 5-2 2c1.4 2.7 3.3 4.6 6 6l2-2 5 3c-1 4-3 5-7 3C8 17 4 13 3 7c-.5-2 1-3 4-4Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>';
const mark = '<svg class="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M5 33V7h26v26H17V19h14M5 19h12M17 7v12" stroke="currentColor" stroke-width="2.5"/></svg>';

export function diagram(slug, className = '') {
  const drawings = {
    basement: '<path d="M16 45 72 16l63 31-56 30Z"/><path d="M16 45v47l63 31 56-29V47M79 77v46M29 52v31l50 25 43-22V54"/><path class="diagram-accent" d="m29 83 50 25 43-22M29 67v16M122 70v16"/><path class="diagram-dash" d="M7 81 79 117l66-34M48 29v31l62 31"/>',
    roof: '<path d="m13 66 61-42 66 35-60 43Z"/><path d="m13 66 1 14 65 34 61-40V59M79 102v12M28 61l47-32 51 28-47 32Z"/><path class="diagram-accent" d="m28 61 51 28 47-32M28 69l51 27 47-32"/><path class="diagram-dash" d="m47 48 48 25M62 38l49 25"/>',
    window: '<path d="M38 24 112 9v105l-74 17Z"/><path d="M48 32 102 21v83l-54 13ZM75 27v83M48 74l54-12M38 24l-10-7v104l10 10"/><path class="diagram-accent" d="m43 122 65-15V15M43 27v95"/><path class="diagram-dash" d="m62 42 27-6M61 48l28-6"/>',
    pool: '<path d="m12 53 63-29 65 28-63 33Z"/><path d="m12 53 1 35 64 30 63-33V52M77 85v33M26 55l49-22 50 20-49 24Z"/><path class="diagram-accent" d="m26 55 2 26 49 23 47-23 1-28M28 81l49-24 47 24"/><path class="diagram-dash" d="m39 67 37 17 34-17M39 76l37 17 34-17"/>',
    grout: '<path d="m14 65 62-37 64 35-62 39ZM14 65v12l64 36 62-38V63M78 102v11"/><path d="m44 47 65 35M45 84l62-37"/><path class="diagram-accent" d="m42 49 65 35M47 85l62-37"/><path class="diagram-dash" d="m19 69 59 33 57-35"/>',
    sealant: '<path d="M21 90V39l64-29v51l46 25-65 34Z"/><path d="m21 90 64-29M32 96V46l43-20v40M32 96l34 18 51-27-42-21"/><path class="diagram-accent" d="m34 96 42-23 40 22M76 73V27"/><path class="diagram-dash" d="m40 51 23-10M40 59l23-10"/>',
  };
  return `<svg class="service-diagram ${className}" viewBox="0 0 152 140" fill="none" stroke="currentColor" stroke-width="1" stroke-linejoin="round" aria-hidden="true">${drawings[slug] || drawings.basement}</svg>`;
}

function header(base, current) {
  return `<a class="skip-link" href="#main">跳至正文</a>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" href="${base}" aria-label="润佳精造 首页">${mark}<span><strong>润佳精造</strong><small>RUNJIA · QINGDAO</small></span></a>
    <button class="menu-button" type="button" aria-label="打开或关闭导航菜单" aria-expanded="false" aria-controls="main-navigation" data-menu-button><span></span><span></span></button>
    <nav class="navigation" id="main-navigation" aria-label="主导航" data-navigation>
      <a href="${base}"${current === 'home' ? ' aria-current="page"' : ''}>首页</a>
      <a href="${base}#services"${current === 'service' ? ' aria-current="true"' : ''}>服务体系</a>
      <a href="${base}about/"${current === 'about' ? ' aria-current="page"' : ''}>关于润佳</a>
      <a href="${base}cases/"${current === 'cases' ? ' aria-current="page"' : ''}>项目案例</a>
      <a href="${base}authorization/"${current === 'authorization' ? ' aria-current="page"' : ''}>品牌授权</a>
    </nav>
    <a class="header-contact" href="${base}contact/">联系我们 ${northeast}</a>
  </div></header>`;
}

function footer(base) {
  return `<footer class="site-footer"><div class="container footer-main">
    <div><a class="brand footer-brand" href="${base}">${mark}<span><strong>润佳精造</strong><small>RUNJIA · QINGDAO</small></span></a><p>${company.name}</p><p class="footer-note">专注防水防潮与空间细部的施工服务。</p></div>
    <div class="footer-links"><span class="tiny-label">EXPLORE / 了解更多</span><a href="${base}#services">服务体系</a><a href="${base}about/">关于润佳</a><a href="${base}authorization/">品牌授权</a><a href="${base}cases/">项目案例</a></div>
    <div class="footer-contact"><span class="tiny-label">LET’S TALK / 项目沟通</span><a class="phone-number" href="tel:${company.phone}">${company.phone}</a><span>立足青岛 · 面向全国</span><a class="text-link" href="${base}contact/">开始沟通 ${arrow}</a></div>
  </div><div class="container footer-bottom"><span>© ${new Date().getUTCFullYear()} 润佳精造</span><span>防水有系统 · 精造见细节</span><a href="${base}contact/#privacy">隐私说明</a></div></footer>
  <div class="mobile-contact"><span>聊聊您的空间需求</span><a href="tel:${company.phone}">${phone} 电话咨询</a></div>`;
}

export function layout({ title, description, body, base = './', current = '', image = false, noindex = false }) {
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#243f36"><title>${esc(title)}</title><meta name="description" content="${esc(description)}">${noindex ? '<meta name="robots" content="noindex">' : ''}<meta property="og:type" content="website"><meta property="og:locale" content="zh_CN"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${base}assets/styles.css">${image ? `<link rel="preload" as="image" href="${base}assets/hero-architecture.svg">` : ''}<script type="module" src="${base}assets/site.js"></script></head><body>${header(base, current)}<main id="main">${body}</main>${footer(base)}</body></html>`;
}

function sectionHeading(kicker, title, text = '') {
  return `<div class="section-heading"><div><p class="eyebrow">${kicker}</p><h2>${title}</h2></div>${text ? `<p class="section-description">${text}</p>` : ''}</div>`;
}

function serviceCards(base = './') {
  return services.map(s => {
    const brandHint = s.brandKey === 'tengboshi'
      ? `<span class="service-brand-hint">腾博室 · Tengboshi</span>`
      : (s.brandKey === 'kerakoll' ? `<span class="service-brand-hint">Kerakoll 体系</span>` : '');
    return `<a class="service-card" href="${base}services/${s.slug}/" data-category="${s.category}"><div class="service-card-top"><span class="index-number">${s.number} / 06</span><span class="service-category">${s.categoryName}</span></div><div class="service-art">${diagram(s.slug)}<span class="art-grid" aria-hidden="true"></span></div><div class="service-card-body"><span class="service-english">${s.english}</span><h3>${s.name}</h3>${brandHint}<p>${s.summary}</p><span class="service-card-link">了解服务 ${northeast}</span></div></a>`;
  }).join('');
}

function contactBand(base = './') {
  return `<section class="contact-band"><div class="container contact-band-inner"><div><p class="eyebrow">EVERY DETAIL STARTS WITH A CONVERSATION</p><h2>好空间，从一次认真沟通开始。</h2><p>告诉我们您的项目位置、空间现状与期待。</p></div><a class="button button-light" href="${base}contact/">聊聊您的项目 ${northeast}</a></div></section>`;
}

function processSection() {
  return `<section class="section process-section"><div class="container">${sectionHeading('04 / HOW WE WORK', '把每一步，沟通清楚。', '项目的具体流程与安排，以现场情况和双方确认的方案为准。')}<ol class="process-grid">${process.map((p, i) => `<li><span class="process-number">0${i + 1}</span><h3>${p[0]}</h3><p>${p[1]}</p></li>`).join('')}</ol></div></section>`;
}

export function homePage() {
  const body = `<section class="hero container"><div class="hero-copy"><p class="eyebrow"><span class="eyebrow-line"></span> RUNJIA · ARCHITECTURAL CARE</p><h1>让空间安然，<br>让细节出众<span class="title-dot">。</span></h1><p class="hero-description">从防水防潮，到精细收口。<br>润佳精造，关注空间里看得见与看不见的细节。</p><div class="hero-actions"><a class="button button-dark" href="#services">探索服务体系 ${arrow}</a><a class="text-link" href="./contact/">沟通项目 ${northeast}</a></div><div class="hero-footnote"><span class="location-pin" aria-hidden="true">⌖</span><span>立足青岛<span class="small-divider"></span>面向全国</span><span class="hero-note-number">01 — 06</span></div></div><figure class="hero-visual"><img src="./assets/hero-architecture.svg" alt="暖灰石材、弧形墙面与水景构成的建筑空间概念图" width="1659" height="948" fetchpriority="high"><div class="image-overlay"></div><div class="hero-image-copy"><span>PROTECTION MEETS PRECISION</span><p>防水有系统<br>精造见细节</p></div><figcaption>空间意向图 · AI 生成，非自有项目案例</figcaption><span class="image-corner" aria-hidden="true"></span></figure></section>
  <div class="container scope-strip"><p>空间防护 <span>×</span> 精细饰面</p><span>地下室 · 屋面 · 窗户 · 鱼池泳池 · 美缝 · 美容胶</span><a href="./authorization/">了解品牌授权 ${northeast}</a></div>
  <section class="section services-section" id="services"><div class="container">${sectionHeading('01 / OUR SERVICES', '六大服务，回应空间所需。', '以具体场景为起点，让防水防潮与饰面细节各有章法。')}<div class="service-filters" role="group" aria-label="按服务类型筛选"><button type="button" aria-pressed="true" data-filter="all">全部服务 <span>06</span></button><button type="button" aria-pressed="false" data-filter="waterproofing">防水防潮 <span>04</span></button><button type="button" aria-pressed="false" data-filter="finishing">精细饰面 <span>02</span></button></div><p class="sr-only" aria-live="polite" data-filter-status>已显示 6 项服务</p><div class="service-grid">${serviceCards()}</div></div></section>
  <section class="about-preview"><div class="container about-preview-inner"><div class="about-statement"><p class="eyebrow">02 / ABOUT RUNJIA</p><h2>关照空间，<br>也关照生活的细节。</h2><div class="about-wordmark" aria-hidden="true">RUNJIA<span>精造</span></div></div><div class="about-copy"><p class="large-copy">以细致的沟通，<br>连接材料、施工与真实需求。</p><p>青岛润佳精造设计装饰有限公司，业务涵盖地下室、屋面、窗户、鱼池泳池防水，以及高定美缝和全屋美容胶服务。</p>
<p>防水防潮施工服务依托 Kerakoll 授权体系；美缝与美容胶走腾博室相关产品体系，二者分开展示，互不混挂。</p><p>我们重视问题的具体成因，也重视完成后的空间观感。每一个项目，都从了解现场与明确需求开始。</p><a class="text-link light-link" href="./about/">了解润佳精造 ${arrow}</a></div></div></section>
  <section class="section authorization-preview"><div class="container authorization-grid"><div>${sectionHeading('03 / BRAND PARTNERS', '以清晰的边界，<br>建立真实的了解。')}<p class="muted-copy">Kerakoll 授权仅限防水防潮施工服务；美缝与美容胶走腾博室相关产品体系，分开展示。</p><a class="text-link" href="./authorization/">查看品牌与授权说明 ${arrow}</a></div><div class="authorization-stack"><div class="authorization-card"><div class="authorization-top"><span class="partner-name">Kerakoll</span><span class="outline-label">授权信息</span></div><h3>${company.authorization}</h3><dl class="authorization-details"><div><dt>被授权公司</dt><dd>${company.name}</dd></div><div><dt>授权区域</dt><dd>${company.territory}</dd></div><div><dt>授权期限</dt><dd><time datetime="2026-01-01">2026.01.01</time> — <time datetime="2026-12-31">2026.12.31</time></dd></div></dl><p class="authorization-status" data-authorization-status data-start="2026-01-01" data-end="2026-12-31">授权期限：2026 年 1 月 1 日至 12 月 31 日</p></div><div class="authorization-card brand-card-secondary"><div class="authorization-top"><span class="partner-name">腾博室</span><span class="outline-label">产品体系 · 非 Kerakoll 授权</span></div><h3>美缝 / 美容胶 · 腾博室相关产品体系</h3><dl class="authorization-details"><div><dt>品牌方</dt><dd>${brands.tengboshi.company}</dd></div><div><dt>适用服务</dt><dd>高定美缝系列、全屋美容胶系列</dd></div><div><dt>说明</dt><dd>与 Kerakoll 授权分开展示，不挂靠 Kerakoll</dd></div></dl></div></div></div></section>
  ${processSection()}
  <section class="section cases-preview"><div class="container cases-preview-inner"><div class="case-outline" aria-hidden="true"><span class="case-outline-a"></span><span class="case-outline-b"></span><span class="case-outline-c"></span><span class="case-outline-label">A SPACE FOR REAL STORIES</span></div><div class="case-preview-copy"><p class="eyebrow">05 / PROJECT JOURNAL</p><h2>好作品，<br>值得被真实记录。</h2><p>自有项目案例正在整理中。<br>我们只展示经确认、可公开的真实项目，<br>不将供应商品牌案例作为自己的作品。</p><a class="text-link" href="./cases/">查看案例说明 ${arrow}</a></div></div></section>
  ${contactBand()}`;
  return layout({ title: '润佳精造｜防水防潮与精细饰面 · 青岛润佳精造设计装饰有限公司', description: '青岛润佳精造设计装饰有限公司，面向全国提供地下室、屋面、窗户、鱼池泳池防水，以及高定美缝、全屋美容胶服务。项目咨询：15165268668。', current: 'home', image: true, body });
}

const breadcrumb = (label, base = '../') => `<div class="container breadcrumb"><a href="${base}">首页</a><span>/</span><span>${label}</span></div>`;
const subHero = (kicker, title, description) => `<section class="container sub-hero"><p class="eyebrow">${kicker}</p><h1>${title}</h1><p>${description}</p></section>`;

export function servicePage(service) {
  const base = '../../';
  const next = services[(services.indexOf(service) + 1) % services.length];
  const body = `${breadcrumb(service.name, base)}<section class="container service-hero"><div><p class="eyebrow">SERVICE ${service.number} / ${service.english}</p><p class="service-name-label">${service.name}</p><h1>${service.headline.replace('\n', '<br>')}</h1><p class="service-intro">${service.intro}</p><div class="tag-list">${service.tags.map(tag => `<span>${tag}</span>`).join('')}</div>${service.brandKey === 'tengboshi' ? `<p class="service-brand-note">产品体系：腾博室（Tengboshi）相关美缝材料 · 与 Kerakoll 授权分开展示</p>` : (service.brandKey === 'kerakoll' ? `<p class="service-brand-note">防水防潮服务可结合 Kerakoll 授权体系沟通（中国大陆 · 2026 全年）</p>` : '')}<a class="button button-dark" href="${base}contact/">咨询这项服务 ${northeast}</a></div><div class="service-hero-art">${diagram(service.slug)}<span>${service.english}</span><p>节点构造意向示意，非施工图</p></div></section><section class="section service-focus"><div class="container">${sectionHeading('A CLOSER LOOK', '先把重点，看清楚。')}<div class="focus-grid">${service.focus.map(([title, text], i) => `<article><span class="index-number">0${i + 1}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></div></section><section class="section container preparation"><div><p class="eyebrow">BEFORE WE TALK</p><h2>沟通前，可以先准备这些。</h2><p>有了基本信息，沟通就能更有针对性。<br>不确定的部分，也可以先通过电话交流。</p></div><div><ul>${service.prepare.map(text => `<li>${text}</li>`).join('')}</ul><p class="service-note">${service.note}</p></div></section><div class="container next-service"><a class="text-link" href="${base}#services">${arrow} 返回全部服务</a><a href="../${next.slug}/"><span>继续了解 / ${next.number}</span><strong>${next.name}</strong>${northeast}</a></div>${contactBand(base)}`;
  return layout({ title: `${service.name}｜润佳精造`, description: `${service.summary} 青岛润佳精造，面向全国服务，咨询电话 ${company.phone}。`, base, current: 'service', body });
}

export function aboutPage() {
  const body = `${breadcrumb('关于润佳')}${subHero('ABOUT RUNJIA / 关于润佳', '专注空间，<br>精造每一处细节。', company.name)}<section class="about-detail container"><figure><img src="../assets/hero-architecture.svg" width="1659" height="948" alt="石材与玻璃交接的建筑空间概念意向" loading="lazy"><figcaption>空间意向图 · AI 生成，非自有项目案例</figcaption></figure><div><p class="eyebrow">BASED IN QINGDAO · SERVING NATIONWIDE</p><h2>立足青岛，面向全国。</h2><p>润佳精造聚焦防水防潮与精细饰面施工服务，将空间使用需求、现场条件与细节表达放在一起考虑。</p><p>业务涵盖地下室防水防潮系统、屋面防水系统、窗户防水系统、鱼池泳池防水系统、高定美缝系列及全屋美容胶系列。其中防水防潮依托 Kerakoll 授权体系；美缝与美容胶走腾博室相关产品体系，分开展示。</p><p>从了解现状，到确认方案，我们希望把施工范围、材料选择和沟通节点说清楚，让项目推进有据可依。</p><a class="text-link" href="../#services">探索六大服务 ${arrow}</a></div></section><section class="section container">${sectionHeading('OUR APPROACH', '我们重视的，是这些。')}<div class="focus-grid"><article><span class="index-number">01</span><h3>具体的现场</h3><p>不把不同的空间套进同一种答案，先理解位置、用途与实际条件。</p></article><article><span class="index-number">02</span><h3>清晰的沟通</h3><p>在施工前明确方案、范围与边界，让双方对项目有一致的理解。</p></article><article><span class="index-number">03</span><h3>真实的呈现</h3><p>准确呈现品牌授权与项目资料，不使用未经确认的业绩和承诺。</p></article></div></section>${contactBand('../')}`;
  return layout({ title: '关于润佳｜青岛润佳精造设计装饰有限公司', description: '了解润佳精造的六大服务与沟通方式。立足青岛，面向全国，聚焦防水防潮与精细饰面施工服务。', base: '../', current: 'about', image: true, body });
}

export function authorizationPage() {
  const body = `${breadcrumb('品牌授权')}${subHero('BRAND AUTHORIZATION / 品牌与授权', '清晰呈现，<br>真实可知。', 'Kerakoll 为有期限授权摘要；腾博室为美缝相关产品体系，二者分开展示。')}<section class="container authorization-detail"><div class="authorization-card"><div class="authorization-top"><span class="partner-name">Kerakoll</span><span class="outline-label">授权信息摘要</span></div><h2>${company.authorization}</h2><dl class="authorization-details"><div><dt>被授权公司</dt><dd>${company.name}</dd></div><div><dt>授权区域</dt><dd>${company.territory}</dd></div><div><dt>授权起始日</dt><dd><time datetime="2026-01-01">2026 年 1 月 1 日</time></dd></div><div><dt>授权截止日</dt><dd><time datetime="2026-12-31">2026 年 12 月 31 日</time></dd></div></dl><p class="authorization-status" data-authorization-status data-start="2026-01-01" data-end="2026-12-31">授权期限：2026 年 1 月 1 日至 12 月 31 日</p></div><div class="authorization-explanation"><p class="eyebrow">SCOPE & CLARITY</p><h3>关于 Kerakoll 授权的说明</h3><p>此处仅按已提供资料展示“Kerakoll 防水防潮施工服务代理商”的授权关系，不扩大解释为全国总代理、独家代理或其他未注明的资格。</p><p>授权范围为中国大陆境内，有效期 2026-01-01 至 2026-12-31。美缝、美容胶等精细饰面服务不因本项授权而构成 Kerakoll 授权业务。</p><p>授权资料的完整图片暂未公开。若需核对具体项目的材料适用性、授权信息或最新状态，请联系我们。</p><a class="text-link" href="../contact/">联系核对授权 ${arrow}</a></div></section><section class="container authorization-detail brand-secondary-block"><div class="authorization-card brand-card-secondary"><div class="authorization-top"><span class="partner-name">腾博室 Tengboshi</span><span class="outline-label">产品体系说明 · 非 Kerakoll 授权</span></div><h2>美缝 / 美容胶 · 腾博室相关产品体系</h2><dl class="authorization-details"><div><dt>品牌方</dt><dd>${brands.tengboshi.company}</dd></div><div><dt>适用服务</dt><dd>高定美缝系列、全屋美容胶系列</dd></div><div><dt>产品方向</dt><dd>${brands.tengboshi.focus}</dd></div></dl></div><div class="authorization-explanation"><p class="eyebrow">SEPARATE FROM KERAKOLL</p><h3>与 Kerakoll 分开展示</h3><p>高定美缝与全屋美容胶采用腾博室相关产品体系进行施工服务沟通。公开资料显示腾博室专注美缝材料，与 Kerakoll 防水防潮授权相互独立。</p><p>本站不将美缝或美容胶表述为 Kerakoll 授权业务，也不虚构腾博室的未提供代理证书资格。</p><p>具体材料型号、样板与适用边界以双方确认及产品资料为准。</p><a class="text-link" href="../#services">查看精细饰面服务 ${arrow}</a></div></section>${contactBand('../')}`;
  return layout({ title: '品牌授权｜润佳精造', description: 'Kerakoll 防水防潮施工服务代理商：青岛润佳精造设计装饰有限公司，中国大陆境内，2026-01-01 至 2026-12-31。美缝与美容胶走腾博室相关产品体系，与 Kerakoll 分开展示。', base: '../', current: 'authorization', body });
}

export function casesPage() {
  const body = `${breadcrumb('项目案例')}${subHero('PROJECT JOURNAL / 项目案例', '让真实项目，<br>讲述细节的价值。', '自有项目案例正在整理，确认后将逐步呈现。')}<section class="container cases-empty"><div class="case-outline" aria-hidden="true"><span class="case-outline-a"></span><span class="case-outline-b"></span><span class="case-outline-c"></span><span class="case-outline-label">REAL PROJECTS, REAL DETAILS</span></div><div><span class="outline-label">案例资料整理中</span><h2>这一页，为真实作品留白。</h2><p>目前尚未发布经确认可公开的自有项目案例。我们不会将供应商品牌案例、空间意向图或未经核实的照片作为润佳的施工成果。</p><p>后续案例将根据资料情况，呈现项目背景、处理范围与现场记录。涉及客户或项目隐私的内容，将在确认公开范围后再展示。</p><a class="text-link" href="../contact/">沟通您的项目需求 ${arrow}</a></div></section>${contactBand('../')}`;
  return layout({ title: '项目案例｜润佳精造', description: '润佳精造自有项目案例正在整理中，仅展示经确认可公开的真实项目，不将供应商品牌案例作为自有成果。', base: '../', current: 'cases', body });
}

export function contactPage() {
  const body = `${breadcrumb('联系我们')}${subHero('LET’S TALK / 联系我们', '聊聊您的空间，<br>和您期待的改变。', '从一次具体的沟通开始，了解项目现状与处理需求。')}<section class="container contact-layout"><div class="contact-card"><p class="eyebrow">项目咨询电话</p><a class="contact-large-phone" href="tel:${company.phone}">${company.phone}</a><p>立足青岛 · 面向全国</p><div class="contact-actions"><a class="button button-light" href="tel:${company.phone}">${phone} 拨打电话</a><button class="copy-button" type="button" data-copy-phone>复制号码</button></div><p class="copy-status" role="status" data-copy-status></p><div class="contact-company">${company.name}</div></div><div class="contact-checklist"><p class="eyebrow">A LITTLE PREPARATION</p><h2>您可以先想想这几个问题。</h2><ol><li><span>01</span><div><h3>项目在哪里？</h3><p>所在城市、空间类型，以及方便沟通的时间。</p></div></li><li><span>02</span><div><h3>现在遇到了什么？</h3><p>需要处理的部位、现场表现与已有施工情况。</p></div></li><li><span>03</span><div><h3>您希望达到什么效果？</h3><p>使用需求、风格偏好与计划安排。</p></div></li></ol></div></section><section class="container privacy-note" id="privacy"><div><p class="eyebrow">PRIVACY / 隐私说明</p><h2>只在需要时，沟通必要信息。</h2></div><div><p>本网站第一版为静态展示网站，未设置在线提交表单、文件上传、用户登录或第三方访问统计，也不会通过页面主动收集您的项目资料。</p><p>点击电话按钮将调用您设备的拨号功能。复制号码仅在点击后使用设备的剪贴板功能。网站托管服务可能按其自身政策处理必要访问日志。</p><p>请勿通过非必要渠道发送身份证件、账户密码等敏感信息。后续如增加在线咨询或客户功能，将另行说明信息用途与处理方式。</p></div></section>`;
  return layout({ title: '联系我们｜润佳精造 · 15165268668', description: '联系青岛润佳精造设计装饰有限公司。项目咨询电话 15165268668，立足青岛，面向全国提供防水防潮与精细饰面服务。', base: '../', current: 'contact', body });
}

export function notFoundPage() {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>页面未找到｜润佳精造</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f4ee;color:#243f36;font-family:system-ui,sans-serif}main{padding:40px;max-width:560px}p{line-height:1.9}h1{font-size:38px}a{color:inherit}button{background:#243f36;color:#fff;border:0;padding:15px 24px;cursor:pointer;font:inherit}small{letter-spacing:3px}</style></head><body><main><small>RUNJIA / 404</small><h1>这一页，暂时没有找到。</h1><p>链接可能已变更。您可以返回上一页，或直接拨打项目咨询电话。</p><button type="button" onclick="history.back()">返回上一页</button><p><a href="tel:15165268668">15165268668</a></p></main></body></html>`;
}
