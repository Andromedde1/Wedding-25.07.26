(function () {
  'use strict';
  // --- Переключатель вид: телефон / компьютер ---
  function initDeviceSwitcher() {
    var body = document.body;
    var btns = document.querySelectorAll('.device-btn');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = this.getAttribute('data-view');
        btns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        body.classList.remove('viewport-phone', 'viewport-desktop');
        body.classList.add(view === 'phone' ? 'viewport-phone' : 'viewport-desktop');
      });
    });
  }

  function detectDevice() {
    var body = document.body;
    var btns = document.querySelectorAll('.device-btn');
  
    var isPhone = window.innerWidth <= 768;
    var view = isPhone ? 'phone' : 'desktop';
  
    body.classList.remove('viewport-phone', 'viewport-desktop');
    body.classList.add(view === 'phone' ? 'viewport-phone' : 'viewport-desktop');
  
    btns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-view') === view);
    });
  }

  // --- Календарь: июль 2026, дата 25 в сердечке ---
  function renderCalendar() {
    var year = 2026;
    var month = 6;
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var startWeekday = firstDay.getDay();
    var offset = startWeekday === 0 ? 6 : startWeekday - 1;
    var daysInMonth = lastDay.getDate();
    var prevMonth = new Date(year, month, 0);
    var daysPrev = prevMonth.getDate();

    var grid = document.getElementById('calendar-days');
    if (!grid) return;

    grid.innerHTML = '';

    for (var i = 0; i < offset; i++) {
      var d = daysPrev - offset + i + 1;
      var cell = document.createElement('div');
      cell.className = 'day other-month';
      cell.textContent = d;
      grid.appendChild(cell);
    }

    for (var j = 1; j <= daysInMonth; j++) {
      var cell = document.createElement('div');
      cell.className = 'day';
      if (j === 25) cell.classList.add('wedding-date');
      cell.textContent = j;
      grid.appendChild(cell);
    }

    var total = offset + daysInMonth;
    var next = 1;
    while (total % 7 !== 0) {
      var cell = document.createElement('div');
      cell.className = 'day other-month';
      cell.textContent = next++;
      grid.appendChild(cell);
      total++;
    }
  }

  function updateCountdown() {
    var now = new Date();
    var end = new Date(2026, 6, 25, 0, 0, 0);
    var diff = end - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '0';
      document.getElementById('hours').textContent = '0';
      document.getElementById('minutes').textContent = '0';
      document.getElementById('seconds').textContent = '0';
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  function initRsvp() {
    var coming = document.getElementById('coming');
    var whenYes = document.getElementById('rsvp-when-yes');
    var childrenSel = document.getElementById('children');
    var childrenExtra = document.getElementById('children-extra');
    var companionSel = document.getElementById('companionship');
    var partnerExtra = document.getElementById('partner-extra');
    if (!coming || !whenYes) return;

    function setHidden(el, hidden) {
      if (!el) return;
      if (hidden) {
        el.classList.add('form-group-hidden');
        el.classList.remove('form-group-visible');
      } else {
        el.classList.remove('form-group-hidden');
        el.classList.add('form-group-visible');
      }
    }

    function setDisabledDeep(root, disabled) {
      if (!root) return;
      root.querySelectorAll('input, select, textarea').forEach(function (field) {
        field.disabled = !!disabled;
      });
    }

    function syncRsvp() {
      if (coming.value !== 'yes') {
        setHidden(whenYes, true);
        setDisabledDeep(whenYes, true);
        return;
      }

      setHidden(whenYes, false);
      childrenSel.disabled = false;
      companionSel.disabled = false;

      var showKids = childrenSel.value === 'with_kids';
      setHidden(childrenExtra, !showKids);
      setDisabledDeep(childrenExtra, !showKids);

      var showPartner = companionSel.value === 'with_partner';
      setHidden(partnerExtra, !showPartner);
      setDisabledDeep(partnerExtra, !showPartner);
    }

    coming.addEventListener('change', syncRsvp);
    childrenSel.addEventListener('change', syncRsvp);
    companionSel.addEventListener('change', syncRsvp);

    syncRsvp();

    var form = document.getElementById('rsvp-form');
    if (!form) return;
    form.addEventListener('submit', function () {
      /* Formspree */
    });
  }

  initDeviceSwitcher();
  renderCalendar();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  initRsvp();
  detectDevice();
  window.addEventListener('resize', detectDevice);
})();
