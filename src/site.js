const menuButton = document.querySelector('[data-menu-button]');
const navigation = document.querySelector('[data-navigation]');

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation?.classList.toggle('is-open', !isOpen);
});
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!navigation?.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);

const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
const filterStatus = document.querySelector('[data-filter-status]');
filters.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    cards.forEach(card => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) count += 1;
    });
    if (filterStatus) filterStatus.textContent = `已显示 ${count} 项服务`;
  });
});

document.querySelectorAll('[data-copy-phone]').forEach(button => {
  button.addEventListener('click', async () => {
    const status = document.querySelector('[data-copy-status]');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText('15165268668');
      if (status) status.textContent = '电话号码已复制：15165268668';
      button.textContent = '已复制号码';
    } catch {
      if (status) status.textContent = '暂时无法自动复制，请手动复制：15165268668';
    }
  });
});

// Evaluate in China Standard Time, because the authorization is for mainland China.
const chinaToday = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(new Date());
document.querySelectorAll('[data-authorization-status]').forEach(element => {
  const start = element.dataset.start;
  const end = element.dataset.end;
  if (chinaToday > end) {
    element.textContent = '授权期限已结束，续期情况请联系确认';
    element.classList.add('is-expired');
  } else if (chinaToday < start) {
    element.textContent = '授权尚未生效';
  } else {
    element.textContent = '所示授权期限内';
  }
});
