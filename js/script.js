// Future Foresight — Interactions & Animations

(function () {
  'use strict';

  // ── Modals ──────────────────────────────────────────────

  document.querySelectorAll('.steep-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-modal');
      var modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        var closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
      }
    });
  });

  document.querySelectorAll('.modal-close').forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeModal(btn.closest('.modal-overlay'));
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var openModal = document.querySelector('.modal-overlay.is-open');
      if (openModal) closeModal(openModal);
    }
  });

  function closeModal(overlay) {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // ── Smooth scroll ────────────────────────────────────────

  var scrollArrow = document.querySelector('.hero-scroll-arrow');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(scrollArrow.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── Animations ───────────────────────────────────────────
  // .js-ready on body enables all CSS animations/transitions.
  // Content is visible by default (no animation CSS fires without .js-ready),
  // so the page never appears blank if JS is slow or disabled.

  function initAnimations() {
    document.body.classList.add('js-ready');

    if (!('IntersectionObserver' in window)) return;

    // Context headings: each .context-col reveals with a stagger
    var contextCols = document.querySelectorAll('.context-col');
    var colObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('is-visible');
          });
          colObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    contextCols.forEach(function (col, index) {
      // Mark all headings and bodies inside this col as reveal targets
      col.querySelectorAll('.context-heading, .context-body').forEach(function (el, i) {
        el.classList.add('reveal');
        // Stagger within the col: each element delays 80ms more than the previous
        el.style.transitionDelay = ((index * 0.1) + (i * 0.08)) + 's';
      });
      colObserver.observe(col);
    });

    // STEEP letters: observe the container, add is-visible to trigger stagger
    var steepLetters = document.querySelector('.steep-letters');
    if (steepLetters) {
      var steepObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            steepLetters.classList.add('is-visible');
            steepObserver.unobserve(steepLetters);
          }
        });
      }, { threshold: 0.25 });
      steepObserver.observe(steepLetters);
    }

    // WHY heading and instruction text in STEEP section
    var steepInnerEls = document.querySelectorAll('.steep-why, .steep-instruction');
    var steepSectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          steepSectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    steepInnerEls.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i * 0.1) + 's';
      steepSectionObserver.observe(el);
    });
  }

  // Run after layout is stable
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

})();
