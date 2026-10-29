import test from 'node:test';
import assert from 'node:assert/strict';
import { casesPage, casePage } from '../src/templates.mjs';
import { cases, services } from '../src/content.mjs';

// 固件仅用于验证模板机制，不属于站点内容；公开页面由 content.mjs 的 cases 数据驱动。
const kerakollFixture = {
  slug: 'fixture-basement',
  serviceSlug: 'basement',
  title: '模板固件 · 地下室场景',
  headline: '固件标题：地下空间处理记录结构',
  summary: '验证案例详情模板的固件摘要。',
  tags: ['固件', '防水防潮'],
  sections: [
    ['项目背景', '固件背景文本。'],
    ['处理范围', '固件范围文本。'],
    ['现场记录', '固件记录文本。'],
  ],
  note: '固件边界说明。',
};
const tengboshiFixture = {
  slug: 'fixture-grout',
  serviceSlug: 'grout',
  title: '模板固件 · 美缝场景',
  headline: '固件标题：精细饰面记录结构',
  summary: '验证案例详情模板的固件摘要。',
  tags: ['固件', '精细饰面'],
  sections: [['项目背景', '固件背景文本。']],
  note: '固件边界说明。',
};

test('Published case list is data-driven and currently has no fabricated entries', () => {
  assert.ok(Array.isArray(cases));
  const page = casesPage();
  if (cases.length === 0) {
    assert.ok(!page.includes('class="case-card"'));
    assert.match(page, /这一页，为真实作品留白。/);
  } else {
    for (const item of cases) assert.match(page, new RegExp(`href="\\.\\./cases/${item.slug}/"`));
  }
});

test('Case detail template renders structure, phone and service link for a Kerakoll-scoped entry', () => {
  const html = casePage(kerakollFixture);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /tel:15165268668/);
  assert.match(html, /<title>模板固件 · 地下室场景｜润佳精造项目案例<\/title>/);
  assert.match(html, /href="..\/..\/services\/basement\/"/);
  assert.match(html, /与美缝、美容胶等腾博室体系业务分开展示/);
  for (const section of kerakollFixture.sections) assert.ok(html.includes(section[1]));
  assert.match(html, /节点构造意向示意，非该项目施工图/);
});

test('Case detail template keeps the Tengboshi scope separate from Kerakoll authorization', () => {
  const html = casePage(tengboshiFixture);
  assert.match(html, /采用腾博室相关产品体系/);
  assert.match(html, /不挂靠 Kerakoll/);
  assert.ok(!html.includes('Kerakoll 授权体系说明'));
});

test('Every declared case maps to a real service and unique slug', () => {
  const slugs = new Set(cases.map(item => item.slug));
  assert.equal(slugs.size, cases.length);
  for (const item of cases) assert.ok(services.some(s => s.slug === item.serviceSlug), item.slug);
});
