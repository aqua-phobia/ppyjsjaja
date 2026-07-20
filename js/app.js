// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));

// Mobile menu
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
}

// Modal
function openModal() {
  document.getElementById('modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.body.style.overflow = '';
}

// FAQ
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isActive = item.classList.contains('active');
  
  // Close all
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  
  // Open clicked if wasn't active
  if (!isActive) {
    item.classList.add('active');
  }
}

// Calculator
const calcThickness = document.getElementById('calcThickness');
const calcArea = document.getElementById('calcArea');
const thicknessValue = document.getElementById('thicknessValue');
const areaValue = document.getElementById('areaValue');
const calcPrice = document.getElementById('calcPrice');
const calcMaterial = document.getElementById('calcMaterial');
const calcWork = document.getElementById('calcWork');
const calcCoating = document.getElementById('calcCoating');

function updateCalculator() {
  const thickness = parseInt(calcThickness.value);
  const area = parseInt(calcArea.value);
  
  thicknessValue.textContent = thickness;
  areaValue.textContent = area;
  
  // Price calculation logic
  // Итоговая цена за м²: 50мм=1050₽, 70мм=1450₽, 100мм=2050₽ (20₽ за мм + 50₽ база)
  const materialPerM2 = thickness * 20; // rubles per m2 per mm
  const workPerM2 = 40;
  const coatingPerM2 = 10;
  
  const materialCost = Math.round(materialPerM2 * area);
  const workCost = Math.round(workPerM2 * area);
  const coatingCost = Math.round(coatingPerM2 * area);
  const total = materialCost + workCost + coatingCost;
  
  calcMaterial.textContent = materialCost.toLocaleString('ru-RU') + ' ₽';
  calcWork.textContent = workCost.toLocaleString('ru-RU') + ' ₽';
  calcCoating.textContent = coatingCost.toLocaleString('ru-RU') + ' ₽';
  calcPrice.textContent = total.toLocaleString('ru-RU');
}

calcThickness.addEventListener('input', updateCalculator);
calcArea.addEventListener('input', updateCalculator);

// Form handlers
function handleSubmit(e) {
  e.preventDefault();
  alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
  e.target.reset();
}

function handleModalSubmit(e) {
  e.preventDefault();
  alert('Спасибо! Мы перезвоним вам в течение 15 минут.');
  closeModal();
  e.target.reset();
}

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('shadow-md');
  } else {
    header.classList.remove('shadow-md');
  }
  
  lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});