import gsap from 'gsap';
import confetti from 'canvas-confetti';

/* ==========================================================================
   NewgenONE — Santa's Secret AI Mission (GSAP + canvas-confetti)
   - Page 1 (#page-home): Santa Hero + Workshop + 3rd Section Registration Form
   - Page 2 (#page-mission): Direct 5-Question Flow -> Simple Thank You Page
   - Montserrat-only typography, zero blue buttons, mobile-first interactions
   ========================================================================== */

const INTEGRATION_CONFIG = {
  crmDestinationPlaceholder: 'CONFIGURABLE_CRM_ENDPOINT_PLACEHOLDER',
  marketingAutomationPlaceholder: 'CONFIGURABLE_MARKETING_AUTOMATION_HOOK',
  analyticsProviderPlaceholder: 'CONFIGURABLE_ANALYTICS_ADAPTER',
};

const CHALLENGES = [
  {
    id: 'dispatch-banking',
    parcelNumber: 1,
    domain: 'Banking',
    scenarioTitle: 'The Year-End Credit Surge',
    scenarioBody:
      'A commercial bank faces a three-week backlog in business credit reviews during its peak lending quarter. Relationship managers want rapid turnaround for qualified borrowers, while risk committees require clear, auditable reasoning behind every approval or decline.',
    promptQuestion:
      'Which enterprise capability accelerates credit decisions without sacrificing regulatory explainability?',
    options: [
      {
        id: 'bank-a',
        label: 'A',
        text: 'Distributing PDF spreadsheets across regional underwriting inboxes',
        isCorrect: false,
        wrongFeedback:
          'Passing spreadsheets by email adds manual handoffs and hides decision trails from auditors.',
      },
      {
        id: 'bank-b',
        label: 'B',
        text: 'An autonomous Credit Decisioning Agent that evaluates risk signals with transparent audit trails',
        isCorrect: true,
        wrongFeedback: '',
      },
      {
        id: 'bank-c',
        label: 'C',
        text: 'Replacing credit policy reviews with generic promotional SMS alerts',
        isCorrect: false,
        wrongFeedback:
          'Customer messaging helps outreach, but it does not analyze financial statements or underwriting risk.',
      },
      {
        id: 'bank-d',
        label: 'D',
        text: 'Archiving closed loan folders in cold storage at the end of each quarter',
        isCorrect: false,
        wrongFeedback:
          'Post-hoc archiving improves recordkeeping later, yet leaves active borrowers waiting in the queue.',
      },
    ],
    hint: 'Look for an intelligent capability built specifically to assess credit risk rapidly while keeping every underwriting rule explainable.',
    palette: { boxHex: '#C82333', ribbonHex: '#FFB973', sealHex: '#184A36' },
  },
  {
    id: 'dispatch-insurance',
    parcelNumber: 2,
    domain: 'Insurance',
    scenarioTitle: 'The Disconnected Policyholder Moment',
    scenarioBody:
      'When severe winter weather hits, policyholders attempting to submit claims or update coverage encounter separate portals, repeated identity prompts, and long waits between underwriting and claims desks—leading many to abandon self-service altogether.',
    promptQuestion:
      'What turns fragmented policy and claims touchpoints into one effortless customer experience?',
    options: [
      {
        id: 'ins-a',
        label: 'A',
        text: 'Adding longer FAQ web pages before letting customers open a claim form',
        isCorrect: false,
        wrongFeedback:
          'Extra reading material slows stressed policyholders down instead of guiding their request forward.',
      },
      {
        id: 'ins-b',
        label: 'B',
        text: 'A reactive call-back queue that asks customers to re-submit documents by post',
        isCorrect: false,
        wrongFeedback:
          'Paper mail and repeat submissions deepen frustration when families or businesses need timely support.',
      },
      {
        id: 'ins-c',
        label: 'C',
        text: 'An Insurance Journey Agent that orchestrates guided, context-aware interactions from quote to claim',
        isCorrect: true,
        wrongFeedback: '',
      },
      {
        id: 'ins-d',
        label: 'D',
        text: 'Generating static monthly brochures about seasonal coverage options',
        isCorrect: false,
        wrongFeedback:
          'Static collateral informs prospects broadly, yet cannot resolve live policy servicing or claims.',
      },
    ],
    hint: 'Think about an agent designed around the policyholder’s entire lifecycle—connecting onboarding, servicing, and claims seamlessly.',
    palette: { boxHex: '#184A36', ribbonHex: '#F28518', sealHex: '#C82333' },
  },
  {
    id: 'dispatch-documents',
    parcelNumber: 3,
    domain: 'Documents',
    scenarioTitle: 'The Monday Morning Paper Avalanche',
    scenarioBody:
      'Every week, an enterprise operations hub receives thousands of supplier invoices, signed addenda, shipping manifests, and handwritten field notes across emails and scans. Skilled staff spend half their week copying line items into enterprise systems.',
    promptQuestion:
      'How should the organization liberate teams from manual document sorting and data re-entry?',
    options: [
      {
        id: 'doc-a',
        label: 'A',
        text: 'An Intelligent Document Processing Agent that classifies, extracts, and validates data across formats',
        isCorrect: true,
        wrongFeedback: '',
      },
      {
        id: 'doc-b',
        label: 'B',
        text: 'Requiring every global vendor to adopt one rigid, locked paper form layout',
        isCorrect: false,
        wrongFeedback:
          'External suppliers rarely conform to a single template—modern intake must handle real-world variety.',
      },
      {
        id: 'doc-c',
        label: 'C',
        text: 'Renaming incoming PDFs manually into shared network folders by date',
        isCorrect: false,
        wrongFeedback:
          'Folder naming organizes files on disk, but staff still have to read and type every figure manually.',
      },
      {
        id: 'doc-d',
        label: 'D',
        text: 'Scheduling extra weekend overtime shifts to type backlog totals into spreadsheets',
        isCorrect: false,
        wrongFeedback:
          'Throwing more manual hours at high-volume intake increases burnout and error rates.',
      },
    ],
    hint: 'Seek the capability that reads unstructured documents—invoices, contracts, and forms—and turns them directly into structured, verified enterprise data.',
    palette: { boxHex: '#434343', ribbonHex: '#F28518', sealHex: '#C82333' },
  },
  {
    id: 'dispatch-compliance',
    parcelNumber: 4,
    domain: 'Compliance',
    scenarioTitle: 'The Shifting Regulatory Horizon',
    scenarioBody:
      'Operating across multiple regions means new regulatory circulars, privacy rules, and reporting mandates arrive every month. Risk officers struggle to spot which internal policies are affected before external audit windows open.',
    promptQuestion:
      'Which approach keeps policies, controls, and audit evidence aligned automatically?',
    options: [
      {
        id: 'comp-a',
        label: 'A',
        text: 'Running an annual all-hands email survey to ask departments if rules changed',
        isCorrect: false,
        wrongFeedback:
          'Annual check-ins miss monthly regulatory updates and leave risky blind spots between audits.',
      },
      {
        id: 'comp-b',
        label: 'B',
        text: 'Printing regulatory handbooks and highlighting changes during quarterly meetings',
        isCorrect: false,
        wrongFeedback:
          'Manual highlighting cannot scale across jurisdictions or map rules directly to operational controls.',
      },
      {
        id: 'comp-c',
        label: 'C',
        text: 'Disabling external product updates until legal teams review every file by hand',
        isCorrect: false,
        wrongFeedback:
          'Halting innovation stalls the business rather than embedding continuous governance.',
      },
      {
        id: 'comp-d',
        label: 'D',
        text: 'A Regulatory Management Agent that tracks rule changes, maps obligations, and flags gaps early',
        isCorrect: true,
        wrongFeedback: '',
      },
    ],
    hint: 'Consider an always-on agent built to monitor obligations, connect rules to controls, and keep your enterprise continuously audit-ready.',
    palette: { boxHex: '#A61C2A', ribbonHex: '#FFB973', sealHex: '#184A36' },
  },
  {
    id: 'dispatch-operations',
    parcelNumber: 5,
    domain: 'Operations',
    scenarioTitle: 'The Siloed Execution Maze',
    scenarioBody:
      'A growing enterprise runs on separate CRM, ERP, billing, and service systems. Whenever an exception occurs—a custom contract term or supply delay—teams spend days chasing approvals and reconciling status over chat and email threads.',
    promptQuestion:
      'What unites disconnected departments and systems into one resilient operating flow?',
    options: [
      {
        id: 'ops-a',
        label: 'A',
        text: 'Creating larger daily status-update slide decks for cross-functional calls',
        isCorrect: false,
        wrongFeedback:
          'Status decks describe bottlenecks after the fact instead of coordinating the work itself.',
      },
      {
        id: 'ops-b',
        label: 'B',
        text: 'A Process Automation Agent that orchestrates workflows, exceptions, and human approvals end-to-end',
        isCorrect: true,
        wrongFeedback: '',
      },
      {
        id: 'ops-c',
        label: 'C',
        text: 'Asking employees to copy-paste updates between four browser tabs every hour',
        isCorrect: false,
        wrongFeedback:
          'Manual swivel-chair integration slows execution and introduces avoidable handoff mistakes.',
      },
      {
        id: 'ops-d',
        label: 'D',
        text: 'Routing every routine and complex exception to a single executive inbox',
        isCorrect: false,
        wrongFeedback:
          'Centralizing every exception in one inbox creates an immediate bottleneck at the top.',
      },
    ],
    hint: 'Look for the agent that connects systems, automates routine execution, and routes exceptions intelligently with human-in-the-loop clarity.',
    palette: { boxHex: '#1D3D30', ribbonHex: '#F28518', sealHex: '#C82333' },
  },
];

