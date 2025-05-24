document.addEventListener("DOMContentLoaded", init);

function init() {
  initMenu();
  initCart();
  initProduceSlider();
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

function initProduceSlider() {
  fetch("json/produce.json")
    .then((r) => r.json())
    .then((data) => {
      const items = data.filter((p) => p.popular).slice(0, 3);
      const wrapper = document.querySelector(".produce-swiper .swiper-wrapper");
      wrapper.innerHTML = items.map(renderSlide).join("");

      new Swiper(".produce-swiper", {
        loop: false,
        spaceBetween: 30,
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          769: { slidesPerView: 3 },
        },
      });
    })
    .catch((err) => console.error("Produce load error:", err));
}

function renderSlide(item) {
  return `
    <div class="swiper-slide produce-slide">
      <div class="produce-card">
        <div class="image-wrapper">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <button class="add-btn">Add to basket ↑</button>
        </div>
        <div class="info">
          <div class="title">${item.name}</div>
          <div class="price">${item.price} kr / ${item.unit}</div>
        </div>
        <div class="weight">${item.weight}</div>
      </div>
    </div>
  `;
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
