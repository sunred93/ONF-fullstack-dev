function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  const cartToSave = cart.filter((item) => item.quantity > 0);
  localStorage.setItem("cart", JSON.stringify(cartToSave));
  updateCartCount(cartToSave);

  if (typeof populateCartDropdown === "function") {
    const cartDropdownEl = document.getElementById("cartDropdown");
    if (cartDropdownEl && cartDropdownEl.classList.contains("show")) {
      populateCartDropdown();
    }
  }
}

function updateCartCount(cart) {
  const countEl = document.querySelector(".cart-item-count");
  if (countEl) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.textContent = totalItems;
  }
}

function addItemToCart(productData) {
  let cart = getCart();
  const existingItem = cart.find((item) => item.id === productData.id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...productData, quantity: 1 });
  }
  saveCart(cart);
}

let cartDropdownListGlobal, cartDropdownTotalElGlobal;
let populateCartDropdown;

document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.querySelector(".shopping-cart");
  const cartDropdown = document.getElementById("cartDropdown");
  const closeCartDropdownBtn = document.querySelector(".close-cart-dropdown");
  const goToCheckoutBtn = document.getElementById("gotoheckout");

  cartDropdownListGlobal = document.getElementById("cartDropdownList");
  cartDropdownTotalElGlobal = document.getElementById("cartDropdownTotal");

  function toggleCartDropdown() {
    if (!cartDropdown.classList.contains("show")) {
      populateCartDropdown();
    }
    cartDropdown.classList.toggle("show");
  }

  populateCartDropdown = function () {
    const cart = getCart();
    Array.from(
      cartDropdownListGlobal.querySelectorAll(".cart-dropdown-item")
    ).forEach((el) => el.remove());

    let emptyMsgEl = cartDropdownListGlobal.querySelector(
      ".cart-empty-message"
    );

    if (cart.length === 0) {
      if (!emptyMsgEl) {
        emptyMsgEl = document.createElement("p");
        emptyMsgEl.className = "cart-empty-message";
        emptyMsgEl.textContent = "cart is empty.";
        cartDropdownListGlobal.insertBefore(
          emptyMsgEl,
          cartDropdownListGlobal.firstChild
        );
      }
      emptyMsgEl.classList.add("show");
      emptyMsgEl.style.display = "";
    } else {
      if (emptyMsgEl) {
        emptyMsgEl.classList.remove("show");
        emptyMsgEl.style.display = "none";
      }

      cart.forEach((item) => {
        const itemEl = document.createElement("div");
        itemEl.className = "cart-dropdown-item";
        itemEl.innerHTML = `
         <div class="cart-item--layout">
    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
    <div class="cart-item-details">
      <div class="cart-iteminfo">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${item.price.toFixed(2)} kr</p>
      </div>
      <button class="remove-item-btn" data-id="${item.id}" aria-label="Remove ${
          item.name
        }">🗑️</button>
       <div class="cart-item-quantity-controls"> 
            <button class="quantity-btn minus-btn" data-id="${
              item.id
            }" aria-label="Reduce quantity">-</button>
            <input type="number" class="quantity-input" value="${
              item.quantity
            }" min="1" data-id="${item.id}" aria-label="Quantity">
            <button class="quantity-btn plus-btn" data-id="${
              item.id
            }" aria-label="Increase quantity">+</button>
        </div>
    </div>
  </div>
        `;
        cartDropdownListGlobal.appendChild(itemEl);
      });
    }
    updateCartDropdownTotal(cart);
  };

  function updateCartDropdownTotal(cart) {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (cartDropdownTotalElGlobal) {
      cartDropdownTotalElGlobal.textContent = total.toFixed(2);
    }
  }

  // ---  "Add to basket" logic ---
  document.body.addEventListener("click", (e) => {
    if (!e.target.matches(".add-btn")) return;

    const productData = {
      id: e.target.dataset.id,
      name: e.target.dataset.name,
      price: parseFloat(e.target.dataset.price),
      unit: e.target.dataset.unit,
      weight: e.target.dataset.weight,
      image: e.target.dataset.image,
    };

    if (!productData.id) {
      console.error(
        "Product ID is missing from button data attributes.",
        e.target
      );
      return;
    }
    addItemToCart(productData); //global addItemToCart()

    e.target.textContent = "Added ✓";
    setTimeout(() => (e.target.textContent = "Add to basket ↑"), 1000);
  });

  // --- Event Listeners for Dropdown-cart ---
  cartDropdownListGlobal.addEventListener("click", (e) => {
    const target = e.target;
    const itemId = target.dataset.id;
    let cart = getCart();
    let itemChanged = false;

    if (target.classList.contains("plus-btn")) {
      const item = cart.find((i) => i.id === itemId);
      if (item) {
        item.quantity++;
        itemChanged = true;
      }
      e.stopPropagation();
    } else if (target.classList.contains("minus-btn")) {
      const itemIndex = cart.findIndex((i) => i.id === itemId);
      if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
          cart[itemIndex].quantity--;
        } else {
          cart.splice(itemIndex, 1);
        }
        itemChanged = true;
      }
      e.stopPropagation();
    } else if (target.classList.contains("remove-item-btn")) {
      const itemIndex = cart.findIndex((i) => i.id === itemId);
      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        itemChanged = true;
      }
      e.stopPropagation();
    }

    if (itemChanged) {
      saveCart(cart);
      populateCartDropdown();
    }
  });

  cartDropdownListGlobal.addEventListener("change", (e) => {
    if (e.target.classList.contains("quantity-input")) {
      const itemId = e.target.dataset.id;
      let newQuantity = parseInt(e.target.value, 10);
      let cart = getCart();
      const itemIndex = cart.findIndex((i) => i.id === itemId);

      if (itemIndex !== -1) {
        if (Number.isInteger(newQuantity) && newQuantity >= 1) {
          cart[itemIndex].quantity = newQuantity;
        } else {
          cart[itemIndex].quantity = newQuantity;
        }
        saveCart(cart);
        populateCartDropdown();
      }
    }
  });

  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleCartDropdown();
    });
  }

  if (closeCartDropdownBtn) {
    closeCartDropdownBtn.addEventListener("click", toggleCartDropdown);
  }

  if (goToCheckoutBtn) {
    goToCheckoutBtn.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  }

  document.addEventListener("click", (e) => {
    if (
      cartDropdown &&
      cartDropdown.classList.contains("show") &&
      !cartDropdown.contains(e.target) &&
      cartIcon &&
      !cartIcon.contains(e.target)
    ) {
      cartDropdown.classList.remove("show");
    }
  });

  const initialCart = getCart();
  updateCartCount(initialCart);
  populateCartDropdown();
});
