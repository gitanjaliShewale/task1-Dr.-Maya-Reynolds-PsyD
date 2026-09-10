/**
 * Dr. Maya Reynolds, PsyD — Homepage Interactivity & Grounding Tools
 */

// ==========================================================================
// 1. Interactive 4-4-4-4 Box Breathing Engine
// ==========================================================================
const breathingPhases = [
  { name: 'Inhale Gently', duration: 4, className: 'inhale' },
  { name: 'Hold & Settle', duration: 4, className: 'hold' },
  { name: 'Exhale Slowly', duration: 4, className: 'exhale' },
  { name: 'Rest in Stillness', duration: 4, className: 'rest' }
];

let currentPhaseIndex = 0;
let secondsRemaining = 4;
let breathingInterval = null;
let isBreathingActive = true;

const breathVisual = document.getElementById('breathVisual');
const breathText = document.getElementById('breathText');
const breathTimer = document.getElementById('breathTimer');
const breathToggleBtn = document.getElementById('breathToggleBtn');

function updateBreathingCycle() {
  if (!isBreathingActive || !breathVisual) return;

  const currentPhase = breathingPhases[currentPhaseIndex];
  breathText.textContent = currentPhase.name;
  breathTimer.textContent = `${secondsRemaining}s`;

  // Update visual scale/classes
  breathVisual.className = `breath-visual ${currentPhase.className}`;

  secondsRemaining--;

  if (secondsRemaining < 0) {
    currentPhaseIndex = (currentPhaseIndex + 1) % breathingPhases.length;
    secondsRemaining = breathingPhases[currentPhaseIndex].duration;
  }
}

function startBreathing() {
  if (breathingInterval) clearInterval(breathingInterval);
  updateBreathingCycle();
  breathingInterval = setInterval(updateBreathingCycle, 1000);
}

function toggleBreathing() {
  isBreathingActive = !isBreathingActive;
  if (isBreathingActive) {
    breathToggleBtn.textContent = 'Pause Pacer';
    startBreathing();
  } else {
    breathToggleBtn.textContent = 'Resume Pacer';
    if (breathingInterval) clearInterval(breathingInterval);
    breathText.textContent = 'Paused';
    breathTimer.textContent = '—';
    if (breathVisual) breathVisual.className = 'breath-visual';
  }
}

// ==========================================================================
// 2. Consultation Modal Logic
// ==========================================================================
const consultModal = document.getElementById('consultModal');
const modalFormContainer = document.getElementById('modalFormContainer');
const modalSuccessContainer = document.getElementById('modalSuccessContainer');
const primaryConcernSelect = document.getElementById('primaryConcern');

function openConsultModal() {
  if (!consultModal) return;
  consultModal.classList.add('open');
  consultModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeConsultModal() {
  if (!consultModal) return;
  consultModal.classList.remove('open');
  consultModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  
  // Reset success state after closing
  setTimeout(() => {
    if (modalFormContainer) modalFormContainer.style.display = 'block';
    if (modalSuccessContainer) modalSuccessContainer.style.display = 'none';
  }, 400);
}

function openConsultWithFocus(serviceName) {
  openConsultModal();
  if (!primaryConcernSelect) return;

  if (serviceName.includes('Anxiety')) {
    primaryConcernSelect.value = 'anxiety';
  } else if (serviceName.includes('Trauma') || serviceName.includes('EMDR')) {
    primaryConcernSelect.value = 'trauma';
  } else if (serviceName.includes('Burnout')) {
    primaryConcernSelect.value = 'burnout';
  }
}

// Close modal when clicking outside of card or pressing Escape key
if (consultModal) {
  consultModal.addEventListener('click', (e) => {
    if (e.target === consultModal) {
      closeConsultModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && consultModal && consultModal.classList.contains('open')) {
    closeConsultModal();
  }
});

function handleConsultSubmit(event) {
  event.preventDefault();
  
  // Simulate graceful asynchronous submission
  const submitBtn = event.target.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.textContent = 'Sending with care...';
    submitBtn.disabled = true;
  }

  setTimeout(() => {
    if (modalFormContainer && modalSuccessContainer) {
      modalFormContainer.style.display = 'none';
      modalSuccessContainer.style.display = 'block';
      event.target.reset();
      if (submitBtn) {
        submitBtn.textContent = 'Request Free 15-Minute Consultation';
        submitBtn.disabled = false;
      }
    }
  }, 700);
}

// ==========================================================================
// 3. FAQ Accordion
// ==========================================================================
function initFaqAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.parentElement;
      const isOpen = parentItem.classList.contains('active');

      // Close other open accordions for clean UX
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        const btn = item.querySelector('.accordion-header');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        parentItem.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ==========================================================================
// 4. Mobile Menu Navigation
// ==========================================================================
function initMobileNav() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (!mobileToggle || !navMenu) return;

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-active');
  });

  // Close menu when clicking any nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-active');
    });
  });
}

// ==========================================================================
// 5. Header Scroll Dynamics
// ==========================================================================
function initHeaderScroll() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 6px 20px rgba(32, 41, 36, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  startBreathing();
  initFaqAccordion();
  initMobileNav();
  initHeaderScroll();
});
