// Список иконок SVG
const ICONS = {
  divide: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="1"/><line x1="5" x2="19" y1="12" y2="12"/><circle cx="12" cy="18" r="1"/></svg>`,
  moveHorizontal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 8 22 12 18 16"/><polyline points="6 8 2 12 6 16"/><line x1="2" x2="22" y1="12" y2="12"/></svg>`,
  calculator: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="14"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`,
  rootX: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 13l3 5l5-13h11"/><path d="M13 11l6 6"/><path d="M19 11l-6 6"/></svg>`,
  dices: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.41 2.41 0 0 0 0-3.41l-4.5-4.5a2.41 2.41 0 0 0-3.41 0L10 6.08"/><path d="M6 14h.01"/><path d="M10 18h.01"/></svg>`,
  lineChart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
  greaterOrEqual: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5l14 5-14 5"/><path d="M5 20l14-5"/></svg>`,
  trendingUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  checkCircle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#eefce8" stroke="#58CC00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
  logOut: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`,
  alertTriangle: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF4B4B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
};

// Данные по темам (как в приложении)
const topics = [
  { id: 6, title: '6 задание', subtitle: 'Дроби и вычисления', progress: 85, iconKey: 'divide' },
  { id: 7, title: '7 задание', subtitle: 'Координатная прямая', progress: 70, iconKey: 'moveHorizontal' },
  { id: 8, title: '8 задание', subtitle: 'Алгебраические выражения', progress: 90, iconKey: 'calculator' },
  { id: 9, title: '9 задание', subtitle: 'Уравнения и системы', progress: 55, iconKey: 'rootX' },
  { id: 10, title: '10 задание', subtitle: 'Вероятности', progress: 100, iconKey: 'dices' },
  { id: 11, title: '11 задание', subtitle: 'Графики функций', progress: 45, iconKey: 'lineChart' },
  { id: 13, title: '13 задание', subtitle: 'Решение неравенств', progress: 60, iconKey: 'greaterOrEqual' },
  { id: 14, title: '14 задание', subtitle: 'Прогрессии', progress: 40, iconKey: 'trendingUp' },
];

let activeTab = 'repeat';
let isEmailExpanded = false;
let currentModalAction = null;

document.addEventListener('DOMContentLoaded', () => {
  renderRepeatList();
  renderProgressTable();
  updateProgressStats();
  initNavigation();
  initAccountEvents();
  initCopyButton();
});

// 1. Рендер списка "Повторение"
function renderRepeatList() {
  const container = document.getElementById('repeat-list-container');
  if (!container) return;

  container.innerHTML = topics.map(t => `
    <div class="repeat-card">
      <div class="repeat-card-info">
        <span class="repeat-card-title">${t.title}</span>
        <span class="repeat-card-subtitle">${t.subtitle}</span>
      </div>
      <div class="repeat-card-icon-wrapper">
        ${ICONS[t.iconKey]}
      </div>
    </div>
  `).join('');
}

// 2. Рендер таблицы прогресса на вкладке "Аккаунт"
function renderProgressTable() {
  const container = document.getElementById('progress-table-container');
  if (!container) return;

  container.innerHTML = topics.map(t => {
    const isComplete = t.progress === 100;
    return `
      <div class="table-row">
        <div class="row-top">
          <div class="row-left">
            <div class="row-icon-box ${isComplete ? 'complete' : 'incomplete'}">
              ${ICONS[t.iconKey]}
            </div>
            <div class="row-titles">
              <div class="title">${t.title}</div>
              <div class="subtitle">${t.subtitle}</div>
            </div>
          </div>
          <div class="row-right">
            <span class="progress-text ${isComplete ? 'complete' : 'incomplete'}">${t.progress}%</span>
            ${isComplete ? ICONS.checkCircle : ''}
          </div>
        </div>

        <div class="progress-bar-bg">
          <div class="progress-bar-fill ${isComplete ? 'complete' : 'incomplete'}" style="width: ${t.progress}%">
            <div class="specular-highlight"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 3. Статистика общего прогресса
function updateProgressStats() {
  const totalAvg = Math.round(topics.reduce((acc, curr) => acc + curr.progress, 0) / topics.length);
  const masteredCount = topics.filter(t => t.progress === 100).length;

  const percentageElem = document.getElementById('overall-percentage');
  const badgeTextElem = document.getElementById('mastered-badge-text');

  if (percentageElem) percentageElem.textContent = `${totalAvg}%`;
  if (badgeTextElem) badgeTextElem.textContent = `${masteredCount} из ${topics.length} освоено`;
}

// 4. Переключение вкладок
function initNavigation() {
  const tabHome = document.getElementById('tab-home');
  const tabRepeat = document.getElementById('tab-repeat');
  const tabAccount = document.getElementById('tab-account');

  const btnHome = document.getElementById('nav-home-btn');
  const btnRepeat = document.getElementById('nav-repeat-btn');
  const btnAccount = document.getElementById('nav-account-btn');

  function switchTab(tab) {
    activeTab = tab;

    tabHome.classList.toggle('hidden', tab !== 'home');
    tabRepeat.classList.toggle('hidden', tab !== 'repeat');
    tabAccount.classList.toggle('hidden', tab !== 'account');

    btnHome.classList.toggle('active', tab === 'home');
    btnRepeat.classList.toggle('active', tab === 'repeat');
    btnAccount.classList.toggle('active', tab === 'account');
  }

  btnHome?.addEventListener('click', () => switchTab('home'));
  btnRepeat?.addEventListener('click', () => switchTab('repeat'));
  btnAccount?.addEventListener('click', () => switchTab('account'));
}

// 5. Логика меню аккаунта, модального окна и тостов
function initAccountEvents() {
  const dotsBtn = document.getElementById('email-dots-btn');
  const actionsPanel = document.getElementById('email-actions-panel');
  const overallWrapper = document.getElementById('overall-progress-wrapper');

  const btnLogout = document.getElementById('btn-logout');
  const btnDelete = document.getElementById('btn-delete');

  const modal = document.getElementById('confirm-modal');
  const modalIcon = document.getElementById('modal-icon-container');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalConfirmBtn = document.getElementById('modal-confirm-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');

  // Троеточие
  dotsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    isEmailExpanded = !isEmailExpanded;
    actionsPanel.classList.toggle('open', isEmailExpanded);
    dotsBtn.classList.toggle('active', isEmailExpanded);
    overallWrapper.classList.toggle('collapsed', isEmailExpanded);
  });

  // Клик "Выйти из аккаунта"
  btnLogout?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentModalAction = 'logout';
    modalIcon.className = 'modal-icon-container purple';
    modalIcon.innerHTML = ICONS.logOut;
    modalTitle.textContent = 'Выйти из аккаунта?';
    modalDesc.classList.add('hidden'); // без лишнего описания
    modalConfirmBtn.className = 'modal-btn-confirm purple';
    modalConfirmBtn.textContent = 'Да, выйти';
    modal.classList.remove('hidden');
  });

  // Клик "Удалить аккаунт"
  btnDelete?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentModalAction = 'delete';
    modalIcon.className = 'modal-icon-container red';
    modalIcon.innerHTML = ICONS.alertTriangle;
    modalTitle.textContent = 'Удалить аккаунт?';
    modalDesc.textContent = 'Вы уверены, что хотите удалить аккаунт? Все ваши результаты и прогресс будут стёрты навсегда.';
    modalDesc.classList.remove('hidden');
    modalConfirmBtn.className = 'modal-btn-confirm red';
    modalConfirmBtn.textContent = 'Да, удалить навсегда';
    modal.classList.remove('hidden');
  });

  // Отмена / Закрытие
  modalCancelBtn?.addEventListener('click', () => modal.classList.add('hidden'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // Подтверждение действия
  modalConfirmBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');

    // Сворачиваем карточку
    isEmailExpanded = false;
    actionsPanel.classList.remove('open');
    dotsBtn.classList.remove('active');
    overallWrapper.classList.remove('collapsed');

    if (currentModalAction === 'logout') {
      showToast('Вы успешно вышли из аккаунта');
    } else if (currentModalAction === 'delete') {
      showToast('Аккаунт и прогресс успешно удалены');
    }
  });
}

// 6. Тост-уведомление
function showToast(text) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = text;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2500);
}

// 7. Кнопка копирования
function initCopyButton() {
  const copyBtn = document.getElementById('copy-btn');
  const copyIcon = document.getElementById('copy-icon');
  const checkIcon = document.getElementById('check-icon');

  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText(document.documentElement.outerHTML);
    copyIcon.classList.add('hidden');
    checkIcon.classList.remove('hidden');

    setTimeout(() => {
      copyIcon.classList.remove('hidden');
      checkIcon.classList.add('hidden');
    }, 2000);
  });
}