/* ==========================================================================
   Application State
   ========================================================================== */

const state = {
  page: 'HOME',
  previewParcel: 1,
  participant: {
    fullName: '',
    workEmail: '',
    company: '',
    jobTitle: '',
    industry: '',
    consentAccepted: false,
    consentTimestamp: '',
  },
  leadReferenceId: null,
  campaignSource: parseCampaignSource(),
  currentChallengeIndex: 0,
  completedCount: 0,
  missionCompleted: false,
  wrongOptionIds: [],
  attempts: [],
  isTransitioning: false,
};

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==========================================================================
   Christmas Garland + GSAP Hero Animations + Confetti Helpers
   ========================================================================== */

function buildFairyLights() {
  const container = document.getElementById('garland-bulbs');
  if (!container) return;
  const classes = ['bulb-orange', 'bulb-crimson', 'bulb-gold', 'bulb-green'];
  const count = window.innerWidth < 640 ? 14 : 28;
  container.innerHTML = Array.from({ length: count }, (_, i) => {
    const cls = classes[i % classes.length];
    const delay = ((i % 5) * 0.35).toFixed(2);
    return `<span class="bulb ${cls}" style="animation-delay:${delay}s"></span>`;
  }).join('');
}

function initChristmasGsapAnimations() {
  if (prefersReducedMotion()) return;

  // Staggered Hero Entrance
  gsap.from('.hero-copy > *', {
    y: 18,
    opacity: 0,
    duration: 0.65,
    stagger: 0.08,
    ease: 'power3.out',
    clearProps: 'transform,opacity',
  });

  gsap.from('.vault-preview-card', {
    y: 22,
    opacity: 0,
    duration: 0.75,
    delay: 0.18,
    ease: 'power3.out',
    clearProps: 'transform,opacity',
  });

  // Gliding Santa Sleigh across the winter night sky
  const sleigh = document.getElementById('santa-sleigh');
  if (sleigh) {
    gsap.fromTo(
      sleigh,
      { x: -60, y: 8 },
      {
        x: window.innerWidth + 360,
        y: -10,
        duration: 18,
        repeat: -1,
        ease: 'none',
      }
    );
  }

  // Gently swinging Christmas ornaments
  gsap.to('.ornament-left', {
    rotation: 6,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  gsap.to('.ornament-right', {
    rotation: -6,
    duration: 3.1,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  document.querySelectorAll('[data-ornament]').forEach((el) => {
    el.addEventListener('click', () => {
      gsap.fromTo(
        el,
        { rotation: -16 },
        { rotation: 0, duration: 1.1, ease: 'elastic.out(1, 0.35)' }
      );
      fireChristmasConfetti(0.5);
    });
  });
}

function fireChristmasConfetti(scale = 1) {
  if (prefersReducedMotion()) return;
  confetti({
    particleCount: Math.round(45 * scale),
    spread: 68,
    origin: { y: 0.58 },
    colors: ['#F28518', '#C82333', '#184A36', '#FFB973', '#FFFFFF'],
    disableForReducedMotion: true,
  });
}

function fireGrandChristmasCelebration() {
  if (prefersReducedMotion()) return;
  const palette = ['#F28518', '#C82333', '#184A36', '#FFB973', '#FFFFFF'];
  confetti({
    particleCount: 65,
    angle: 60,
    spread: 60,
    origin: { x: 0.1, y: 0.65 },
    colors: palette,
  });
  confetti({
    particleCount: 65,
    angle: 120,
    spread: 60,
    origin: { x: 0.9, y: 0.65 },
    colors: palette,
  });
}

function shakeParcelAnimation(el) {
  if (!el || prefersReducedMotion()) return;
  gsap.fromTo(
    el,
    { rotation: -9, scale: 1.06 },
    { rotation: 0, scale: 1, duration: 0.65, ease: 'elastic.out(1, 0.35)' }
  );
}

/* ==========================================================================
   Multi-Depth Snowfall Canvas
   ========================================================================== */

function initSnowfallCanvas() {
  const canvas = document.getElementById('snow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const count = width < 640 ? 28 : 64;
  const flakes = Array.from({ length: count }, (_, idx) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: idx % 5 === 0 ? 2.2 + Math.random() * 1.5 : 1 + Math.random() * 1.6,
    speedY: 0.3 + Math.random() * 0.65,
    speedX: (Math.random() - 0.5) * 0.3,
    alpha: 0.18 + Math.random() * 0.42,
    isGoldStar: idx % 7 === 0,
  }));

  if (prefersReducedMotion()) {
    ctx.clearRect(0, 0, width, height);
    flakes.forEach((f) => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = f.isGoldStar
        ? `rgba(255, 185, 115, ${f.alpha * 0.7})`
        : `rgba(255, 255, 255, ${f.alpha * 0.6})`;
      ctx.fill();
    });
    return;
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    for (const f of flakes) {
      f.y += f.speedY;
      f.x += f.speedX + Math.sin(f.y * 0.009) * 0.18;
      if (f.y > height + 10) {
        f.y = -10;
        f.x = Math.random() * width;
      }
      if (f.x > width + 10) f.x = -10;
      if (f.x < -10) f.x = width + 10;

      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = f.isGoldStar
        ? `rgba(255, 185, 115, ${f.alpha})`
        : `rgba(255, 255, 255, ${f.alpha * 0.65})`;
      ctx.fill();
    }
    window.requestAnimationFrame(render);
  }

  window.requestAnimationFrame(render);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/* ==========================================================================
   Helpers & SVG Gift Parcel
   ========================================================================== */

function parseCampaignSource() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || 'direct_winter_dispatch',
    utmMedium: params.get('utm_medium') || 'web_campaign',
    utmCampaign: params.get('utm_campaign') || 'newgenone_secret_santa',
    referrer: document.referrer || 'direct',
    landingTimestamp: new Date().toISOString(),
  };
}

function trackEvent(eventName, payload = {}) {
  const detail = {
    event: eventName,
    timestamp: new Date().toISOString(),
    provider: INTEGRATION_CONFIG.analyticsProviderPlaceholder,
    ...payload,
  };
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(detail);
  }
  window.dispatchEvent(new CustomEvent('newgenone:analytics', { detail }));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderGiftParcelSvg(challenge, sizePx = 158) {
  const { boxHex, ribbonHex, sealHex } = challenge.palette;
  return `
    <svg width="${sizePx}" height="${sizePx}" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Christmas Gift 0${challenge.parcelNumber} for ${escapeHtml(challenge.domain)}">
      <ellipse cx="90" cy="156" rx="54" ry="9" fill="#04070B" fill-opacity="0.45" />
      <rect x="34" y="72" width="112" height="80" rx="8" fill="${boxHex}" stroke="#FFB973" stroke-opacity="0.5" stroke-width="1.5" />
      <rect x="34" y="72" width="112" height="14" fill="#000000" fill-opacity="0.2" />
      <rect x="81" y="72" width="18" height="80" fill="${ribbonHex}" />
      <rect x="34" y="108" width="112" height="10" fill="${ribbonHex}" fill-opacity="0.9" />
      <g>
        <rect x="28" y="54" width="124" height="22" rx="6" fill="${boxHex}" stroke="#FFB973" stroke-opacity="0.6" stroke-width="1.5" />
        <rect x="81" y="54" width="18" height="22" fill="${ribbonHex}" />
        <path d="M90 54C74 42 58 34 52 44C47 52 68 56 90 54Z" fill="${ribbonHex}" stroke="#FFFFFF" stroke-opacity="0.4" />
        <path d="M90 54C106 42 122 34 128 44C133 52 112 56 90 54Z" fill="${ribbonHex}" stroke="#FFFFFF" stroke-opacity="0.4" />
        <circle cx="90" cy="52" r="7" fill="${ribbonHex}" stroke="#FFFFFF" stroke-opacity="0.55" />
      </g>
      <g>
        <circle cx="90" cy="113" r="14" fill="${sealHex}" stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="1.2" />
        <text x="90" y="118" text-anchor="middle" fill="#FFFFFF" font-size="12" font-weight="700" font-family="Montserrat, sans-serif">0${challenge.parcelNumber}</text>
      </g>
    </svg>
  `;
}

/* ==========================================================================
   2-Page Navigation & TopBar Circular Progress Ring
   ========================================================================== */

function scrollToRegisterSection() {
  if (state.page !== 'HOME') {
    navigateToPage('HOME', false);
  }
  const el = document.getElementById('register-section');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      const nameInput = document.getElementById('reg-full-name');
      if (nameInput && window.location.hash !== '#mission') {
        nameInput.focus({ preventScroll: true });
      }
    }, 420);
  }
}

