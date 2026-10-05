/**
 * PERSONAL CALENDAR & TO-DO PLANNER
 * Pure Vanilla JS + LocalStorage Persistence + GitHub Pages Static Ready
 */
(function () {
  'use strict';

  // ----------------------------------------------------
  // A. DATA CONSTANTS & INDONESIAN HOLIDAYS DATASET
  // ----------------------------------------------------
  const MONTH_NAMES = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const DAY_NAMES_FULL = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const DAY_NAMES_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  // Static National Holidays Dataset for Indonesia (2025 - 2027)
  const INDONESIAN_HOLIDAYS = [
    // 2025
    { date: '2025-01-01', name: 'Tahun Baru 2025 Masehi' },
    { date: '2025-01-27', name: "Isra Mi'raj Nabi Muhammad SAW" },
    { date: '2025-01-29', name: 'Tahun Baru Imlek 2576 Kongzili' },
    { date: '2025-03-29', name: 'Hari Suci Nyepi (Tahun Baru Saka 1947)' },
    { date: '2025-03-31', name: 'Hari Raya Idul Fitri 1446 H' },
    { date: '2025-04-01', name: 'Hari Raya Idul Fitri 1446 H' },
    { date: '2025-04-18', name: 'Wafat Yesus Kristus (Jumat Agung)' },
    { date: '2025-04-20', name: 'Kebangkitan Yesus Kristus (Paskah)' },
    { date: '2025-05-01', name: 'Hari Buruh Internasional' },
    { date: '2025-05-12', name: 'Hari Raya Waisak 2569 BE' },
    { date: '2025-05-29', name: 'Kenaikan Yesus Kristus' },
    { date: '2025-06-01', name: 'Hari Lahir Pancasila' },
    { date: '2025-06-07', name: 'Hari Raya Idul Adha 1446 H' },
    { date: '2025-06-27', name: '1 Muharam Tahun Baru Islam 1447 H' },
    { date: '2025-08-17', name: 'Hari Kemerdekaan RI Ke-80' },
    { date: '2025-09-05', name: 'Maulid Nabi Muhammad SAW' },
    { date: '2025-12-25', name: 'Hari Raya Natal' },

    // 2026
    { date: '2026-01-01', name: 'Tahun Baru 2026 Masehi' },
    { date: '2026-01-16', name: "Isra Mi'raj Nabi Muhammad SAW" },
    { date: '2026-02-17', name: 'Tahun Baru Imlek 2577 Kongzili' },
    { date: '2026-03-20', name: 'Hari Raya Idul Fitri 1447 H (Hari 1)' },
    { date: '2026-03-21', name: 'Hari Raya Idul Fitri 1447 H (Hari 2)' },
    { date: '2026-03-21', name: 'Hari Suci Nyepi Saka 1948' },
    { date: '2026-04-03', name: 'Wafat Yesus Kristus' },
    { date: '2026-04-05', name: 'Hari Paskah' },
    { date: '2026-05-01', name: 'Hari Buruh Internasional' },
    { date: '2026-05-14', name: 'Kenaikan Yesus Kristus' },
    { date: '2026-05-27', name: 'Hari Raya Idul Adha 1447 H' },
    { date: '2026-05-31', name: 'Hari Raya Waisak 2570 BE' },
    { date: '2026-06-01', name: 'Hari Lahir Pancasila' },
    { date: '2026-06-16', name: 'Tahun Baru Islam 1448 Hijriah' },
    { date: '2026-08-17', name: 'Hari Kemerdekaan RI Ke-81' },
    { date: '2026-08-25', name: 'Maulid Nabi Muhammad SAW' },
    { date: '2026-12-25', name: 'Hari Raya Natal' },

    // 2027
    { date: '2027-01-01', name: 'Tahun Baru 2027 Masehi' },
    { date: '2027-02-06', name: 'Tahun Baru Imlek 2578' },
    { date: '2027-03-10', name: 'Hari Raya Idul Fitri 1448 H' },
    { date: '2027-05-01', name: 'Hari Buruh Internasional' },
    { date: '2027-08-17', name: 'Hari Kemerdekaan RI Ke-82' },
    { date: '2027-12-25', name: 'Hari Raya Natal' }
  ];

  // Initial clean sample data
  const INITIAL_SAMPLE_EVENTS = [
    {
      id: 'ev-1',
      title: 'Kerja',
      date: formatDateKey(new Date()),
      startTime: '08:00',
      endTime: '17:00',
      category: 'Kerja',
      notes: 'Daily standup & sprint review project planner.',
      status: 'busy',
      createdAt: Date.now()
    },
    {
      id: 'ev-2',
      title: 'Revisi KKI',
      date: formatDateKey(new Date()),
      startTime: '19:00',
      endTime: '20:00',
      category: 'Kuliah',
      notes: 'Penyempurnaan Bab 4 dan analisis data.',
      status: 'important',
      createdAt: Date.now()
    },
    {
      id: 'ev-3',
      title: 'Kuliah',
      date: formatDateKey(new Date()),
      startTime: '20:00',
      endTime: '21:30',
      category: 'Kuliah',
      notes: 'Mata kuliah Sistem Informasi Lanjutan.',
      status: 'busy',
      createdAt: Date.now()
    }
  ];

  const INITIAL_SAMPLE_TASKS = [
    {
      id: 'tsk-1',
      title: 'Revisi proposal KKI',
      date: formatDateKey(new Date()),
      deadlineTime: '21:00',
      priority: 'high',
      status: 'process',
      notes: 'Diskusi feedback dengan dosen pembimbing.',
      createdAt: Date.now()
    },
    {
      id: 'tsk-2',
      title: 'Upload tugas statistik',
      date: formatDateKey(new Date()),
      deadlineTime: '23:59',
      priority: 'medium',
      status: 'todo',
      notes: 'Format PDF maksimal 10MB di portal kampus.',
      createdAt: Date.now()
    },
    {
      id: 'tsk-3',
      title: 'Buat laporan kerja harian',
      date: formatDateKey(new Date()),
      deadlineTime: '17:30',
      priority: 'low',
      status: 'done',
      notes: 'Kirim via email ke team leader.',
      createdAt: Date.now()
    }
  ];

  // ----------------------------------------------------
  // B. APP STATE
  // ----------------------------------------------------
  const state = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth(),
    selectedDate: formatDateKey(new Date()),
    pickerYear: new Date().getFullYear(),
    activeView: 'view-calendar',
    todoFilter: 'all',
    todoSearch: '',
    events: [],
    tasks: [],
    dayStatuses: {},
    settings: {
      startDay: 1, // 1 = Senin, 0 = Minggu
      showHolidays: true,
      showStatusDots: true,
      showPreviews: true,
      darkMode: false
    }
  };

  // ----------------------------------------------------
  // C. STORAGE ENGINE
  // ----------------------------------------------------
  const STORAGE_KEYS = {
    EVENTS: 'myplanner_events_v1',
    TASKS: 'myplanner_tasks_v1',
    STATUSES: 'myplanner_day_statuses_v1',
    SETTINGS: 'myplanner_settings_v1',
    INIT_FLAG: 'myplanner_initialized_v1'
  };

  function loadData() {
    try {
      const isInitialized = localStorage.getItem(STORAGE_KEYS.INIT_FLAG);

      if (!isInitialized) {
        state.events = INITIAL_SAMPLE_EVENTS;
        state.tasks = INITIAL_SAMPLE_TASKS;
        state.dayStatuses = {};
        state.settings = {
          startDay: 1,
          showHolidays: true,
          showStatusDots: true,
          showPreviews: true,
          darkMode: false
        };
        saveData();
        localStorage.setItem(STORAGE_KEYS.INIT_FLAG, 'true');
      } else {
        const storedEvents = localStorage.getItem(STORAGE_KEYS.EVENTS);
        const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
        const storedStatuses = localStorage.getItem(STORAGE_KEYS.STATUSES);
        const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);

        state.events = storedEvents ? JSON.parse(storedEvents) : [];
        state.tasks = storedTasks ? JSON.parse(storedTasks) : [];
        state.dayStatuses = storedStatuses ? JSON.parse(storedStatuses) : {};
        if (storedSettings) {
          state.settings = Object.assign(state.settings, JSON.parse(storedSettings));
        }
      }
    } catch (e) {
      console.error('Error loading data from localStorage:', e);
      state.events = [];
      state.tasks = [];
      state.dayStatuses = {};
    }

    applyTheme();
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(state.events));
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(state.tasks));
      localStorage.setItem(STORAGE_KEYS.STATUSES, JSON.stringify(state.dayStatuses));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
    } catch (e) {
      console.error('Error saving data to localStorage:', e);
      showToast('Penyimpanan lokal penuh atau tidak diizinkan.', 'error');
    }
  }

  function applyTheme() {
    if (state.settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const darkCheck = document.getElementById('setting-dark-mode');
    if (darkCheck) darkCheck.checked = !!state.settings.darkMode;
  }

  // ----------------------------------------------------
  // D. DATE HELPERS
  // ----------------------------------------------------
  function formatDateKey(dateObj) {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function parseDateKey(keyStr) {
    const parts = keyStr.split('-');
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  }

  function formatIndonesianDateFull(dateKey) {
    const d = parseDateKey(dateKey);
    const dayName = DAY_NAMES_FULL[d.getDay()];
    const dayNum = d.getDate();
    const monthName = MONTH_NAMES[d.getMonth()];
    const year = d.getFullYear();
    return `${dayName}, ${dayNum} ${monthName} ${year}`;
  }

  function formatTimeDisplay(timeStr) {
    if (!timeStr) return '';
    return timeStr.replace(':', '.');
  }

  function getHolidayInfo(dateKey) {
    if (!state.settings.showHolidays) return null;
    return INDONESIAN_HOLIDAYS.find(h => h.date === dateKey) || null;
  }

  function getCategoryIcon(cat) {
    switch (cat) {
      case 'Kerja': return '💼';
      case 'Kuliah': return '🎓';
      case 'Organisasi': return '👥';
      case 'Personal': return '🏃';
      case 'Deadline': return '⏰';
      default: return '📌';
    }
  }

  function getDateStatus(dateKey) {
    // 1. Manual status override takes precedence
    if (state.dayStatuses[dateKey]) {
      return state.dayStatuses[dateKey];
    }

    // 2. National holiday default is free/holiday (true red)
    const hol = getHolidayInfo(dateKey);
    if (hol) {
      return 'free';
    }

    const dayTasks = state.tasks.filter(t => t.date === dateKey && t.status !== 'done');
    const hasHighPriorityTask = dayTasks.some(t => t.priority === 'high');

    const dayEvents = state.events.filter(e => e.date === dateKey);
    if (dayEvents.length > 0) {
      const hasImportantEvent = dayEvents.some(e => e.status === 'important' || e.category === 'Deadline');
      if (hasImportantEvent || hasHighPriorityTask) {
        return 'important';
      }
      return 'busy';
    }

    if (dayTasks.length > 0) {
      return 'important';
    }

    return 'normal';
  }

  // ----------------------------------------------------
  // E. CALENDAR RENDER ENGINE
  // ----------------------------------------------------
  function renderCalendar() {
    const year = state.currentYear;
    const month = state.currentMonth;

    const monthYearStr = `${MONTH_NAMES[month]} ${year}`;
    const headerTitleEl = document.getElementById('header-month-year');
    const subHeaderEl = document.getElementById('sub-header-display');
    if (headerTitleEl) headerTitleEl.textContent = monthYearStr;
    if (subHeaderEl) subHeaderEl.textContent = monthYearStr;

    // Day of Week Headers (All unified clean black/dark text)
    const headerRow = document.getElementById('calendar-day-headers');
    if (headerRow) {
      headerRow.innerHTML = '';
      const startDay = state.settings.startDay;
      for (let i = 0; i < 7; i++) {
        const dayIdx = (i + startDay) % 7;
        const th = document.createElement('div');
        th.className = 'py-1 text-center font-bold text-xs text-[var(--text-main)]';
        th.textContent = DAY_NAMES_SHORT[dayIdx];
        headerRow.appendChild(th);
      }
    }

    const gridEl = document.getElementById('calendar-grid');
    if (!gridEl) return;
    gridEl.innerHTML = '';

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const totalDays = lastDayOfMonth.getDate();

    let firstDayIndex = firstDayOfMonth.getDay();
    let offset = (firstDayIndex - state.settings.startDay + 7) % 7;

    // Previous month filler days
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = offset - 1; i >= 0; i--) {
      const prevDay = prevMonthLastDate - i;
      const prevDateObj = new Date(year, month - 1, prevDay);
      const prevDateKey = formatDateKey(prevDateObj);
      const cell = createCalendarCell(prevDateKey, prevDay, true);
      gridEl.appendChild(cell);
    }

    // Current month active days
    const todayKey = formatDateKey(new Date());
    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(year, month, day);
      const dateKey = formatDateKey(dateObj);
      const isToday = (dateKey === todayKey);
      const isSelected = (dateKey === state.selectedDate);
      const cell = createCalendarCell(dateKey, day, false, isToday, isSelected);
      gridEl.appendChild(cell);
    }

    // Trailing days
    const currentTotalCells = offset + totalDays;
    const totalRows = Math.ceil(currentTotalCells / 7);
    const remainingCells = (totalRows * 7) - currentTotalCells;

    for (let nextDay = 1; nextDay <= remainingCells; nextDay++) {
      const nextDateObj = new Date(year, month + 1, nextDay);
      const nextDateKey = formatDateKey(nextDateObj);
      const cell = createCalendarCell(nextDateKey, nextDay, true);
      gridEl.appendChild(cell);
    }

    updateMonthStats(year, month);
    renderSelectedDateDetails();
  }

  function createCalendarCell(dateKey, dayNumber, isOtherMonth, isToday = false, isSelected = false) {
    const cell = document.createElement('div');
    cell.className = `calendar-cell relative flex flex-col justify-between p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer ${
      isOtherMonth ? 'opacity-30 border-transparent hover:bg-black/5 dark:hover:bg-white/5' : 'bg-black/[0.015] dark:bg-white/[0.02] border-[var(--border-subtle)] hover:border-[var(--primary-sage)]'
    } ${isSelected ? 'selected ring-2 ring-[var(--primary-sage)] !border-transparent' : ''}`;

    cell.dataset.date = dateKey;

    const topRow = document.createElement('div');
    topRow.className = 'flex items-center justify-between w-full';

    const holiday = getHolidayInfo(dateKey);
    const status = getDateStatus(dateKey);

    const dayNumSpan = document.createElement('span');
    let dayNumClasses = 'text-xs sm:text-sm font-bold inline-flex items-center justify-center ';
    if (isToday) {
      dayNumClasses += 'w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[var(--primary-sage)] text-white font-bold shadow-xs';
    } else {
      // Tanggal selalu hitam untuk semua hari (termasuk Minggu dan hari libur)
      dayNumClasses += 'text-[var(--text-main)]';
    }
    dayNumSpan.className = dayNumClasses;
    dayNumSpan.textContent = dayNumber;

    topRow.appendChild(dayNumSpan);

    // Status Dots: 🟢 Richer Green (Busy), 🔴 True Red (Libur/Holiday), 🟡 Muted Yellow (Important)
    if (state.settings.showStatusDots && status !== 'normal') {
      const dot = document.createElement('span');
      let dotColor = 'bg-[#2E7D47]'; // rich green for events
      if (status === 'free' || holiday) dotColor = 'bg-[#DC2626]'; // true red for libur/holiday
      else if (status === 'important') dotColor = 'bg-[#E5A020]'; // yellow

      dot.className = `w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${dotColor} shrink-0 shadow-xs`;
      topRow.appendChild(dot);
    }

    cell.appendChild(topRow);

    const contentContainer = document.createElement('div');
    contentContainer.className = 'w-full space-y-0.5 mt-0.5 overflow-hidden';

    if (!isOtherMonth) {
      // National Holiday text tag (True Red)
      if (holiday && state.settings.showHolidays) {
        const holSnippet = document.createElement('div');
        holSnippet.className = 'text-[9px] sm:text-[10px] font-bold text-[#DC2626] truncate hidden sm:block bg-red-50 dark:bg-red-950/40 px-1 py-0.2 rounded border border-red-100 dark:border-red-900/30';
        holSnippet.textContent = holiday.name;
        contentContainer.appendChild(holSnippet);
      }

      // Event text preview (Rich Green)
      if (state.settings.showPreviews) {
        const dayEvents = state.events.filter(e => e.date === dateKey);
        if (dayEvents.length === 1) {
          const preview = document.createElement('div');
          preview.className = 'text-[9px] sm:text-[10px] text-[var(--primary-sage-dark)] truncate font-semibold bg-[var(--primary-sage-light)]/90 px-1 py-0.2 rounded hidden sm:block border border-[var(--primary-sage)]/20';
          preview.textContent = `${dayEvents[0].title}`;
          contentContainer.appendChild(preview);
        } else if (dayEvents.length === 2) {
          dayEvents.slice(0, 2).forEach(ev => {
            const preview = document.createElement('div');
            preview.className = 'text-[8px] sm:text-[9px] text-[var(--primary-sage-dark)] truncate font-semibold bg-[var(--primary-sage-light)]/90 px-1 rounded hidden sm:block border border-[var(--primary-sage)]/20';
            preview.textContent = ev.title;
            contentContainer.appendChild(preview);
          });
        } else if (dayEvents.length > 2) {
          const preview = document.createElement('div');
          preview.className = 'text-[8px] sm:text-[9px] text-[var(--primary-sage-dark)] truncate font-semibold bg-[var(--primary-sage-light)]/90 px-1 rounded hidden sm:block border border-[var(--primary-sage)]/20';
          preview.textContent = dayEvents[0].title;
          contentContainer.appendChild(preview);

          const morePreview = document.createElement('div');
          morePreview.className = 'text-[8px] sm:text-[9px] font-bold text-[var(--primary-sage)] truncate hidden sm:block';
          morePreview.textContent = `+${dayEvents.length - 1} lainnya`;
          contentContainer.appendChild(morePreview);
        }
      }
    }

    cell.appendChild(contentContainer);

    cell.addEventListener('click', () => {
      selectDate(dateKey);
    });

    return cell;
  }

  function selectDate(dateKey) {
    state.selectedDate = dateKey;
    const parsed = parseDateKey(dateKey);
    if (parsed.getMonth() !== state.currentMonth || parsed.getFullYear() !== state.currentYear) {
      state.currentMonth = parsed.getMonth();
      state.currentYear = parsed.getFullYear();
    }
    renderCalendar();
  }

  function updateMonthStats(year, month) {
    const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthEvents = state.events.filter(e => e.date.startsWith(monthPrefix));
    const monthTasks = state.tasks.filter(t => t.date.startsWith(monthPrefix));

    const statEventsEl = document.getElementById('stat-month-events');
    const statTasksEl = document.getElementById('stat-month-tasks');
    if (statEventsEl) statEventsEl.textContent = monthEvents.length;
    if (statTasksEl) statTasksEl.textContent = monthTasks.length;
  }

  // ----------------------------------------------------
  // F. SELECTED DATE DETAILS RENDERING (Events & To-Dos)
  // ----------------------------------------------------
  function renderSelectedDateDetails() {
    const dateKey = state.selectedDate;
    const titleEl = document.getElementById('selected-date-title');
    const holidayEl = document.getElementById('selected-date-holiday');
    const holidayTextEl = document.getElementById('selected-date-holiday-text');
    const statusLabelEl = document.getElementById('selected-date-status-label');
    const statusDotEl = document.getElementById('selected-date-status-dot');

    if (titleEl) {
      titleEl.textContent = formatIndonesianDateFull(dateKey);
    }

    // Holiday banner in bold red
    const holiday = getHolidayInfo(dateKey);
    if (holiday && state.settings.showHolidays) {
      if (holidayEl) holidayEl.classList.remove('hidden');
      if (holidayTextEl) holidayTextEl.textContent = holiday.name;
    } else {
      if (holidayEl) holidayEl.classList.add('hidden');
    }

    // Date status badge
    const currentStatus = getDateStatus(dateKey);
    if (statusLabelEl && statusDotEl) {
      statusDotEl.className = 'w-2 h-2 rounded-full shadow-xs';
      if (currentStatus === 'busy') {
        statusDotEl.classList.add('bg-[#2E7D47]');
        statusLabelEl.textContent = 'Ada Kegiatan';
      } else if (currentStatus === 'free') {
        statusDotEl.classList.add('bg-[#DC2626]'); // True Red
        statusLabelEl.textContent = 'Free / Libur';
      } else if (currentStatus === 'important') {
        statusDotEl.classList.add('bg-[#E5A020]');
        statusLabelEl.textContent = 'Important';
      } else {
        statusDotEl.classList.add('bg-gray-400');
        statusLabelEl.textContent = 'Normal';
      }
    }

    // Events list
    const dayEvents = state.events.filter(e => e.date === dateKey).sort((a, b) => {
      return (a.startTime || '00:00').localeCompare(b.startTime || '00:00');
    });

    const eventsContainer = document.getElementById('selected-events-list');
    const badgeEventsCount = document.getElementById('badge-events-count');
    if (badgeEventsCount) badgeEventsCount.textContent = dayEvents.length;

    if (eventsContainer) {
      eventsContainer.innerHTML = '';
      if (dayEvents.length === 0) {
        eventsContainer.innerHTML = `
          <div class="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-dashed border-[var(--border-subtle)] text-center">
            <div class="text-2xl mb-1">📅</div>
            <p class="text-xs font-bold text-[var(--text-main)]">Belum ada kegiatan hari ini</p>
            <p class="text-[11px] text-[var(--text-muted)] mt-0.5">Jadwal Anda masih kosong untuk tanggal ini.</p>
            <button type="button" class="btn-quick-add-event pressable mt-2 text-xs font-semibold text-[var(--primary-sage)] hover:underline">
              + Tambah Kegiatan
            </button>
          </div>
        `;
        const quickBtn = eventsContainer.querySelector('.btn-quick-add-event');
        if (quickBtn) quickBtn.addEventListener('click', () => openEventModal());
      } else {
        dayEvents.forEach(ev => {
          const card = document.createElement('div');
          card.className = 'p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--border-subtle)] flex items-start justify-between gap-3 group hover:border-[var(--primary-sage)] transition-colors';
          
          const icon = getCategoryIcon(ev.category);
          const timeDisplay = (ev.startTime && ev.endTime) ? `${formatTimeDisplay(ev.startTime)} – ${formatTimeDisplay(ev.endTime)}` : (ev.startTime ? formatTimeDisplay(ev.startTime) : 'Sepanjang hari');

          card.innerHTML = `
            <div class="flex items-start gap-2.5 min-w-0">
              <div class="w-8 h-8 rounded-xl bg-[var(--primary-sage-light)] text-[var(--primary-sage)] flex items-center justify-center shrink-0 text-sm font-bold">
                ${icon}
              </div>
              <div class="min-w-0">
                <h4 class="text-xs sm:text-sm font-bold text-[var(--text-main)] truncate">${escapeHtml(ev.title)}</h4>
                <p class="text-[11px] font-medium text-[var(--text-muted)] flex items-center gap-1.5 mt-0.5">
                  <span>⏰ ${timeDisplay}</span>
                  <span>•</span>
                  <span class="px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/5 text-[10px] font-semibold">${ev.category || 'Umum'}</span>
                </p>
                ${ev.notes ? `<p class="text-[11px] text-[var(--text-muted)] mt-1 line-clamp-2">${escapeHtml(ev.notes)}</p>` : ''}
              </div>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button type="button" data-id="${ev.id}" title="Edit Kegiatan" class="btn-edit-event pressable w-7 h-7 rounded-lg flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text-main)]">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              </button>
              <button type="button" data-id="${ev.id}" title="Hapus Kegiatan" class="btn-delete-event pressable w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-950/20 text-[var(--text-muted)] hover:text-[#DC2626]">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          `;

          card.querySelector('.btn-edit-event').addEventListener('click', () => editEvent(ev.id));
          card.querySelector('.btn-delete-event').addEventListener('click', () => deleteEvent(ev.id));

          eventsContainer.appendChild(card);
        });
      }
    }

    // Tasks list
    const dayTasks = state.tasks.filter(t => t.date === dateKey);
    const tasksContainer = document.getElementById('selected-tasks-list');
    const badgeTasksCount = document.getElementById('badge-tasks-count');
    if (badgeTasksCount) badgeTasksCount.textContent = dayTasks.length;

    if (tasksContainer) {
      tasksContainer.innerHTML = '';
      if (dayTasks.length === 0) {
        tasksContainer.innerHTML = `
          <div class="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-dashed border-[var(--border-subtle)] text-center">
            <div class="text-2xl mb-1">✓</div>
            <p class="text-xs font-bold text-[var(--text-main)]">Belum ada tugas</p>
            <p class="text-[11px] text-[var(--text-muted)] mt-0.5">Tambahkan sesuatu yang ingin kamu selesaikan.</p>
            <button type="button" class="btn-quick-add-task pressable mt-2 text-xs font-semibold text-[var(--primary-sage)] hover:underline">
              + Tambah Task
            </button>
          </div>
        `;
        const quickTaskBtn = tasksContainer.querySelector('.btn-quick-add-task');
        if (quickTaskBtn) quickTaskBtn.addEventListener('click', () => openTaskModal());
      } else {
        dayTasks.forEach(task => {
          const card = renderTaskCard(task);
          tasksContainer.appendChild(card);
        });
      }
    }
  }

  function renderTaskCard(task) {
    const card = document.createElement('div');
    const isDone = task.status === 'done';
    card.className = `p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--border-subtle)] flex items-start justify-between gap-3 group transition-all ${
      isDone ? 'opacity-60 bg-gray-50/50' : 'hover:border-[var(--primary-sage)]'
    }`;

    // Priority badges (Red for high, Yellow for medium, Rich Green for low)
    let priorityBadge = '';
    if (task.priority === 'high') priorityBadge = '<span class="text-[10px] font-bold text-[#DC2626] bg-red-100 dark:bg-red-950/40 px-1.5 py-0.2 rounded-md border border-red-200 dark:border-red-900/30">🔴 High</span>';
    else if (task.priority === 'medium') priorityBadge = '<span class="text-[10px] font-bold text-[#D97706] bg-amber-100 dark:bg-amber-950/40 px-1.5 py-0.2 rounded-md border border-amber-200 dark:border-amber-900/30">🟡 Medium</span>';
    else priorityBadge = '<span class="text-[10px] font-bold text-[#2E7D47] bg-[#E8F5E9] dark:bg-[#183321] px-1.5 py-0.2 rounded-md border border-[#2E7D47]/30">🟢 Low</span>';

    // Status badges
    let statusBadge = '';
    if (task.status === 'todo') statusBadge = '<span class="text-[10px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.2 rounded-md">🔵 To Do</span>';
    else if (task.status === 'process') statusBadge = '<span class="text-[10px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.2 rounded-md">🟡 Process</span>';
    else statusBadge = '<span class="text-[10px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded-md">🟢 Done</span>';

    card.innerHTML = `
      <div class="flex items-start gap-2.5 min-w-0">
        <label class="custom-checkbox relative flex items-center justify-center cursor-pointer mt-0.5 shrink-0">
          <input type="checkbox" ${isDone ? 'checked' : ''} class="sr-only">
          <div class="checkmark-box w-5 h-5 rounded-lg border-2 border-[var(--border-subtle)] flex items-center justify-center transition-all">
            <svg class="w-3 h-3 text-white opacity-0 transform scale-50 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
        </label>

        <div class="min-w-0">
          <p class="text-xs sm:text-sm font-bold text-[var(--text-main)] ${isDone ? 'line-through text-[var(--text-muted)]' : ''} truncate">${escapeHtml(task.title)}</p>
          <div class="flex flex-wrap items-center gap-1.5 mt-1">
            ${priorityBadge}
            ${statusBadge}
            ${task.deadlineTime ? `<span class="text-[10px] text-[var(--text-muted)] font-medium">⏰ ${formatTimeDisplay(task.deadlineTime)}</span>` : ''}
          </div>
          ${task.notes ? `<p class="text-[11px] text-[var(--text-muted)] mt-1 line-clamp-2">${escapeHtml(task.notes)}</p>` : ''}
        </div>
      </div>

      <div class="flex items-center gap-1 shrink-0">
        <select class="task-status-select text-[10px] font-semibold rounded-lg bg-black/5 dark:bg-white/5 border border-[var(--border-subtle)] px-1.5 py-1 text-[var(--text-main)] focus:outline-none">
          <option value="todo" ${task.status === 'todo' ? 'selected' : ''}>To Do</option>
          <option value="process" ${task.status === 'process' ? 'selected' : ''}>Process</option>
          <option value="done" ${task.status === 'done' ? 'selected' : ''}>Done</option>
        </select>
        
        <button type="button" data-id="${task.id}" title="Edit Task" class="btn-edit-task pressable w-7 h-7 rounded-lg flex items-center justify-center hover:bg-black/5 text-[var(--text-muted)] hover:text-[var(--text-main)]">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
        </button>
        <button type="button" data-id="${task.id}" title="Hapus Task" class="btn-delete-task pressable w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 text-[var(--text-muted)] hover:text-[#DC2626]">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    `;

    const checkbox = card.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      toggleTaskDone(task.id, checkbox.checked);
    });

    const statusSelect = card.querySelector('.task-status-select');
    statusSelect.addEventListener('change', (e) => {
      updateTaskStatus(task.id, e.target.value);
    });

    card.querySelector('.btn-edit-task').addEventListener('click', () => editTask(task.id));
    card.querySelector('.btn-delete-task').addEventListener('click', () => deleteTask(task.id));

    return card;
  }

  // ----------------------------------------------------
  // G. ALL TO-DO MANAGER & AGENDA TIMELINE VIEWS
  // ----------------------------------------------------
  function renderMasterTodoList() {
    const container = document.getElementById('master-todo-list');
    if (!container) return;

    let filtered = state.tasks.slice();

    if (state.todoFilter !== 'all') {
      filtered = filtered.filter(t => t.status === state.todoFilter);
    }

    if (state.todoSearch && state.todoSearch.trim() !== '') {
      const q = state.todoSearch.toLowerCase();
      filtered = filtered.filter(t => t.title.toLowerCase().includes(q) || (t.notes && t.notes.toLowerCase().includes(q)));
    }

    filtered.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      const prioMap = { high: 1, medium: 2, low: 3 };
      return (prioMap[a.priority] || 2) - (prioMap[b.priority] || 2);
    });

    container.innerHTML = '';
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="py-10 text-center">
          <div class="text-3xl mb-2">📋</div>
          <p class="text-sm font-bold text-[var(--text-main)]">Tidak ada task yang cocok</p>
          <p class="text-xs text-[var(--text-muted)] mt-1">Coba ubah filter atau kata pencarian Anda.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(task => {
      const card = renderTaskCard(task);
      const dateBadge = document.createElement('span');
      dateBadge.className = 'text-[10px] font-semibold text-[var(--text-muted)] block mt-0.5';
      dateBadge.textContent = `📅 ${formatIndonesianDateFull(task.date)}`;
      card.querySelector('.min-w-0 p').after(dateBadge);
      container.appendChild(card);
    });
  }

  function renderScheduleTimeline() {
    const container = document.getElementById('schedule-agenda-list');
    if (!container) return;

    container.innerHTML = '';

    if (state.events.length === 0) {
      container.innerHTML = `
        <div class="py-10 text-center">
          <div class="text-3xl mb-2">🗓️</div>
          <p class="text-sm font-bold text-[var(--text-main)]">Belum ada agenda kegiatan</p>
          <p class="text-xs text-[var(--text-muted)] mt-1">Tambahkan kegiatan baru untuk melihat timeline Anda.</p>
        </div>
      `;
      return;
    }

    const grouped = {};
    state.events.forEach(ev => {
      if (!grouped[ev.date]) grouped[ev.date] = [];
      grouped[ev.date].push(ev);
    });

    const sortedDates = Object.keys(grouped).sort();

    sortedDates.forEach(dKey => {
      const dayGroup = document.createElement('div');
      dayGroup.className = 'space-y-2';

      const groupHeader = document.createElement('div');
      groupHeader.className = 'flex items-center gap-2 text-xs font-bold text-[var(--primary-sage)] uppercase tracking-wider border-b border-[var(--border-subtle)] pb-1';
      groupHeader.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-[var(--primary-sage)]"></span>
        <span>${formatIndonesianDateFull(dKey)}</span>
      `;
      dayGroup.appendChild(groupHeader);

      grouped[dKey].forEach(ev => {
        const item = document.createElement('div');
        item.className = 'p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--border-subtle)] flex items-start justify-between gap-3';
        const icon = getCategoryIcon(ev.category);
        const timeStr = (ev.startTime && ev.endTime) ? `${formatTimeDisplay(ev.startTime)} – ${formatTimeDisplay(ev.endTime)}` : (ev.startTime || 'Sepanjang hari');

        item.innerHTML = `
          <div class="flex items-start gap-2.5">
            <span class="text-lg">${icon}</span>
            <div>
              <h4 class="text-xs sm:text-sm font-bold text-[var(--text-main)]">${escapeHtml(ev.title)}</h4>
              <p class="text-[11px] text-[var(--text-muted)] font-medium">⏰ ${timeStr} • ${ev.category || 'Umum'}</p>
              ${ev.notes ? `<p class="text-[11px] text-[var(--text-muted)] mt-1">${escapeHtml(ev.notes)}</p>` : ''}
            </div>
          </div>
          <button class="btn-jump-date pressable text-xs font-semibold text-[var(--primary-sage)] hover:underline">
            Lihat di Kalender
          </button>
        `;

        item.querySelector('.btn-jump-date').addEventListener('click', () => {
          selectDate(dKey);
          switchView('view-calendar');
        });

        dayGroup.appendChild(item);
      });

      container.appendChild(dayGroup);
    });
  }

  function updateReminderBadgeAndList() {
    const todayKey = formatDateKey(new Date());
    const upcomingEvents = state.events.filter(e => e.date >= todayKey).slice(0, 5);
    const pendingTasks = state.tasks.filter(t => t.status !== 'done');
    
    const badgeCountEl = document.getElementById('badge-reminder-count');
    const totalAlerts = upcomingEvents.length + pendingTasks.length;
    if (badgeCountEl) {
      if (totalAlerts > 0) {
        badgeCountEl.classList.remove('hidden');
      } else {
        badgeCountEl.classList.add('hidden');
      }
    }

    const listContainer = document.getElementById('reminders-content-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    if (totalAlerts === 0) {
      listContainer.innerHTML = `
        <div class="py-6 text-center text-xs text-[var(--text-muted)]">
          Tidak ada pengingat mendesak saat ini. Semua jadwal lancar! ✨
        </div>
      `;
      return;
    }

    if (pendingTasks.length > 0) {
      const sectionTitle = document.createElement('h4');
      sectionTitle.className = 'text-xs font-bold text-[var(--text-main)] uppercase tracking-wider mb-2';
      sectionTitle.textContent = `🎯 Tugas Belum Selesai (${pendingTasks.length})`;
      listContainer.appendChild(sectionTitle);

      pendingTasks.slice(0, 4).forEach(tsk => {
        const item = document.createElement('div');
        item.className = 'p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--border-subtle)] flex items-center justify-between text-xs';
        item.innerHTML = `
          <div class="min-w-0">
            <p class="font-bold text-[var(--text-main)] truncate">${escapeHtml(tsk.title)}</p>
            <p class="text-[10px] text-[var(--text-muted)]">Deadline: ${formatIndonesianDateFull(tsk.date)}</p>
          </div>
          <button class="pressable px-2 py-1 rounded-lg bg-[var(--primary-sage-light)] text-[var(--primary-sage)] text-[10px] font-bold">Buka</button>
        `;
        item.querySelector('button').addEventListener('click', () => {
          selectDate(tsk.date);
          closeModal(document.getElementById('modal-reminders'));
          switchView('view-calendar');
        });
        listContainer.appendChild(item);
      });
    }
  }

  // ----------------------------------------------------
  // H. EVENT & TASK CRUD LOGIC
  // ----------------------------------------------------
  function openEventModal(eventToEdit = null) {
    const modal = document.getElementById('modal-event');
    const form = document.getElementById('form-event');
    const titleEl = document.getElementById('modal-event-title');
    
    form.reset();

    if (eventToEdit) {
      titleEl.textContent = 'Edit Kegiatan';
      document.getElementById('event-id').value = eventToEdit.id;
      document.getElementById('event-title').value = eventToEdit.title;
      document.getElementById('event-date').value = eventToEdit.date;
      document.getElementById('event-start-time').value = eventToEdit.startTime || '08:00';
      document.getElementById('event-end-time').value = eventToEdit.endTime || '17:00';
      document.getElementById('event-notes').value = eventToEdit.notes || '';
      document.getElementById('event-date-status').value = eventToEdit.status || 'busy';
      
      const catRadio = form.querySelector(`input[name="event-category"][value="${eventToEdit.category}"]`);
      if (catRadio) catRadio.checked = true;
    } else {
      titleEl.textContent = 'Tambah Kegiatan';
      document.getElementById('event-id').value = '';
      document.getElementById('event-date').value = state.selectedDate || formatDateKey(new Date());
      document.getElementById('event-start-time').value = '08:00';
      document.getElementById('event-end-time').value = '17:00';
      document.getElementById('event-date-status').value = 'busy';
    }

    showModal(modal);
  }

  function handleSaveEvent(e) {
    e.preventDefault();
    const id = document.getElementById('event-id').value;
    const title = document.getElementById('event-title').value.trim();
    const date = document.getElementById('event-date').value;
    const startTime = document.getElementById('event-start-time').value;
    const endTime = document.getElementById('event-end-time').value;
    const notes = document.getElementById('event-notes').value.trim();
    const dateStatus = document.getElementById('event-date-status').value;
    const category = document.querySelector('input[name="event-category"]:checked')?.value || 'Lainnya';

    if (!title || !date) {
      showToast('Harap lengkapi nama kegiatan dan tanggal!', 'error');
      return;
    }

    if (id) {
      const idx = state.events.findIndex(ev => ev.id === id);
      if (idx !== -1) {
        state.events[idx] = {
          ...state.events[idx],
          title,
          date,
          startTime,
          endTime,
          category,
          notes,
          status: dateStatus
        };
        showToast('Kegiatan berhasil diperbarui! ✨');
      }
    } else {
      const newEvent = {
        id: 'ev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        title,
        date,
        startTime,
        endTime,
        category,
        notes,
        status: dateStatus,
        createdAt: Date.now()
      };
      state.events.push(newEvent);
      showToast('Kegiatan berhasil ditambahkan! 📅');
    }

    if (dateStatus && dateStatus !== 'normal') {
      state.dayStatuses[date] = dateStatus;
    }

    saveData();
    closeModal(document.getElementById('modal-event'));
    selectDate(date);
    renderCalendar();
    renderScheduleTimeline();
    updateReminderBadgeAndList();
  }

  function editEvent(id) {
    const ev = state.events.find(e => e.id === id);
    if (ev) openEventModal(ev);
  }

  function deleteEvent(id) {
    openConfirmDialog(
      'Hapus Kegiatan',
      'Apakah Anda yakin ingin menghapus kegiatan ini dari kalender?',
      () => {
        state.events = state.events.filter(e => e.id !== id);
        saveData();
        renderCalendar();
        renderScheduleTimeline();
        updateReminderBadgeAndList();
        showToast('Kegiatan telah dihapus.');
      }
    );
  }

  // ----------------- TO-DO CRUD -----------------
  function openTaskModal(taskToEdit = null) {
    const modal = document.getElementById('modal-task');
    const form = document.getElementById('form-task');
    const titleEl = document.getElementById('modal-task-title');
    
    form.reset();

    if (taskToEdit) {
      titleEl.textContent = 'Edit To-Do Task';
      document.getElementById('task-id').value = taskToEdit.id;
      document.getElementById('task-title').value = taskToEdit.title;
      document.getElementById('task-date').value = taskToEdit.date;
      document.getElementById('task-time').value = taskToEdit.deadlineTime || '23:59';
      document.getElementById('task-notes').value = taskToEdit.notes || '';
      
      const prioRadio = form.querySelector(`input[name="task-priority"][value="${taskToEdit.priority}"]`);
      if (prioRadio) prioRadio.checked = true;

      const statusRadio = form.querySelector(`input[name="task-status"][value="${taskToEdit.status}"]`);
      if (statusRadio) statusRadio.checked = true;
    } else {
      titleEl.textContent = 'Tambah To-Do Task';
      document.getElementById('task-id').value = '';
      document.getElementById('task-date').value = state.selectedDate || formatDateKey(new Date());
      document.getElementById('task-time').value = '23:59';
    }

    showModal(modal);
  }

  function handleSaveTask(e) {
    e.preventDefault();
    const id = document.getElementById('task-id').value;
    const title = document.getElementById('task-title').value.trim();
    const date = document.getElementById('task-date').value;
    const deadlineTime = document.getElementById('task-time').value;
    const notes = document.getElementById('task-notes').value.trim();
    const priority = document.querySelector('input[name="task-priority"]:checked')?.value || 'medium';
    const status = document.querySelector('input[name="task-status"]:checked')?.value || 'todo';

    if (!title || !date) {
      showToast('Harap lengkapi nama task dan tanggal deadline!', 'error');
      return;
    }

    if (id) {
      const idx = state.tasks.findIndex(t => t.id === id);
      if (idx !== -1) {
        state.tasks[idx] = {
          ...state.tasks[idx],
          title,
          date,
          deadlineTime,
          priority,
          status,
          notes
        };
        showToast('Task berhasil diperbarui! ✨');
      }
    } else {
      const newTask = {
        id: 'tsk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        title,
        date,
        deadlineTime,
        priority,
        status,
        notes,
        createdAt: Date.now()
      };
      state.tasks.push(newTask);
      showToast('Task berhasil ditambahkan! ✓');
    }

    saveData();
    closeModal(document.getElementById('modal-task'));
    selectDate(date);
    renderCalendar();
    renderMasterTodoList();
    updateReminderBadgeAndList();
  }

  function editTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if (task) openTaskModal(task);
  }

  function deleteTask(id) {
    openConfirmDialog(
      'Hapus Task',
      'Apakah Anda yakin ingin menghapus task ini?',
      () => {
        state.tasks = state.tasks.filter(t => t.id !== id);
        saveData();
        renderCalendar();
        renderMasterTodoList();
        updateReminderBadgeAndList();
        showToast('Task telah dihapus.');
      }
    );
  }

  function toggleTaskDone(id, isDone) {
    const task = state.tasks.find(t => t.id === id);
    if (task) {
      task.status = isDone ? 'done' : 'todo';
      saveData();
      renderCalendar();
      renderMasterTodoList();
      updateReminderBadgeAndList();
    }
  }

  function updateTaskStatus(id, newStatus) {
    const task = state.tasks.find(t => t.id === id);
    if (task) {
      task.status = newStatus;
      saveData();
      renderCalendar();
      renderMasterTodoList();
      updateReminderBadgeAndList();
    }
  }

  // ----------------------------------------------------
  // I. DATE STATUS CUSTOMIZER
  // ----------------------------------------------------
  function openDateStatusModal() {
    const modal = document.getElementById('modal-date-status');
    const subtitle = document.getElementById('modal-date-status-subtitle');
    if (subtitle) subtitle.textContent = formatIndonesianDateFull(state.selectedDate);
    showModal(modal);
  }

  function setDateStatus(newStatus) {
    if (newStatus === 'normal') {
      delete state.dayStatuses[state.selectedDate];
    } else {
      state.dayStatuses[state.selectedDate] = newStatus;
    }
    saveData();
    closeModal(document.getElementById('modal-date-status'));
    renderCalendar();
    showToast(`Status tanggal berhasil diatur!`);
  }

  // ----------------------------------------------------
  // J. MONTH-YEAR JUMP PICKER
  // ----------------------------------------------------
  function openMonthPickerModal() {
    state.pickerYear = state.currentYear;
    renderMonthPickerGrid();
    showModal(document.getElementById('modal-month-picker'));
  }

  function renderMonthPickerGrid() {
    const yearSpan = document.getElementById('picker-current-year');
    if (yearSpan) yearSpan.textContent = state.pickerYear;

    const grid = document.getElementById('picker-months-grid');
    if (!grid) return;
    grid.innerHTML = '';

    MONTH_NAMES.forEach((mName, idx) => {
      const btn = document.createElement('button');
      const isSelected = (state.pickerYear === state.currentYear && idx === state.currentMonth);
      btn.className = `pressable py-2 px-1 text-xs font-semibold rounded-xl text-center transition-all ${
        isSelected ? 'bg-[var(--primary-sage)] text-white' : 'bg-black/5 dark:bg-white/5 text-[var(--text-main)] hover:bg-black/10'
      }`;
      btn.textContent = mName.substr(0, 3);
      btn.addEventListener('click', () => {
        state.currentYear = state.pickerYear;
        state.currentMonth = idx;
        closeModal(document.getElementById('modal-month-picker'));
        renderCalendar();
      });
      grid.appendChild(btn);
    });
  }

  // ----------------------------------------------------
  // K. BACKUP & DATA IMPORT / EXPORT / RESET
  // ----------------------------------------------------
  function exportDataJSON() {
    const exportObject = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      events: state.events,
      tasks: state.tasks,
      dayStatuses: state.dayStatuses,
      settings: state.settings
    };

    const jsonStr = JSON.stringify(exportObject, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendar-backup-${formatDateKey(new Date())}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Data berhasil diexport ke file JSON! 💾');
  }

  function importDataJSON(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result);
        if (Array.isArray(data.events) || Array.isArray(data.tasks)) {
          state.events = data.events || [];
          state.tasks = data.tasks || [];
          state.dayStatuses = data.dayStatuses || {};
          if (data.settings) {
            state.settings = Object.assign(state.settings, data.settings);
            applyTheme();
          }
          saveData();
          renderCalendar();
          renderMasterTodoList();
          renderScheduleTimeline();
          updateReminderBadgeAndList();
          showToast('Data berhasil diimpor dengan sempurna! 🎉');
        } else {
          showToast('Format file JSON tidak valid.', 'error');
        }
      } catch (err) {
        console.error('Import error:', err);
        showToast('Gagal membaca file JSON.', 'error');
      }
    };
    reader.readAsText(file);
  }

  function resetAllData() {
    openConfirmDialog(
      'Hapus Semua Data',
      'Apakah Anda yakin ingin menghapus semua data? Semua kegiatan dan to-do akan dihapus permanen dari browser.',
      () => {
        state.events = [];
        state.tasks = [];
        state.dayStatuses = {};
        saveData();
        renderCalendar();
        renderMasterTodoList();
        renderScheduleTimeline();
        updateReminderBadgeAndList();
        showToast('Semua data berhasil dibersihkan.');
      }
    );
  }

  function loadSampleData() {
    state.events = JSON.parse(JSON.stringify(INITIAL_SAMPLE_EVENTS));
    state.tasks = JSON.parse(JSON.stringify(INITIAL_SAMPLE_TASKS));
    state.dayStatuses = {};
    saveData();
    renderCalendar();
    renderMasterTodoList();
    renderScheduleTimeline();
    updateReminderBadgeAndList();
    showToast('Data contoh rencana berhasil dimuat! ✨');
  }

  // ----------------------------------------------------
  // L. MODAL & CONFIRMATION HELPERS
  // ----------------------------------------------------
  let confirmCallback = null;

  function openConfirmDialog(title, message, onConfirm) {
    const modal = document.getElementById('modal-confirm');
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    confirmCallback = onConfirm;
    showModal(modal);
  }

  function showModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('hidden');
    requestAnimationFrame(() => {
      modalEl.classList.remove('opacity-0');
      const panel = modalEl.querySelector('div');
      if (panel) {
        panel.classList.remove('translate-y-full', 'scale-95');
      }
    });
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('opacity-0');
    const panel = modalEl.querySelector('div');
    if (panel) {
      panel.classList.add('translate-y-full', 'scale-95');
    }
    setTimeout(() => {
      modalEl.classList.add('hidden');
    }, 200);
  }

  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `pressable px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold text-white pointer-events-auto fade-in ${
      type === 'error' ? 'bg-[#DC2626]' : 'bg-[#2E7D47]'
    }`;

    const icon = type === 'error' ? '⚠️' : '✓';
    toast.innerHTML = `<span>${icon}</span><span class="flex-1">${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 2800);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ----------------------------------------------------
  // M. VIEW NAVIGATION
  // ----------------------------------------------------
  function switchView(targetId) {
    state.activeView = targetId;

    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.add('hidden');
    });

    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.remove('hidden');
      targetPanel.classList.add('fade-in');
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
      if (btn.dataset.target === targetId) {
        btn.classList.add('text-[var(--primary-sage)]', 'font-semibold');
        btn.classList.remove('text-[var(--text-muted)]');
      } else {
        btn.classList.remove('text-[var(--primary-sage)]', 'font-semibold');
        btn.classList.add('text-[var(--text-muted)]');
      }
    });

    document.querySelectorAll('.drawer-nav-btn').forEach(btn => {
      if (btn.dataset.target === targetId) {
        btn.classList.add('bg-[var(--primary-sage-light)]', 'text-[var(--primary-sage)]');
        btn.classList.remove('text-[var(--text-muted)]');
      } else {
        btn.classList.remove('bg-[var(--primary-sage-light)]', 'text-[var(--primary-sage)]');
        btn.classList.add('text-[var(--text-muted)]');
      }
    });

    if (targetId === 'view-calendar') renderCalendar();
    if (targetId === 'view-todo') renderMasterTodoList();
    if (targetId === 'view-schedule') renderScheduleTimeline();
  }

  // ----------------------------------------------------
  // N. EVENT LISTENERS INITIALIZATION
  // ----------------------------------------------------
  function initListeners() {
    document.getElementById('btn-prev-month').addEventListener('click', () => {
      state.currentMonth--;
      if (state.currentMonth < 0) {
        state.currentMonth = 11;
        state.currentYear--;
      }
      renderCalendar();
    });

    document.getElementById('btn-next-month').addEventListener('click', () => {
      state.currentMonth++;
      if (state.currentMonth > 11) {
        state.currentMonth = 0;
        state.currentYear++;
      }
      renderCalendar();
    });

    const handleTodayClick = () => {
      const now = new Date();
      state.currentYear = now.getFullYear();
      state.currentMonth = now.getMonth();
      state.selectedDate = formatDateKey(now);
      renderCalendar();
    };

    document.getElementById('btn-today-pill').addEventListener('click', handleTodayClick);
    const headerTodayBtn = document.getElementById('btn-quick-today-header');
    if (headerTodayBtn) headerTodayBtn.addEventListener('click', handleTodayClick);

    document.getElementById('btn-title-picker').addEventListener('click', openMonthPickerModal);
    document.getElementById('picker-prev-year').addEventListener('click', () => {
      state.pickerYear--;
      renderMonthPickerGrid();
    });
    document.getElementById('picker-next-year').addEventListener('click', () => {
      state.pickerYear++;
      renderMonthPickerGrid();
    });

    document.getElementById('btn-open-reminders').addEventListener('click', () => {
      updateReminderBadgeAndList();
      showModal(document.getElementById('modal-reminders'));
    });

    const drawerEl = document.getElementById('drawer-menu');
    document.getElementById('btn-open-sidebar').addEventListener('click', () => {
      drawerEl.classList.remove('hidden');
      requestAnimationFrame(() => {
        drawerEl.classList.remove('opacity-0');
        drawerEl.querySelector('div').classList.remove('-translate-x-full');
      });
    });

    const closeDrawer = () => {
      drawerEl.classList.add('opacity-0');
      drawerEl.querySelector('div').classList.add('-translate-x-full');
      setTimeout(() => drawerEl.classList.add('hidden'), 200);
    };
    document.getElementById('btn-close-drawer').addEventListener('click', closeDrawer);
    drawerEl.addEventListener('click', (e) => {
      if (e.target === drawerEl) closeDrawer();
    });

    document.querySelectorAll('.drawer-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchView(btn.dataset.target);
        closeDrawer();
      });
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchView(btn.dataset.target);
      });
    });

    document.getElementById('btn-change-date-status').addEventListener('click', openDateStatusModal);
    document.getElementById('btn-quick-status-pop').addEventListener('click', openDateStatusModal);

    document.querySelectorAll('.btn-set-status').forEach(btn => {
      btn.addEventListener('click', () => {
        setDateStatus(btn.dataset.status);
      });
    });

    document.getElementById('btn-add-event-day').addEventListener('click', () => openEventModal());
    document.getElementById('btn-add-task-day').addEventListener('click', () => openTaskModal());
    document.getElementById('btn-add-task-global').addEventListener('click', () => openTaskModal());
    document.getElementById('btn-add-event-global').addEventListener('click', () => openEventModal());

    document.getElementById('form-event').addEventListener('submit', handleSaveEvent);
    document.getElementById('form-task').addEventListener('submit', handleSaveTask);

    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.fixed');
        if (modal) closeModal(modal);
      });
    });

    ['modal-event', 'modal-task', 'modal-date-status', 'modal-month-picker', 'modal-reminders', 'modal-confirm'].forEach(id => {
      const m = document.getElementById(id);
      if (m) {
        m.addEventListener('click', (e) => {
          if (e.target === m) closeModal(m);
        });
      }
    });

    document.getElementById('btn-confirm-cancel').addEventListener('click', () => {
      closeModal(document.getElementById('modal-confirm'));
      confirmCallback = null;
    });

    document.getElementById('btn-confirm-action').addEventListener('click', () => {
      if (typeof confirmCallback === 'function') {
        confirmCallback();
      }
      closeModal(document.getElementById('modal-confirm'));
      confirmCallback = null;
    });

    const todoSearchInput = document.getElementById('todo-search-input');
    if (todoSearchInput) {
      todoSearchInput.addEventListener('input', (e) => {
        state.todoSearch = e.target.value;
        renderMasterTodoList();
      });
    }

    document.querySelectorAll('#todo-status-tabs .todo-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#todo-status-tabs .todo-tab').forEach(t => {
          t.classList.remove('bg-[var(--primary-sage)]', 'text-white', 'active');
          t.classList.add('bg-black/5', 'dark:bg-white/5', 'text-[var(--text-muted)]');
        });
        tab.classList.add('bg-[var(--primary-sage)]', 'text-white', 'active');
        tab.classList.remove('bg-black/5', 'dark:bg-white/5', 'text-[var(--text-muted)]');
        state.todoFilter = tab.dataset.filter;
        renderMasterTodoList();
      });
    });

    const settingStartDay = document.getElementById('setting-start-day');
    if (settingStartDay) {
      settingStartDay.value = String(state.settings.startDay);
      settingStartDay.addEventListener('change', (e) => {
        state.settings.startDay = parseInt(e.target.value, 10);
        saveData();
        renderCalendar();
      });
    }

    const settingHolidays = document.getElementById('setting-show-holidays');
    if (settingHolidays) {
      settingHolidays.checked = state.settings.showHolidays;
      settingHolidays.addEventListener('change', (e) => {
        state.settings.showHolidays = e.target.checked;
        saveData();
        renderCalendar();
      });
    }

    const settingStatusDots = document.getElementById('setting-show-status-dots');
    if (settingStatusDots) {
      settingStatusDots.checked = state.settings.showStatusDots;
      settingStatusDots.addEventListener('change', (e) => {
        state.settings.showStatusDots = e.target.checked;
        saveData();
        renderCalendar();
      });
    }

    const settingPreviews = document.getElementById('setting-show-previews');
    if (settingPreviews) {
      settingPreviews.checked = state.settings.showPreviews;
      settingPreviews.addEventListener('change', (e) => {
        state.settings.showPreviews = e.target.checked;
        saveData();
        renderCalendar();
      });
    }

    const settingDarkMode = document.getElementById('setting-dark-mode');
    if (settingDarkMode) {
      settingDarkMode.checked = state.settings.darkMode;
      settingDarkMode.addEventListener('change', (e) => {
        state.settings.darkMode = e.target.checked;
        applyTheme();
        saveData();
      });
    }

    document.getElementById('btn-export-data').addEventListener('click', exportDataJSON);
    document.getElementById('import-file-input').addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        importDataJSON(e.target.files[0]);
        e.target.value = '';
      }
    });
    document.getElementById('btn-trigger-reset').addEventListener('click', resetAllData);
    document.getElementById('btn-load-sample').addEventListener('click', loadSampleData);
  }

  // ----------------------------------------------------
  // O. PWA SERVICE WORKER REGISTRATION
  // ----------------------------------------------------
  function registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('./service-worker.js')
        .then(reg => console.log('Service Worker registered successfully:', reg.scope))
        .catch(err => console.log('Service Worker registration skipped or failed:', err));
    }
  }

  // ----------------------------------------------------
  // P. INITIALIZATION
  // ----------------------------------------------------
  function init() {
    loadData();
    initListeners();
    renderCalendar();
    updateReminderBadgeAndList();
    registerServiceWorker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
