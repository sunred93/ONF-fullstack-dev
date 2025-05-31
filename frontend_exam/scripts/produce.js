document.addEventListener("DOMContentLoaded", init);

function init() {
  initMenu();
  initCart();
  initProduce();
  initBrowseButton();
  initNewsletterForm();
}

function initMenu() {
  const menuBtn = document.querySelector(".hamburger-menu-btn");
  const menu = document.querySelector(".dropdown-menu");
  const closeBtn = document.querySelector(".close-menu-btn");

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.remove("show");
  });

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
      menu.classList.remove("show");
    }
  });
}

function initCart() {
  const countEl = document.querySelector(".cart-item-count");
  let count = parseInt(localStorage.getItem("cartCount")) || 0;
  countEl.textContent = count;

  // delegates all "Add to basket" buttons
  document.body.addEventListener("click", (e) => {
    if (!e.target.matches(".add-btn")) return;
    count++;
    countEl.textContent = count;
    localStorage.setItem("cartCount", count);
    e.target.textContent = "Added ✓";
    setTimeout(() => (e.target.textContent = "Add to basket ↑"), 1000);
  });
}

function initProduce() {
  fetch("json/produce.json")
    .then((res) => res.json())
    .then((produce) => {
      const grid = document.querySelector(".product-grid");
      grid.innerHTML = "";

      produce.forEach((item) => {
        grid.innerHTML += `
          <div class="produce-card">
            <div class="image-wrapper">
              <img src="${item.image}" alt="${item.name}" />
              <button class="add-btn">Add to basket ↑</button>
            </div>
            <div class="info">
              <div class="title">${item.name}</div>
              <div class="price">${item.price} kr / ${item.unit}</div>
            <div class="weight">${item.weight}</div>
          </div>
        `;
      });
    });
}

function initBrowseButton() {
  const btn = document.getElementById("browse");
  btn?.addEventListener("click", () => {
    window.location.href = "products.html";
  });
}

function initNewsletterForm() {
  const form = document.getElementById("subscribe-form");
  const msg = document.getElementById("subscribe-message");
  if (!form || !msg) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fn = form.firstName.value.trim();
    const em = form.email.value.trim();

    if (!fn || !em) {
      msg.textContent = "Please fill in both fields.";
      msg.style.color = "orange";
      return;
    }

    msg.textContent = `Thanks for subscribing, ${fn}!`;
    msg.style.color = "lightgreen";
    form.reset();
  });
}
