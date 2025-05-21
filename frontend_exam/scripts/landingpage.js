const hamburgerBtn = document.querySelector('.hamburger-menu-btn');
const panel        = document.querySelector('.dropdown-menu');
const closeBtn     = document.querySelector('.close-menu-btn');
const cartCountEl  = document.querySelector('.cart-item-count');
let cartCount = 0;
if (localStorage.getItem("cartCount")) {
  cartCount = parseInt(localStorage.getItem("cartCount"));
  cartCountEl.textContent = cartCount;
}

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
  // — menu toggle
  const menuBtn = document.querySelector(".hamburger-menu-btn");
  const dropdown = document.querySelector(".dropdown-menu");
  const closeBtn = document.querySelector(".close-menu-btn");

  menuBtn.addEventListener("click", () => {
    dropdown.classList.add("show");
  });
  closeBtn.addEventListener("click", () => {
    dropdown.classList.remove("show");
  });
  document.addEventListener("click", e => {
    if (!dropdown.contains(e.target) && !menuBtn.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });

  // — load and display popular produce
  fetch("json/produce.json")
    .then(res => res.json())
    .then(data => {
      const grid = document.querySelector(".popular-produce .produce-grid");
      grid.innerHTML = "";

      const popularItems = data.filter(item => item.popular).slice(0, 3);

      popularItems.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("produce-card");
        card.innerHTML = `
          <div class="image-wrapper">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
            <button class="add-btn">Add to basket ↑</button>
          </div>
          <div class="info">
            <div class="title">${item.name}</div>
            <div class="price">${item.price} kr / ${item.unit}</div>
          </div>
          <div class="weight">${item.weight}</div>
        `;
        grid.appendChild(card);
      });

      // — Add-to-cart logic for dynamically added buttons
      document.querySelectorAll(".add-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          cartCount += 1;
          cartCountEl.textContent = cartCount;
          localStorage.setItem("cartCount", cartCount);

          btn.textContent = "Added ✓";
          setTimeout(() => btn.textContent = "Add to basket ↑", 1000);
        });
      });
    });

  // — browse button
  const browseBtn = document.getElementById("browse");
  if (browseBtn) {
    browseBtn.addEventListener("click", () => {
      window.location.href = 'products.html';
    });
  }

  // — newsletter form
  const form = document.getElementById("subscribe-form");
  const msg = document.getElementById("subscribe-message");

  if (form && msg) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const firstName = form.firstName.value.trim();
      const email = form.email.value.trim();

      if (!firstName || !email) {
        msg.textContent = "Please fill in both fields.";
        msg.style.color = "orange";
        return;
      }

      msg.textContent = `Thanks for subscribing, ${firstName}!`;
      msg.style.color = "lightgreen";
      form.reset();
    });
  }
});
