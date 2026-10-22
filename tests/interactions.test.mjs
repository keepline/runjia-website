import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
const script = await readFile(new URL('../src/site.js', import.meta.url), 'utf8');
function element(data = {}) {
  const attributes = new Map();
  const classes = new Set();
  return { dataset: data, hidden: false, textContent: '', events: {}, focused: false,
    setAttribute(k,v) { attributes.set(k,v); }, getAttribute(k) { return attributes.get(k); },
    addEventListener(k,v) { this.events[k] = v; }, contains(el) { return el === this; },
    classList: { add(c) { classes.add(c); }, remove(c) { classes.delete(c); }, toggle(c, v) { if (v) classes.add(c); else classes.delete(c); }, contains(c) { return classes.has(c); } },
    focus() { this.focused = true; },
  };
}
function setup({ date = '2026-10-22T00:00:00Z', clipboard = true } = {}) {
  const menu = element(); menu.setAttribute('aria-expanded', 'false');
  const nav = element(); const status = element(); const copy = element(); const copyStatus = element();
  const auth = element({ start: '2026-01-01', end: '2026-12-31' });
  const filters = ['all','waterproofing','finishing'].map(filter => element({filter}));
  const cards = ['waterproofing','waterproofing','waterproofing','waterproofing','finishing','finishing'].map(category => element({category}));
  const selectors = { '[data-menu-button]': menu, '[data-navigation]': nav, '[data-filter-status]': status, '[data-copy-status]': copyStatus };
  const arrays = { '[data-filter]': filters, '[data-category]': cards, '[data-copy-phone]': [copy], '[data-authorization-status]': [auth] };
  const events = {}; let copied = '';
  class FakeDate extends Date { constructor(...args) { super(...(args.length ? args : [date])); } }
  vm.runInNewContext(script, {
    document: { querySelector: q => selectors[q], querySelectorAll: q => arrays[q] || [], addEventListener(k,v) { events[k] = v; } },
    window: { matchMedia: () => ({ addEventListener(k,v) { events.resize = v; } }) },
    navigator: clipboard ? { clipboard: { async writeText(v) { copied = v; } } } : {}, Intl, Date: FakeDate,
  });
  return { menu, nav, status, filters, cards, events, copy, copyStatus, auth, copied: () => copied };
}
test('Service filters support all categories and repeated selections', () => {
  const t = setup();
  t.filters[2].events.click();
  assert.equal(t.cards.filter(c => !c.hidden).length, 2);
  assert.equal(t.filters[2].getAttribute('aria-pressed'), 'true');
  t.filters[2].events.click(); assert.equal(t.cards.filter(c => !c.hidden).length, 2);
  t.filters[1].events.click(); assert.equal(t.cards.filter(c => !c.hidden).length, 4);
  t.filters[0].events.click(); assert.equal(t.cards.filter(c => !c.hidden).length, 6);
  assert.equal(t.status.textContent, '已显示 6 项服务');
});
test('Mobile navigation closes on Escape, outside click, link, resize and repeated toggle', () => {
  const t = setup();
  t.menu.events.click(); assert.equal(t.menu.getAttribute('aria-expanded'), 'true');
  t.events.keydown({key:'Escape'}); assert.equal(t.menu.getAttribute('aria-expanded'), 'false'); assert.equal(t.menu.focused,true);
  t.menu.events.click(); t.events.click({target:{}}); assert.equal(t.menu.getAttribute('aria-expanded'), 'false');
  t.menu.events.click(); t.nav.events.click({target:{closest:()=>true}}); assert.equal(t.menu.getAttribute('aria-expanded'), 'false');
  t.menu.events.click(); t.events.resize(); assert.equal(t.menu.getAttribute('aria-expanded'), 'false');
  t.menu.events.click(); t.menu.events.click(); assert.equal(t.menu.getAttribute('aria-expanded'), 'false');
});
test('Copy phone has explicit success and graceful unsupported-browser fallback', async () => {
  const success=setup(); await success.copy.events.click(); assert.equal(success.copied(),'15165268668'); assert.match(success.copyStatus.textContent,/已复制/);
  const fallback=setup({clipboard:false}); await fallback.copy.events.click(); assert.match(fallback.copyStatus.textContent,/手动复制：15165268668/);
});
test('Authorization status respects China date boundaries and expires without stale claims', () => {
  assert.equal(setup({date:'2025-12-31T15:59:59Z'}).auth.textContent,'授权尚未生效');
  assert.equal(setup({date:'2025-12-31T16:00:00Z'}).auth.textContent,'所示授权期限内');
  assert.equal(setup({date:'2026-12-31T15:59:59Z'}).auth.textContent,'所示授权期限内');
  const expired=setup({date:'2026-12-31T16:00:00Z'}).auth;
  assert.equal(expired.textContent,'授权期限已结束，续期情况请联系确认');
  assert.equal(expired.classList.contains('is-expired'),true);
});
