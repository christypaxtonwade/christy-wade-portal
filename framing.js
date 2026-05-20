/* ─────────────────────────────────────────────────────────────
   FRAMING — small client-side interactions shared across pages
   Linked from each page via:
     <script src="/framing.js" defer></script>

   Currently handles:
   - Library dropdown toggle (click trigger, click-outside-to-close, Esc to close)
   ───────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  function initLibraryDropdown() {
    var trigger = document.querySelector('.nav-dropdown-trigger');
    var panel = document.querySelector('.nav-dropdown-panel');
    if (!trigger || !panel) return;

    function open() {
      panel.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
    function close() {
      panel.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function toggle() {
      if (panel.classList.contains('open')) close();
      else open();
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle();
    });

    // Click outside to close
    document.addEventListener('click', function (e) {
      if (!panel.contains(e.target) && e.target !== trigger) close();
    });

    // Escape key to close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        close();
        trigger.focus();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLibraryDropdown);
  } else {
    initLibraryDropdown();
  }
})();
