const hamburgerBtn = document.querySelector('.hamburger-menu-btn');
const panel        = document.querySelector('.dropdown-menu');
const closeBtn     = document.querySelector('.close-menu-btn');
const cartCountEl  = document.querySelector('.cart-item-count');
let cartCount = 0;

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

document.addEventListener("DOMContentLoaded", () => {
  // — dropdown menu toggle —
  const menuBtn = document.querySelector(".hamburger-menu-btn");
  const dropdown = document.querySelector(".dropdown-menu");
  const closeBtn = document.querySelector(".close-menu-btn");

  menuBtn.addEventListener("click", () => {
    dropdown.classList.add("show");
  });
  closeBtn.addEventListener("click", () => {
    dropdown.classList.remove("show");
  });
  // click outside to close
  document.addEventListener("click", e => {
    if (!dropdown.contains(e.target) && !menuBtn.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });

  // — add to basket logic —
  const cartCountEl = document.querySelector(".cart-item-count");
  let cartCount = 0;
  document.querySelectorAll(".add-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      cartCount += 1;
      cartCountEl.textContent = cartCount;
      // optional: flash the button
      btn.textContent = "Added ✓";
      setTimeout(() => btn.textContent = "Add to basket ↑", 1000);
    });
  });

  //-product page button logic-
  document.getElementById('browse').addEventListener('click', () => {
  window.location.href = 'products.html';
});

  // — newsletter subscribe form —
  const form = document.getElementById("subscribe-form");
  const msg = document.getElementById("subscribe-message");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const firstName = form.firstName.value.trim();
    const email = form.email.value.trim();
    // basic validation
    if (!firstName || !email) {
      msg.textContent = "Please fill in both fields.";
      msg.style.color = "orange";
      return;
    }
    // simulate async signup
    msg.textContent = "Thanks for subscribing, " + firstName + "!";
    msg.style.color = "lightgreen";
    form.reset();
  });
});
