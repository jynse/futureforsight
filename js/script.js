// Future Foresight — Modal interactions

(function () {
  'use strict';

  // Open modal
  document.querySelectorAll('.steep-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-modal');
      var modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        // Focus close button for accessibility
        var closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
      }
    });
  });

  // Close modal via × button
  document.querySelectorAll('.modal-close').forEach(function (btn) {
    btn.addEventListener('click', function () {
      closeModal(btn.closest('.modal-overlay'));
    });
  });

  // Close modal by clicking the backdrop
  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close modal with Escape key
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

  // Smooth scroll for hero arrow
  var scrollArrow = document.querySelector('.hero-scroll-arrow');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(scrollArrow.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }
})();
