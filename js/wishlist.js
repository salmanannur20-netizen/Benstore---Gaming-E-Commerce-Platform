/**
 * Benstore — Wishlist System
 * Manages wishlist with localStorage persistence.
 */

const Wishlist = {
  STORAGE_KEY: "benstore_wishlist",

  getWishlist() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveWishlist(wishlist) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wishlist));
    this.updateBadge();
    this.updateUI();
  },

  toggle(productId) {
    let wishlist = this.getWishlist();
    const product = getProductById(productId);

    if (!product) return;

    if (wishlist.includes(productId)) {
      wishlist = wishlist.filter((id) => id !== productId);
      showToast(`${product.title} removed from wishlist`, "info");
    } else {
      wishlist.push(productId);
      showToast(`${product.title} added to wishlist!`, "success");
    }

    this.saveWishlist(wishlist);
  },

  isInWishlist(productId) {
    return this.getWishlist().includes(productId);
  },

  updateBadge() {
    const badges = document.querySelectorAll(".wishlist-badge");
    const count = this.getWishlist().length;
    badges.forEach((badge) => {
      badge.textContent = count;
      badge.style.display = count > 0 ? "block" : "none";
    });
  },

  updateUI() {
    // Update all wishlist buttons on the screen
    document
      .querySelectorAll(".game-wishlist-btn, .btn-wishlist")
      .forEach((btn) => {
        const id = parseInt(btn.getAttribute("data-id"));
        if (!id) return;

        if (this.isInWishlist(id)) {
          btn.classList.add("active");
          if (btn.classList.contains("btn-wishlist")) {
            btn.innerHTML = '<i class="fas fa-heart"></i> Remove from Wishlist';
          } else {
            btn.innerHTML = '<i class="fas fa-heart"></i>';
          }
        } else {
          btn.classList.remove("active");
          if (btn.classList.contains("btn-wishlist")) {
            btn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
          } else {
            btn.innerHTML = '<i class="far fa-heart"></i>';
          }
        }
      });
  },

  renderWishlistPage() {
    const container = document.getElementById("wishlistGrid");
    if (!container) return;

    const wishlist = this.getWishlist();
    if (wishlist.length === 0) {
      container.innerHTML = `
                <div class="wishlist-empty" style="grid-column: 1/-1;">
                    <i class="far fa-heart"></i>
                    <h2>Your wishlist is empty</h2>
                    <p>Save items you like in your wishlist. Review them anytime and easily move them to cart.</p>
                    <a href="store.html" class="btn-primary" style="display:inline-block;padding:12px 30px;">Explore Games</a>
                </div>
            `;
      return;
    }

    const items = wishlist.map((id) => getProductById(id)).filter(Boolean);
    container.innerHTML = items
      .map(
        (game) => `
            <div class="game-card" data-title="${game.title}">
                <div class="game-image">
                    <img src="${resolveAssetPath(game.image)}" alt="${game.title}">
                    <div class="game-badges">
                        ${game.badge ? `<span class="badge ${game.badgeType}">${game.badge}</span>` : ""}
                    </div>
                    <button class="game-wishlist-btn active" data-id="${game.id}" onclick="Wishlist.toggle(${game.id}); Wishlist.renderWishlistPage();">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="game-info">
                    <h3><a href="product.html?id=${game.id}">${game.title}</a></h3>
                    <div class="game-meta">
                        <span class="stars">${generateStars(game.rating)}</span>
                        <span>${game.genre}</span>
                    </div>
                    <div class="game-price">${formatPrice(game.price)}</div>
                    <div class="game-actions">
                        <button class="btn-buy" onclick="window.location.href='product.html?id=${game.id}'">View Detail</button>
                        <button class="btn-cart add-to-cart" onclick="Cart.addToCart(${game.id})"><i class="fas fa-cart-plus"></i></button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");
  },

  init() {
    this.updateBadge();
    this.updateUI();
    this.renderWishlistPage();
  },
};