function navigateToPage(targetPage, updateHash = true) {
  state.page = targetPage;

  const homeEl = document.getElementById('page-home');
  const missionEl = document.getElementById('page-mission');
  const topbarNav = document.getElementById('topbar-nav');
  const topbarProgress = document.getElementById('topbar-progress');
  const headerCta = document.getElementById('header-cta-btn');
  const headerRestart = document.getElementById('header-restart-btn');

  if (targetPage === 'HOME') {
    homeEl.hidden = false;
    missionEl.hidden = true;
    topbarNav.hidden = false;
    topbarProgress.hidden = true;
    headerCta.hidden = false;
    headerRestart.hidden = true;
    if (updateHash) {
      history.replaceState(null, '', '#home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    homeEl.hidden = true;
    missionEl.hidden = false;
    topbarNav.hidden = true;
    topbarProgress.hidden = false;
    headerCta.hidden = true;
    headerRestart.hidden = false;
    if (updateHash) {
      window.location.hash = 'mission';
    }
    renderMissionPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function updateTopBarProgress() {
  const total = CHALLENGES.length;
  const completed = state.completedCount;
  const ratio = Math.min(1, Math.max(0, completed / total));
  const circumference = 2 * Math.PI * 15.5;
  const offset = circumference * (1 - ratio);

  const arc = document.getElementById('progress-ring-arc');
  const numEl = document.getElementById('progress-ring-num');
  const labelDesktop = document.getElementById('progress-label');
  const labelMobile = document.getElementById('progress-label-mobile');
  const progressbar = document.getElementById('progress-progressbar');

  const currentNum = state.missionCompleted
    ? total
    : Math.min(total, state.currentChallengeIndex + 1);

  if (arc) {
    arc.style.strokeDasharray = `${circumference}`;
    arc.style.strokeDashoffset = `${offset}`;
    arc.setAttribute('stroke', ratio >= 1 ? '#34D399' : '#F28518');
  }
  if (numEl) numEl.textContent = `0${currentNum}`;
  if (labelDesktop) {
    labelDesktop.textContent = state.missionCompleted
      ? `${completed} of ${total} Completed`
      : `Challenge ${currentNum} of ${total}`;
  }
  if (labelMobile) labelMobile.textContent = `${completed}/${total}`;
  if (progressbar) progressbar.setAttribute('aria-valuenow', String(completed));
}

/* ==========================================================================
   Page 1 Rendering: Vault Preview + Domain Cards + Registration Form
   ========================================================================== */

function renderHomePreview() {
  const active =
    CHALLENGES.find((c) => c.parcelNumber === state.previewParcel) || CHALLENGES[0];

  document.getElementById('preview-parcel-counter').textContent = `Gift 0${active.parcelNumber} / 05`;
  const artWrap = document.getElementById('preview-parcel-art');
  artWrap.innerHTML = renderGiftParcelSvg(active, 152);
  document.getElementById('preview-domain-label').textContent = `${active.domain} Gift`;
  document.getElementById('preview-scenario-title').textContent = active.scenarioTitle;

  if (!prefersReducedMotion()) {
    gsap.fromTo(
      artWrap,
      { scale: 0.92, opacity: 0.7 },
      { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.7)' }
    );
  }

  const grid = document.getElementById('preview-selector-grid');
  grid.innerHTML = CHALLENGES.map((item) => {
    const isActive = item.parcelNumber === state.previewParcel;
    return `
      <button
        type="button"
        class="preview-tab-btn ${isActive ? 'active' : ''}"
        data-preview-parcel="${item.parcelNumber}"
      >
        <span class="preview-tab-num">0${item.parcelNumber}</span>
        <span class="preview-tab-domain">${escapeHtml(item.domain)}</span>
      </button>
    `;
  }).join('');

  grid.querySelectorAll('[data-preview-parcel]').forEach((btn) => {
    const select = () => {
      const next = Number(btn.getAttribute('data-preview-parcel'));
      if (next !== state.previewParcel) {
        state.previewParcel = next;
        renderHomePreview();
      }
    };
    btn.addEventListener('click', select);
    btn.addEventListener('mouseenter', select);
  });
}

function renderHomeDomains() {
  const container = document.getElementById('home-domains-grid');
  container.innerHTML = CHALLENGES.map(
    (item) => `
      <article class="domain-tile">
        <div>
          <div class="domain-tile-top">
            <span class="mono-num accent-orange">0${item.parcelNumber}</span>
            <span>${escapeHtml(item.domain)}</span>
          </div>
          <h3>${escapeHtml(item.scenarioTitle)}</h3>
        </div>
        <p class="domain-tile-foot">Sealed Christmas parcel awaiting clue</p>
      </article>
    `
  ).join('');
}

function setupRegistrationForm() {
  const form = document.getElementById('registration-form');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const fields = {
    fullName: document.getElementById('reg-full-name'),
    workEmail: document.getElementById('reg-work-email'),
    company: document.getElementById('reg-company'),
    jobTitle: document.getElementById('reg-job-title'),
    industry: document.getElementById('reg-industry'),
    consent: document.getElementById('reg-consent'),
  };

  const errEls = {
    fullName: document.getElementById('err-full-name'),
    workEmail: document.getElementById('err-work-email'),
    company: document.getElementById('err-company'),
    jobTitle: document.getElementById('err-job-title'),
    industry: document.getElementById('err-industry'),
    consent: document.getElementById('err-consent'),
  };

  function validateAll(showErrors = true) {
    const errors = {};
    if (!fields.fullName.value.trim() || fields.fullName.value.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    const emailVal = fields.workEmail.value.trim();
    if (!emailVal) {
      errors.workEmail = 'Work email is required to proceed.';
    } else if (!emailRegex.test(emailVal)) {
      errors.workEmail = 'Please enter a valid work email address (e.g. alex@company.com).';
    }
    if (!fields.company.value.trim() || fields.company.value.trim().length < 2) {
      errors.company = 'Please enter your organization name.';
    }
    if (!fields.jobTitle.value.trim() || fields.jobTitle.value.trim().length < 2) {
      errors.jobTitle = 'Please enter your role or title.';
    }
    if (!fields.industry.value) {
      errors.industry = 'Please select your primary industry.';
    }
    if (!fields.consent.checked) {
      errors.consent = 'Please confirm consent to continue to the questionnaire.';
    }

    if (showErrors) {
      Object.keys(errEls).forEach((key) => {
        errEls[key].textContent = errors[key] || '';
        if (fields[key] && fields[key].type !== 'checkbox') {
          fields[key].classList.toggle('input-error', Boolean(errors[key]));
        }
      });
    }

    return Object.keys(errors).length === 0;
  }

  Object.keys(fields).forEach((key) => {
    const el = fields[key];
    el.addEventListener('blur', () => {
      if (el.value || el.checked || errEls[key].textContent) {
        validateAll(true);
      }
    });
    el.addEventListener('input', () => {
      if (errEls[key].textContent) {
        validateAll(true);
      }
    });
  });

  document.getElementById('privacy-link').addEventListener('click', (e) => {
    e.preventDefault();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateAll(true)) {
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          '#registration-form',
          { x: -6 },
          { x: 0, duration: 0.35, ease: 'elastic.out(1, 0.3)' }
        );
      }
      return;
    }

    const submitBtn = document.getElementById('reg-submit-btn');
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Preparing Santa’s Sleigh...';

    state.participant = {
      fullName: fields.fullName.value.trim(),
      workEmail: fields.workEmail.value.trim(),
      company: fields.company.value.trim(),
      jobTitle: fields.jobTitle.value.trim(),
      industry: fields.industry.value,
      consentAccepted: true,
      consentTimestamp: new Date().toISOString(),
    };

    await new Promise((resolve) => setTimeout(resolve, 260));
    const leadRef = `NG1-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    state.leadReferenceId = leadRef;

    window.dispatchEvent(
      new CustomEvent('newgenone:lead-captured', {
        detail: {
          participant: state.participant,
          source: state.campaignSource,
          integrationTargets: {
            crm: INTEGRATION_CONFIG.crmDestinationPlaceholder,
            marketingAutomation: INTEGRATION_CONFIG.marketingAutomationPlaceholder,
          },
        },
      })
    );

    trackEvent('lead_submitted', {
      company: state.participant.company,
      industry: state.participant.industry,
      jobTitle: state.participant.jobTitle,
      leadReferenceId: leadRef,
    });

    state.currentChallengeIndex = 0;
    state.completedCount = 0;
    state.missionCompleted = false;
    state.wrongOptionIds = [];
    state.attempts = [];
    state.isTransitioning = false;

    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Enter Santa’s Questionnaire';

    fireChristmasConfetti(0.6);
    navigateToPage('MISSION');
  });
}

/* ==========================================================================
   Page 2 Rendering: Direct Question-to-Question Flow -> Normal Thank You Page
   ========================================================================== */

function renderMissionPage() {
  const questionnaireView = document.getElementById('questionnaire-view');
  const thankyouView = document.getElementById('thankyou-view');

  updateTopBarProgress();

  if (state.missionCompleted) {
    questionnaireView.hidden = true;
    thankyouView.hidden = false;
    const firstName = state.participant.fullName.split(' ')[0] || 'Guest';
    document.getElementById('thankyou-headline').textContent = `Thank you, ${firstName}!`;
    document.getElementById(
      'thankyou-message'
    ).textContent = `Thank you for completing all five NewgenONE Secret Santa challenges for ${
      state.participant.company || 'your organization'
    }. Your submission has been recorded, and we wish you a warm and joyful holiday season.`;

    if (!prefersReducedMotion()) {
      gsap.fromTo(
        '#thankyou-card',
        { y: 20, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(1.4)' }
      );
    }
    return;
  }

  questionnaireView.hidden = false;
  thankyouView.hidden = true;

  const firstName = state.participant.fullName.split(' ')[0] || 'Guest';
  document.getElementById(
    'mission-greeting'
  ).textContent = `Santa’s Questionnaire · Prepared for ${firstName} at ${state.participant.company}`;

  const challenge = CHALLENGES[state.currentChallengeIndex];
  const progressPct = Math.max(20, ((state.currentChallengeIndex + 1) / CHALLENGES.length) * 100);
  document.getElementById('linear-progress-fill').style.width = `${progressPct}%`;
  document.getElementById('dispatch-step-text').textContent = `Question 0${challenge.parcelNumber} of 0${CHALLENGES.length}`;

  document.getElementById('pedestal-parcel-num').textContent = `Gift 0${challenge.parcelNumber}`;
  document.getElementById('pedestal-domain-tag').textContent = challenge.domain;
  const activeArt = document.getElementById('active-parcel-art');
  activeArt.innerHTML = renderGiftParcelSvg(challenge, 158);
  document.getElementById('pedestal-title').textContent = challenge.scenarioTitle;

  document.getElementById('question-kicker').textContent = `Scenario 0${challenge.parcelNumber} · ${challenge.domain}`;
  document.getElementById('question-title').textContent = challenge.scenarioTitle;
  document.getElementById('question-body').textContent = challenge.scenarioBody;
  document.getElementById('question-prompt').textContent = challenge.promptQuestion;

  const optionsEl = document.getElementById('options-container');
  optionsEl.innerHTML = challenge.options
    .map((opt, idx) => {
      const triedWrong = state.wrongOptionIds.includes(opt.id);
      return `
        <button
          type="button"
          class="option-btn"
          data-option-id="${opt.id}"
          ${triedWrong ? 'disabled' : ''}
        >
          <span class="option-key">${opt.label}</span>
          <span class="option-text">${escapeHtml(opt.text)}</span>
          <span class="option-num-hint">${idx + 1}</span>
        </button>
      `;
    })
    .join('');

  optionsEl.querySelectorAll('[data-option-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      handleSelectOption(btn.getAttribute('data-option-id'), btn);
    });
  });

  const hintBox = document.getElementById('hint-box');
  if (state.wrongOptionIds.length > 0) {
    const lastWrongId = state.wrongOptionIds[state.wrongOptionIds.length - 1];
    const lastOpt = challenge.options.find((o) => o.id === lastWrongId);
    document.getElementById('wrong-feedback-text').textContent =
      lastOpt ? lastOpt.wrongFeedback : '';
    document.getElementById('patron-hint-text').textContent = challenge.hint;
    hintBox.hidden = false;
  } else {
    hintBox.hidden = true;
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        '#question-panel',
        { y: 12, opacity: 0.75 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo(
        activeArt,
        { scale: 0.9, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.6)' }
      );
    }
  }
}

function handleSelectOption(optionId, buttonEl) {
  if (state.isTransitioning) return;
  const challenge = CHALLENGES[state.currentChallengeIndex];
  const option = challenge.options.find((o) => o.id === optionId);
  if (!option) return;

  const existing = state.attempts.find((a) => a.challengeId === challenge.id);
  if (existing) {
    existing.attempts += 1;
    if (!option.isCorrect) existing.hintsUsed += 1;
    existing.selectedOptionIds.push(optionId);
    existing.solved = existing.solved || option.isCorrect;
  } else {
    state.attempts.push({
      challengeId: challenge.id,
      domain: challenge.domain,
      attempts: 1,
      hintsUsed: option.isCorrect ? 0 : 1,
      selectedOptionIds: [optionId],
      solved: option.isCorrect,
    });
  }

  trackEvent('challenge_attempted', {
    challengeId: challenge.id,
    domain: challenge.domain,
    optionId,
    isCorrect: option.isCorrect,
  });

  if (option.isCorrect) {
    state.isTransitioning = true;
    state.completedCount = Math.min(CHALLENGES.length, state.completedCount + 1);
    updateTopBarProgress();

    if (buttonEl) {
      buttonEl.classList.add('is-correct-flash');
    }

    fireChristmasConfetti(0.55);

    window.setTimeout(() => {
      state.isTransitioning = false;
      if (state.currentChallengeIndex < CHALLENGES.length - 1) {
        state.currentChallengeIndex += 1;
        state.wrongOptionIds = [];
        renderMissionPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        state.missionCompleted = true;
        fireGrandChristmasCelebration();
        trackEvent('mission_completed', {
          industry: state.participant.industry,
          challengesCompleted: state.completedCount,
        });
        renderMissionPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 240);
  } else {
    if (!state.wrongOptionIds.includes(optionId)) {
      state.wrongOptionIds.push(optionId);
    }
    trackEvent('challenge_hint_shown', {
      challengeId: challenge.id,
      domain: challenge.domain,
    });
    renderMissionPage();
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        '#hint-box',
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }
}

/* ==========================================================================
   Initialization
   ========================================================================== */

function init() {
  buildFairyLights();
  initSnowfallCanvas();
  renderHomePreview();
  renderHomeDomains();
  setupRegistrationForm();
  initChristmasGsapAnimations();

  document.getElementById(
    'copyright-text'
  ).textContent = `© ${new Date().getFullYear()} Newgen Software Technologies Ltd. All rights reserved.`;

  trackEvent('campaign_view', {
    utmSource: state.campaignSource.utmSource,
    utmMedium: state.campaignSource.utmMedium,
    utmCampaign: state.campaignSource.utmCampaign,
  });

  // Interactive Santa & Gift Parcel Clicks
  document.getElementById('santa-avatar-btn')?.addEventListener('click', (e) => {
    shakeParcelAnimation(e.currentTarget);
    fireChristmasConfetti(0.75);
  });

  document.getElementById('preview-parcel-trigger')?.addEventListener('click', () => {
    shakeParcelAnimation(document.getElementById('preview-parcel-art'));
    fireChristmasConfetti(0.4);
  });

  document.getElementById('active-parcel-trigger')?.addEventListener('click', () => {
    shakeParcelAnimation(document.getElementById('active-parcel-art'));
    fireChristmasConfetti(0.4);
  });

  // All Homepage CTAs scroll smoothly to Section 3 Registration Form
  document.querySelectorAll('.scroll-to-register').forEach((btn) => {
    btn.addEventListener('click', () => {
      trackEvent('mission_started', { source: state.campaignSource.utmSource });
      scrollToRegisterSection();
    });
  });

  document.getElementById('header-cta-btn').addEventListener('click', () => {
    trackEvent('mission_started', { source: state.campaignSource.utmSource });
    scrollToRegisterSection();
  });

  const returnHome = () => {
    if (state.page === 'MISSION') {
      trackEvent('mission_replayed', { previousCompleted: state.missionCompleted });
    }
    navigateToPage('HOME');
  };

  document.getElementById('brand-home-btn').addEventListener('click', returnHome);
  document.getElementById('header-restart-btn').addEventListener('click', returnHome);

  // Keyboard 1-4 shortcuts during questionnaire
  window.addEventListener('keydown', (e) => {
    if (state.page !== 'MISSION' || state.missionCompleted) return;
    const idx = ['1', '2', '3', '4'].indexOf(e.key);
    const activeChallenge = CHALLENGES[state.currentChallengeIndex];
    if (idx !== -1 && activeChallenge.options[idx]) {
      e.preventDefault();
      const targetId = activeChallenge.options[idx].id;
      const btn = document.querySelector(`[data-option-id="${targetId}"]`);
      handleSelectOption(targetId, btn);
    }
  });

  // Hash routing guard
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#mission') {
      if (state.leadReferenceId) {
        navigateToPage('MISSION', false);
      } else {
        scrollToRegisterSection();
      }
    } else if (window.location.hash === '#home' && state.page !== 'HOME') {
      navigateToPage('HOME', false);
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
