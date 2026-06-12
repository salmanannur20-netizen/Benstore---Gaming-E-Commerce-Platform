/**
 * Benstore — Cart System
 * Manages shopping cart with localStorage persistence.
 */

const Cart = {
  STORAGE_KEY: "benstore_cart",

  getCart() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveCart(cart) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    this.updateBadge();
    this.renderSidebar();
  },

  addToCart(productId, qty = 1) {
    const cart = this.getCart();
    const existing = cart.find((item) => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: productId, qty });
    }
    this.saveCart(cart);
    const product = getProductById(productId);
    if (product) {
      showToast(`${product.title} added to cart!`, "success");
    }
  },

  removeFromCart(productId) {
    let cart = this.getCart();
    const product = getProductById(productId);
    cart = cart.filter((item) => item.id !== productId);
    this.saveCart(cart);
    if (product) {
      showToast(`${product.title} removed from cart`, "info");
    }
  },

  updateQuantity(productId, qty) {
    const cart = this.getCart();
    const item = cart.find((i) => i.id === productId);
    if (item) {
      item.qty = Math.max(1, qty);
      this.saveCart(cart);
    }
  },

  getCartCount() {
    return this.getCart().reduce((sum, item) => sum + item.qty, 0);
  },

  getCartTotal() {
    return this.getCart().reduce((sum, item) => {
      const product = getProductById(item.id);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
  },

  clearCart() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.updateBadge();
    this.renderSidebar();
  },

  updateBadge() {
    const badges = document.querySelectorAll(".cart-badge");
    const count = this.getCartCount();
    badges.forEach((badge) => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "block" : "none";
    });
  },

  // Cart Sidebar
  openSidebar() {
    const sidebar = document.querySelector(".cart-sidebar");
    const overlay = document.querySelector(".cart-overlay");
    if (sidebar) sidebar.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  },

  closeSidebar() {
    const sidebar = document.querySelector(".cart-sidebar");
    const overlay = document.querySelector(".cart-overlay");
    if (sidebar) sidebar.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  },

  renderSidebar() {
    const itemsContainer = document.querySelector(".cart-sidebar-items");
    const totalEl = document.querySelector(".cart-sidebar-total .amount");
    if (!itemsContainer) return;

    const cart = this.getCart();
    if (cart.length === 0) {
      itemsContainer.innerHTML = `
                <div class="cart-empty-state">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Your cart is empty</p>
                    <a href="${resolveAssetPath("pages/store.html")}" class="btn-primary" style="display:inline-block;padding:10px 25px;font-size:0.9rem;">Browse Games</a>
                </div>`;
      if (totalEl) totalEl.textContent = "Rp 0";
      return;
    }

    itemsContainer.innerHTML = cart
      .map((item) => {
        const p = getProductById(item.id);
        if (!p) return "";
        return `
                <div class="cart-sidebar-item" data-id="${p.id}">
                    <img src="${resolveAssetPath(p.image)}" alt="${p.title}">
                    <div class="cart-sidebar-item-info">
                        <h4>${p.title}</h4>
                        <span class="price">${formatPrice(p.price)}</span>
                        <div class="cart-sidebar-item-qty">
                            <button onclick="Cart.updateQuantity(${p.id}, ${item.qty - 1})">−</button>
                            <span>${item.qty}</span>
                            <button onclick="Cart.updateQuantity(${p.id}, ${item.qty + 1})">+</button>
                        </div>
                    </div>
                    <button class="cart-sidebar-item-remove" onclick="Cart.removeFromCart(${p.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>`;
      })
      .join("");

    if (totalEl) totalEl.textContent = formatPrice(this.getCartTotal());
  },

  init() {
    this.updateBadge();
    this.renderSidebar();

    // Cart icon click
    document.querySelectorAll(".cart-icon").forEach((icon) => {
      icon.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        Cart.openSidebar();
      });
    });

    // Close sidebar
    const closeBtn = document.querySelector(".cart-sidebar-close");
    if (closeBtn) closeBtn.addEventListener("click", () => Cart.closeSidebar());

    const overlay = document.querySelector(".cart-overlay");
    if (overlay) overlay.addEventListener("click", () => Cart.closeSidebar());
  },
};

/**
 * Toast Notification System
 */
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    info: "fa-info-circle",
  };
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
