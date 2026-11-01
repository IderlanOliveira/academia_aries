'use strict';
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function closeMenu() {
  menu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
});
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
const recommendations = {
  bronze: { name: 'Bronze', text: 'O Bronze é seu ponto de partida: equipamentos básicos e aulas em grupo para entrar no ritmo.' },
  prata: { name: 'Prata', text: 'O Prata inclui aulas avançadas e personal uma vez por semana para acompanhar sua evolução.' },
  ouro: { name: 'Ouro', text: 'O Ouro reúne acesso ilimitado, aulas premium e personal duas vezes por semana para uma experiência completa.' }
};
document.querySelectorAll('[data-goal]').forEach((button) => {
  button.addEventListener('click', () => {
    const goal = button.dataset.goal;
    const recommendation = recommendations[goal];
    document.querySelectorAll('[data-goal]').forEach((option) => option.setAttribute('aria-pressed', String(option === button)));
    document.querySelector('#recommendation-text').textContent = recommendation.text;
    const link = document.querySelector('#recommended-plan');
    link.href = `pages/matricula.html?plano=${goal}`;
    link.textContent = `Continuar com ${recommendation.name} ↗`;
  });
});
