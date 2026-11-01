'use strict';
const plans = {
  bronze: { name: 'Bronze', price: 'R$ 65,00 / mês', detail: 'Equipamentos básicos, aulas em grupo básicas e acesso em horário comercial.' },
  prata: { name: 'Prata', price: 'R$ 75,00 / mês', detail: 'Aulas avançadas e personal uma vez por semana, com acesso em horário comercial.' },
  ouro: { name: 'Ouro', price: 'R$ 90,00 / mês', detail: 'Acesso ilimitado, aulas premium, personal duas vezes por semana, massagem e sauna.' }
};
const form = document.querySelector('#enrollment-form');
const planSelect = document.querySelector('#plan');
const phoneInput = document.querySelector('#phone');
const nameInput = document.querySelector('#name');
const formView = document.querySelector('#form-view');
const reviewView = document.querySelector('#review-view');
function updatePlan() {
  document.querySelector('#plan-detail').textContent = plans[planSelect.value]?.detail || 'A equipe vai ajudar você a encontrar o plano ideal.';
}
const requestedPlan = new URLSearchParams(window.location.search).get('plano');
if (Object.hasOwn(plans, requestedPlan)) planSelect.value = requestedPlan;
updatePlan();
planSelect.addEventListener('change', updatePlan);
function nationalPhone(value) {
  let digits = value.replace(/\D/g, '');
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) digits = digits.slice(2);
  return digits;
}
phoneInput.addEventListener('input', () => phoneInput.setCustomValidity(''));
nameInput.addEventListener('input', () => nameInput.setCustomValidity(''));
phoneInput.addEventListener('blur', () => {
  const digits = nationalPhone(phoneInput.value);
  if (/^[1-9]{2}\d{8,9}$/.test(digits)) {
    const split = digits.length === 11 ? 7 : 6;
    phoneInput.value = `(${digits.slice(0, 2)}) ${digits.slice(2, split)}-${digits.slice(split)}`;
  }
});
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value.trim().replace(/\s+/g, ' ');
  const phone = nationalPhone(phoneInput.value);
  nameInput.setCustomValidity(name.length >= 3 ? '' : 'Informe seu nome com pelo menos 3 caracteres.');
  phoneInput.setCustomValidity(/^[1-9]{2}\d{8,9}$/.test(phone) ? '' : 'Informe um celular brasileiro com DDD e 10 ou 11 dígitos.');
  if (!form.reportValidity()) return;
  const plan = plans[planSelect.value];
  const planLabel = plan ? `${plan.name} — ${plan.price}` : 'Quero ajuda para escolher';
  document.querySelector('#review-name').textContent = name;
  document.querySelector('#review-phone').textContent = phoneInput.value;
  document.querySelector('#review-plan').textContent = planLabel;
  const message = `Olá, equipe Áries! Quero solicitar minha pré-matrícula.\n\nNome: ${name}\nCelular: ${phone}\nPlano: ${planLabel}\n\nPodem confirmar os valores, horários e próximos passos?`;
  document.querySelector('#whatsapp-link').href = `https://wa.me/5582994181633?text=${encodeURIComponent(message)}`;
  formView.hidden = true;
  reviewView.hidden = false;
  document.querySelector('#step-one').classList.remove('active');
  document.querySelector('#step-two').classList.add('active');
  focusHeading(reviewView.querySelector('h2'));
});
function focusHeading(heading) {
  heading.setAttribute('tabindex', '-1');
  heading.focus();
}
document.querySelector('#edit-details').addEventListener('click', () => {
  reviewView.hidden = true;
  formView.hidden = false;
  document.querySelector('#step-two').classList.remove('active');
  document.querySelector('#step-one').classList.add('active');
  focusHeading(document.querySelector('#form-title'));
});
