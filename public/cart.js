(function () {
  let cart = JSON.parse(localStorage.getItem("dd-cart") || "[]");

  function saveCart() {
    localStorage.setItem("dd-cart", JSON.stringify(cart));
  }

  function updateBadge() {
    const badge = document.getElementById("cart-badge");
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    if (badge) {
      badge.textContent = total;
      badge.style.display = total > 0 ? "flex" : "none";
    }
  }

  function renderCart() {
    const list = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");
    if (!list) return;

    if (cart.length === 0) {
      list.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
      if (totalEl) totalEl.textContent = "$0.00";
      return;
    }

    list.innerHTML = cart
      .map(
        (item, i) =>
          '<div class="cart-item">' +
          '<div class="cart-item-info">' +
          '<span class="cart-item-name">' + item.name + "</span>" +
          '<span class="cart-item-price">$' + item.price.toFixed(2) + "</span>" +
          "</div>" +
          '<div class="cart-item-controls">' +
          '<button class="cart-qty-btn" data-action="dec" data-index="' + i + '">-</button>' +
          '<span class="cart-qty">' + item.qty + "</span>" +
          '<button class="cart-qty-btn" data-action="inc" data-index="' + i + '">+</button>' +
          '<button class="cart-remove-btn" data-index="' + i + '">&times;</button>' +
          "</div>" +
          "</div>"
      )
      .join("");

    var total = cart.reduce(function (s, item) {
      return s + item.price * item.qty;
    }, 0);
    if (totalEl) totalEl.textContent = "$" + total.toFixed(2);
  }

  function openCart() {
    var overlay = document.getElementById("cart-overlay");
    var panel = document.getElementById("cart-panel");
    if (overlay && panel) {
      overlay.classList.add("active");
      panel.classList.add("active");
      renderCart();
    }
  }

  function closeCart() {
    var overlay = document.getElementById("cart-overlay");
    var panel = document.getElementById("cart-panel");
    if (overlay && panel) {
      overlay.classList.remove("active");
      panel.classList.remove("active");
    }
  }

  // Add to cart
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".add-btn");
    if (btn) {
      var card = btn.closest(".card");
      if (!card) return;
      var name = card.querySelector(".card-name").textContent.trim();
      var priceText = card.querySelector(".price").textContent.trim();
      var price = parseFloat(priceText.replace("$", ""));

      var existing = cart.find(function (item) {
        return item.name === name;
      });
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name: name, price: price, qty: 1 });
      }
      saveCart();
      updateBadge();

      // Flash feedback
      btn.textContent = "Added!";
      btn.style.background = "#2e7d32";
      setTimeout(function () {
        btn.textContent = "Add to Cart";
        btn.style.background = "";
      }, 800);
    }

    // Cart icon click
    if (e.target.closest("#cart-toggle")) {
      openCart();
    }

    // Close cart
    if (e.target.closest("#cart-close") || e.target.id === "cart-overlay") {
      closeCart();
    }

    // Qty buttons
    var qtyBtn = e.target.closest(".cart-qty-btn");
    if (qtyBtn) {
      var index = parseInt(qtyBtn.dataset.index);
      var action = qtyBtn.dataset.action;
      if (action === "inc") {
        cart[index].qty++;
      } else if (action === "dec") {
        cart[index].qty--;
        if (cart[index].qty <= 0) cart.splice(index, 1);
      }
      saveCart();
      updateBadge();
      renderCart();
    }

    // Remove button
    var removeBtn = e.target.closest(".cart-remove-btn");
    if (removeBtn) {
      var idx = parseInt(removeBtn.dataset.index);
      cart.splice(idx, 1);
      saveCart();
      updateBadge();
      renderCart();
    }
  });

  // Init badge on load
  updateBadge();
})();
