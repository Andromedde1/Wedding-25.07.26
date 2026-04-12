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
    var moodGroup = document.getElementById('mood-group');
    if (!coming || !moodGroup) return;

    coming.addEventListener('change', function () {
      if (this.value === 'yes') {
        moodGroup.classList.add('form-group-visible');
        moodGroup.classList.remove('form-group-hidden');
      } else {
        moodGroup.classList.remove('form-group-visible');
        moodGroup.classList.add('form-group-hidden');
      }
    });

    var form = document.getElementById('rsvp-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      /* Форма отправляется на Formspree */
    });
  }

  initDeviceSwitcher();
  renderCalendar();
  updateCountdown();
  setInterval(updateCountdown, 1000);
  initRsvp();
})();
