const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.nav a')];
const sections = [...document.querySelectorAll('main section[id]')];
const floatingDock = document.querySelector('.floating-dock');
const topButton = document.querySelector('.dock-top');

function closeMenu() {
  if (!header || !menuToggle) return;
  header.classList.remove('nav-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}

menuToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navLinks.forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('click', (event) => {
  if (header?.classList.contains('nav-open') && !header.contains(event.target)) closeMenu();
});

let ticking = false;
function updateScrollUI() {
  const scrolled = window.scrollY > 24;
  header?.classList.toggle('scrolled', scrolled);
  floatingDock?.classList.toggle('visible', window.scrollY > 420);
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollUI);
    ticking = true;
  }
}, { passive: true });
updateScrollUI();
topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
  revealObserver.observe(element);
});

const serviceData = {
  'web-development': { number: '01', name: 'Web Development', label: 'SERVICE 01', title: 'Websites built to turn attention into action.', summary: 'We design and develop fast, responsive websites that communicate your value clearly, build trust, and make it easier for potential customers to contact or buy from your business.', challenge: 'A vague offer, slow experience, or unclear next step can make interested visitors leave before they contact you.', benefits: ['Custom website design aligned with your brand.', 'Responsive layouts for mobile, tablet, and desktop.', 'Landing pages designed around a clear conversion goal.', 'Business websites with relevant service and contact pages.', 'Contact forms, WhatsApp links, and clear calls to action.', 'Basic on-page SEO and performance optimization.', 'Testing across common screen sizes and browsers.'], process: [['Discover', 'Understand your business, audience, and website goals.'], ['Design', 'Plan the page structure, visual style, and user journey.'], ['Build', 'Implement the website and required integrations.'], ['Launch', 'Test functionality, responsiveness, and performance.']], bestFor: 'Startups, local businesses, service providers, and growing brands.', goodToKnow: 'Scope, integrations, copy, photography, hosting, and third-party tools are confirmed before build so expectations stay clear.', cta: 'Discuss your website project', sources: [['Google Core Web Vitals', 'https://developers.google.com/search/docs/appearance/core-web-vitals'], ['WCAG 2.2', 'https://www.w3.org/TR/WCAG22/']] },
  'google-ads': { number: '02', name: 'Google Ads', label: 'SERVICE 02', title: 'Reach people actively searching for your services.', summary: 'We help businesses structure and manage Google Ads campaigns around relevant search intent, useful landing pages, and measurable business goals.', challenge: 'Without a clear search structure and measurement plan, ad spend can create activity without showing which actions are valuable.', benefits: ['Campaign and account review, where applicable.', 'Keyword and search-intent research.', 'Campaign structure and targeting recommendations.', 'Search ad copy and extensions/assets.', 'Conversion tracking setup or audit, where technically supported.', 'Landing-page recommendations.', 'Performance monitoring and optimization.', 'Clear reporting on spend, leads, and available conversion data.'], process: [['Research', 'Understand your offer, audience, and competitive landscape.'], ['Plan', 'Develop a campaign and budget strategy.'], ['Launch', 'Configure campaigns, tracking, and landing-page alignment.'], ['Optimize', 'Review performance and improve based on collected data.']], bestFor: 'Businesses seeking search-driven enquiries, bookings, or sales.', goodToKnow: 'Advertising spend is separate from management fees. Leads, rankings, sales, and return on ad spend are never guaranteed.', cta: 'Discuss your Google Ads campaign', sources: [['Google Ads basics', 'https://support.google.com/google-ads/answer/6238826?hl=en'], ['Conversion tracking', 'https://support.google.com/google-ads/answer/1722022?hl=en']] },
  'meta-ads': { number: '03', name: 'Meta Ads', label: 'SERVICE 03', title: 'Turn social attention into meaningful enquiries.', summary: 'We help businesses plan and manage advertising campaigns across Facebook and Instagram to introduce offers, reach relevant audiences, and generate opportunities for growth.', challenge: 'Social campaigns need a clear objective, useful creative direction, and feedback from real results—not just more impressions.', benefits: ['Campaign strategy based on your business objective.', 'Audience and targeting research.', 'Campaign setup and structure.', 'Ad copy and creative direction.', 'Image or video ad assets according to the agreed scope.', 'Lead-generation or website-traffic campaign setup.', 'Pixel and conversion tracking support where applicable.', 'Performance reviews and optimization recommendations.'], process: [['Understand', 'Identify the offer, audience, and campaign objective.'], ['Create', 'Develop ad messaging and creative concepts.'], ['Launch', 'Set up campaigns, targeting, and tracking.'], ['Improve', 'Test suitable variations and optimize using real results.']], bestFor: 'E-commerce brands, local businesses, service providers, and businesses promoting specific offers.', goodToKnow: 'Advertising spend and third-party creative costs are separate unless explicitly included. Sales and leads are never promised.', cta: 'Discuss your Meta Ads campaign', sources: [['Meta campaign objectives', 'https://www.facebook.com/business/help/273363992030035'], ['Meta A/B testing', 'https://www.facebook.com/business/help/1738164643098669']] },
  'ai-chatbots': { number: '04', name: 'AI Chatbots', label: 'SERVICE 04', title: 'Answer faster. Capture opportunities. Reduce repetitive support.', summary: 'We build AI-assisted chat experiences that help businesses answer common questions, collect relevant lead information, and guide visitors toward the right next step.', challenge: 'Repeated questions consume team time, while unclear handoffs can make promising enquiries hard to follow up.', benefits: ['Chatbot planning around your actual customer questions.', 'Website chatbot interface or supported messaging integration.', 'FAQ and knowledge-source configuration.', 'Lead qualification and information collection.', 'Guided conversation flows.', 'Human handoff for questions the bot cannot resolve.', 'Testing of common questions and failure cases.', 'Deployment guidance and agreed post-launch support.'], process: [['Map', 'Identify repetitive questions and customer needs.'], ['Configure', 'Prepare knowledge sources and conversation flows.'], ['Integrate', 'Connect supported channels and tools.'], ['Test', 'Validate answers, fallback behavior, and human escalation.']], bestFor: 'Businesses receiving repetitive enquiries, service questions, or website leads.', goodToKnow: 'AI use should be disclosed where appropriate. The bot cannot answer every question accurately, and external API, hosting, or platform charges may be separate.', cta: 'Discuss your AI chatbot', sources: [['Microsoft Copilot knowledge', 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio'], ['NIST AI Risk Framework', 'https://doi.org/10.6028/NIST.AI.600-1']] },
  'automation': { number: '05', name: 'Automation', label: 'SERVICE 05', title: 'Connect your tools. Eliminate unnecessary manual work.', summary: 'We design practical workflows that connect supported business tools, reduce repetitive tasks, and help teams handle enquiries and routine operations more efficiently.', challenge: 'Manual re-entry, missed handoffs, and invisible bottlenecks make routine work slower and harder to manage.', benefits: ['Workflow discovery and process mapping.', 'Identification of repetitive tasks suitable for automation.', 'Automation design and implementation.', 'Connections between compatible apps and services.', 'Lead capture and routing workflows.', 'Notifications and follow-up workflows.', 'Data transfer and record updates where supported.', 'Error handling, testing, and documentation.', 'Handover guidance for the implemented workflow.'], process: [['Audit', 'Map your current process and identify bottlenecks.'], ['Design', 'Define triggers, actions, conditions, and exceptions.'], ['Build', 'Implement the workflow using suitable supported tools.'], ['Validate', 'Test normal scenarios, failures, and handoffs.']], bestFor: 'Small businesses, agencies, online stores, and teams managing repetitive administrative tasks.', goodToKnow: 'Integration limitations and third-party subscription or API costs are stated up front. A workflow is only called automated after it is implemented and tested.', cta: 'Discuss your automation project', sources: [['IBM Business Process Management', 'https://www.ibm.com/think/topics/business-process-management-examples'], ['Power Automate approvals', 'https://learn.microsoft.com/en-us/power-automate/get-started-approvals']] }
};

const dialog = document.querySelector('#serviceDialog');
const dialogPanel = dialog?.querySelector('.service-dialog-panel');
const dialogClose = dialog?.querySelector('.dialog-close');
const dialogTitle = document.querySelector('#serviceDialogTitle');
const dialogLabel = document.querySelector('#serviceDialogLabel');
const dialogName = document.querySelector('#serviceDialogName');
const dialogSummary = document.querySelector('#serviceDialogSummary');
const challengeText = document.querySelector('#serviceChallenge');
const benefitsList = document.querySelector('#serviceBenefits');
const processList = document.querySelector('#serviceProcess');
const bestForText = document.querySelector('#serviceBestFor');
const goodToKnowText = document.querySelector('#serviceGoodToKnow');
const sourcesList = document.querySelector('#serviceSources');
const dialogCta = document.querySelector('#serviceDialogCta');
const serviceWhatsApp = document.querySelector('#serviceWhatsApp');
const dialogBack = document.querySelector('.dialog-back');
const serviceSelect = document.querySelector('#serviceSelect');
let lastTrigger = null;

function fillList(list, items) {
  if (list) list.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
}
function fillProcess(list, items) {
  if (list) list.innerHTML = items.map(([title, detail], index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><div><strong>${title}</strong><small>${detail}</small></div></li>`).join('');
}
function openServiceDetails(id, trigger) {
  const service = serviceData[id];
  if (!service || !dialog) return;
  lastTrigger = trigger;
  dialogLabel.textContent = service.label;
  dialogName.textContent = service.name;
  dialogTitle.textContent = service.title;
  dialogSummary.textContent = service.summary;
  challengeText.textContent = service.challenge;
  fillList(benefitsList, service.benefits);
  fillProcess(processList, service.process);
  bestForText.textContent = service.bestFor;
  goodToKnowText.textContent = service.goodToKnow;
  sourcesList.innerHTML = service.sources.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`).join('');
  dialogCta.textContent = service.cta;
  dialogCta.insertAdjacentHTML('beforeend', ' <span aria-hidden="true">↗</span>');
  if (serviceWhatsApp) serviceWhatsApp.href = `https://wa.me/923297118118?text=${encodeURIComponent(`Hi VarenzoX, I would like to discuss your ${service.name} service.`)}`;
  if (serviceSelect) serviceSelect.value = service.name;
  if (serviceSelect) serviceSelect.dataset.selectedFromService = id;
  dialog.classList.remove('is-closing');
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
  document.body.classList.add('dialog-open');
  window.setTimeout(() => dialogClose?.focus(), 40);
}
let dialogClosing = false;
function closeServiceDetails() {
  if (!dialog || dialogClosing || !dialog.open) return;
  const finish = () => {
    if (dialog.open && typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    dialog.classList.remove('is-closing');
    document.body.classList.remove('dialog-open');
    lastTrigger?.focus?.();
    dialogClosing = false;
  };
  if (reducedMotion) { finish(); return; }
  dialogClosing = true;
  dialog.classList.add('is-closing');
  window.setTimeout(finish, 300);
}

function inlineDetailMarkup(service) {
  return `<div class="inline-detail-head"><span class="dialog-label">${service.label}</span><h4>${service.title}</h4><p>${service.summary}</p></div><div class="inline-detail-challenge"><strong>The challenge</strong><span>${service.challenge}</span></div><div class="inline-detail-columns"><div><strong>What you get</strong><ul>${service.benefits.map((item) => `<li>${item}</li>`).join('')}</ul></div><div><strong>How we work</strong><ol>${service.process.map(([title, detail]) => `<li><b>${title}</b><span>${detail}</span></li>`).join('')}</ol></div></div><div class="inline-detail-bottom"><p><strong>Best for:</strong> ${service.bestFor}</p><p><strong>Good to know:</strong> ${service.goodToKnow}</p></div><a class="inline-detail-cta" href="#contact" data-service-cta="${service.name}">${service.cta} <span>↗</span></a>`;
}
function toggleInlineDetails(card, trigger) {
  const service = serviceData[card.dataset.service];
  const panel = card.querySelector('.service-inline-detail');
  if (!service || !panel) return;
  const isOpen = panel.classList.contains('is-open');
  window.clearTimeout(Number(panel.dataset.closeTimer || 0));
  if (isOpen) {
    panel.classList.add('is-closing');
    panel.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', `Open ${service.name} details`);
    card.setAttribute('aria-expanded', 'false');
    panel.dataset.closeTimer = String(window.setTimeout(() => { panel.hidden = true; panel.classList.remove('is-closing'); }, 420));
    return;
  }
  panel.innerHTML = inlineDetailMarkup(service);
  panel.classList.remove('is-closing');
  panel.hidden = false;
  requestAnimationFrame(() => panel.classList.add('is-open'));
  trigger.setAttribute('aria-expanded', 'true');
  trigger.setAttribute('aria-label', `Close ${service.name} details`);
  card.setAttribute('aria-expanded', 'true');
  panel.querySelector('.inline-detail-cta')?.addEventListener('click', () => { if (serviceSelect) serviceSelect.value = service.name; });
}

document.querySelectorAll('.service-card[data-service]').forEach((card) => {
  const toggle = card.querySelector('.learn-toggle');
  const iconToggle = card.querySelector('.service-icon-trigger');
  const setExpanded = (expanded) => {
    card.setAttribute('aria-expanded', String(expanded));
    if (toggle) toggle.setAttribute('aria-label', `${expanded ? 'Hide details about' : 'More about'} ${card.querySelector('h3').textContent}`);
  };
  card.addEventListener('click', (event) => {
    if (event.target.closest('button, a')) return;
    openServiceDetails(card.dataset.service, card);
  });
  card.addEventListener('keydown', (event) => {
    if (event.target !== card || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    openServiceDetails(card.dataset.service, card);
  });
  toggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    card.animate([{ transform: 'scale(.985)' }, { transform: 'scale(1)' }], { duration: 360, easing: 'cubic-bezier(.22,1.35,.36,1)' });
    setExpanded(false);
    openServiceDetails(card.dataset.service, toggle);
  });
  iconToggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleInlineDetails(card, iconToggle);
  });
});
dialogClose?.addEventListener('click', closeServiceDetails);
dialog?.addEventListener('click', (event) => { if (event.target === dialog) closeServiceDetails(); });
dialogCta?.addEventListener('click', (event) => {
  event.preventDefault();
  closeServiceDetails();
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => document.querySelector('#contactForm input[name="name"]')?.focus(), 550);
});
dialogBack?.addEventListener('click', closeServiceDetails);
dialog?.addEventListener('cancel', (event) => { event.preventDefault(); closeServiceDetails(); });

const finePointer = window.matchMedia('(pointer: fine)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (finePointer && !reducedMotion) {
  document.querySelectorAll('.service-card, .approach-panel').forEach((card) => {
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    card.addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = (pointerX - rect.left) / rect.width - .5;
        const y = (pointerY - rect.top) / rect.height - .5;
        card.style.setProperty('--tilt-x', `${(y * -2.2).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(x * 2.2).toFixed(2)}deg`);
        frame = 0;
      });
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
      card.style.transform = '';
    });
  });
  document.querySelectorAll('.button').forEach((button) => {
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    button.addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = button.getBoundingClientRect();
        const x = (pointerX - rect.left - rect.width / 2) * .08;
        const y = (pointerY - rect.top - rect.height / 2) * .08;
        button.style.transform = `translate3d(${x}px, ${y - 2}px, 0)`;
        frame = 0;
      });
    }, { passive: true });
    button.addEventListener('pointerleave', () => { button.style.transform = ''; });
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();
