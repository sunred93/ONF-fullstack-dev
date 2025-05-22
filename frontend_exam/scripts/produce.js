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

    const cartCountEl = document.querySelector(".cart-item-count");
    let cartCount = 0;

    document.querySelectorAll(".add-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        cartCount += 1;
        cartCountEl.textContent = cartCount;

        btn.textContent = "Added ✓";
        setTimeout(() => {
          btn.textContent = "Add to basket ↑";
        }, 1000);
      });
    });
  });
