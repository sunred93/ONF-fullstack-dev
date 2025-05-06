const hamburgerBtn = document.querySelector('.hamburger-menu-btn');
const panel        = document.querySelector('.dropdown-menu');
const closeBtn     = document.querySelector('.close-menu-btn');

// open panel
hamburgerBtn.addEventListener('click', e => {
  e.stopPropagation();
  panel.classList.add('show');
});

// close via ✕ button
closeBtn.addEventListener('click', e => {
  e.stopPropagation();
  panel.classList.remove('show');
});

// close when clicking outside
document.addEventListener('click', e => {
  if (!panel.contains(e.target) && !hamburgerBtn.contains(e.target)) {
    panel.classList.remove('show');
  }
});