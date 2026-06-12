/**
 * Benstore — Main App Entry
 * Handles shared UI logic across all pages.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Systems
  Cart.init();
  Wishlist.init();
  Auth.init();

  // 1. Navbar Scroll Effect
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add("scrolled");
      if (backToTop) backToTop.classList.add("show");
    } else {
      if (navbar) navbar.classList.remove("scrolled");
      if (backToTop) backToTop.classList.remove("show");
    }
  });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenu");
  const navLinks = document.getElementById("navLinks");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = mobileMenuBtn.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // 3. Search UI Toggle (Mobile behavior)
  const searchIcon = document.querySelector(".search-container .fa-search");
  const searchInput = document.getElementById("searchInput");
  if (searchIcon && searchInput && window.innerWidth <= 768) {
    searchIcon.addEventListener("click", () => {
      searchInput.focus();
    });
  }

  // 4. Scroll Reveal Animation
  const revealElements = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    revealElements.forEach((el) => {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // initial trigger

  // 5. Gallery Video Play on Hover
  const galleryVideos = document.querySelectorAll(".gallery-video");
  galleryVideos.forEach((video) => {
    const parent = video.parentElement;
    parent.addEventListener("mouseenter", () => {
      video.play().catch((e) => console.log("Video play error:", e));
    });
    parent.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  // 6. Home Page Top 3 Games Render
  const topGamesGrid = document.getElementById("topGamesGrid");
  if (topGamesGrid) {
    const top3 = PRODUCTS.slice(0, 3);
    topGamesGrid.innerHTML = top3
      .map(
        (game) => `
            <div class="game-card" data-title="${game.title}">
                <div class="game-image">
                    <img src="${resolveAssetPath(game.image)}" alt="${game.title}">
                    <div class="game-badges">
                        ${game.badge ? `<span class="badge ${game.badgeType}">${game.badge}</span>` : ""}
                    </div>
                    <button class="game-wishlist-btn ${Wishlist.isInWishlist(game.id) ? "active" : ""}" data-id="${game.id}" onclick="Wishlist.toggle(${game.id})">
                        <i class="${Wishlist.isInWishlist(game.id) ? "fas" : "far"} fa-heart"></i>
                    </button>
                </div>
                <div class="game-info">
                    <h3><a href="${resolveAssetPath(`pages/product.html?id=${game.id}`)}">${game.title}</a></h3>
                    <div class="game-meta">
                        <span class="stars">${generateStars(game.rating)}</span>
                        <span>${game.genre}</span>
                    </div>
                    <div class="game-price">${formatPrice(game.price)}</div>
                    <div class="game-actions">
                        <button class="btn-buy" onclick="window.location.href='${resolveAssetPath(`pages/product.html?id=${game.id}`)}'">View Detail</button>
                        <button class="btn-cart add-to-cart" onclick="Cart.addToCart(${game.id})"><i class="fas fa-cart-plus"></i></button>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");
  }
});
