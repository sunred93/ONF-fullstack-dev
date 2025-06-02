document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initCartForCheckout();
  initNewsletterForm();
  const checkoutOrderList = document.getElementById("checkoutOrderList");
  const checkoutTotalAmount = document.getElementById("checkoutTotalAmount");
  const checkoutForm = document.getElementById("checkoutForm");

  function displayCheckoutItems() {
    const cart = getCart(); // cart.js
    checkoutOrderList.innerHTML = "";

    if (cart.length === 0) {
      checkoutOrderList.innerHTML =
        '<p class="cart-empty-message show">cart is empty. <a href="products.html">Continue shopping</a>.</p>';
      if (checkoutTotalAmount) checkoutTotalAmount.textContent = "0.00";
      if (checkoutForm) {
        const placeOrderBtn = checkoutForm.querySelector(".btn-place-order");
        if (placeOrderBtn) placeOrderBtn.disabled = true;
      }
      return;
    }

    if (checkoutForm) {
      const placeOrderBtn = checkoutForm.querySelector(".btn-place-order");
      if (placeOrderBtn) placeOrderBtn.disabled = false;
    }

    cart.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("checkout-item");
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="checkout-item-image">
        <div class="checkout-item-info">
          <p class="checkout-item-name">${item.name}</p>
          <p class="checkout-item-qty-price">Quantity: ${
            item.quantity
          } at ${item.price.toFixed(2)} kr</p>
        </div>
        <p class="checkout-item-line-total">${(
          item.quantity * item.price
        ).toFixed(2)} kr</p>
      `;
      checkoutOrderList.appendChild(itemEl);
    });

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (checkoutTotalAmount) {
      checkoutTotalAmount.textContent = total.toFixed(2);
    }
  }

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // demo:
      const name = document.getElementById("checkoutFullName").value;
      alert(`Thank you for your order, ${name}! (This is a demo)`);

      saveCart([]);
      updateCartCount([]);

      window.location.href = "index.html";
    });
  }

  displayCheckoutItems();
});

function initCartForCheckout() {
  if (typeof updateCartCount === "function" && typeof getCart === "function") {
    const cart = getCart();
    updateCartCount(cart);
  }
}

function initMenu() {
  const menuBtn = document.querySelector(".hamburger-menu-btn");
  const menu = document.querySelector(".dropdown-menu");
  const closeBtn = document.querySelector(".close-menu-btn");

  if (menuBtn && menu && closeBtn) {
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
    msg.style.color = "var(--green)";
    form.reset();
  });
}
