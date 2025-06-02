document.addEventListener("DOMContentLoaded", init);
function init() {
  initMenu();
  initCart();
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
  if (typeof updateCartCount === "function") {
    const cart = getCart(); // global getCart()
    updateCartCount(cart); // global updateCartCount()
  }
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
