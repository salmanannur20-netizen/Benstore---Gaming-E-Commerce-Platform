/**
 * Benstore — Product Detail Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('productDetailContainer');
    if (!productDetailContainer) return; // Not on product page

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const product = getProductById(productId);

    if (!product) {
        productDetailContainer.innerHTML = `
            <div class="store-empty" style="grid-column: 1/-1;">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Product Not Found</h2>
                <p>The game you are looking for does not exist or has been removed.</p>
                <br>
                <a href="store.html" class="btn-primary">Back to Store</a>
            </div>
        `;
        return;
    }

    // Set Page Title
    document.title = `${product.title} | Benstore`;

    // Render Product Detail
    const inWishlist = Wishlist.isInWishlist(product.id);
    
    productDetailContainer.innerHTML = `
        <div class="product-image-wrap">
            <img src="${resolveAssetPath(product.image)}" alt="${product.title}">
            <div class="product-badges-wrap">
                ${product.badge ? `<span class="badge ${product.badgeType}">${product.badge}</span>` : ''}
            </div>
        </div>
        
        <div class="product-detail">
            <div class="product-rating">
                <span class="stars">${generateStars(product.rating)}</span>
                <span>(${product.rating}/5 Rating)</span>
            </div>
            
            <h1>${product.title}</h1>
            
            <div class="product-meta-info">
                <div class="product-meta-item">
                    <i class="fas fa-tag"></i> ${product.genre}
                </div>
                <div class="product-meta-item">
                    <i class="fas fa-building"></i> ${product.publisher}
                </div>
                <div class="product-meta-item">
                    <i class="fas fa-gamepad"></i> ${product.platform.join(', ')}
                </div>
                <div class="product-meta-item">
                    <i class="fas fa-calendar"></i> ${new Date(product.releaseDate).getFullYear()}
                </div>
            </div>

            <div class="product-price-section">
                <span class="current">${formatPrice(product.price)}</span>
                ${product.originalPrice > product.price ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
                ${product.originalPrice > product.price ? `<span class="discount-tag">-${Math.round((1 - product.price/product.originalPrice)*100)}%</span>` : ''}
            </div>

            <p class="product-description">${product.description}</p>

            <div class="product-features">
                <h3>Key Features:</h3>
                <div class="product-features-list">
                    ${product.features.map(f => `<span>${f}</span>`).join('')}
                </div>
            </div>

            <div class="product-actions">
                ${product.inStock 
                    ? `<button class="btn-primary" onclick="Cart.addToCart(${product.id}); Cart.openSidebar();">Buy Now</button>
                       <button class="btn-cart" onclick="Cart.addToCart(${product.id})" title="Add to Cart"><i class="fas fa-cart-plus"></i></button>`
                    : `<button class="btn-secondary" disabled>Out of Stock</button>`
                }
                <button class="btn-wishlist ${inWishlist ? 'active' : ''}" data-id="${product.id}" onclick="Wishlist.toggle(${product.id})">
                    <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i> ${inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
            </div>
        </div>
    `;

    // Render Related Products
    const relatedGrid = document.getElementById('relatedGrid');
    if (relatedGrid) {
        // Find products in same genre, excluding current
        const related = PRODUCTS.filter(p => p.genre === product.genre && p.id !== product.id).slice(0, 4);
        
        // If not enough in same genre, fill with others
        if (related.length < 4) {
            const others = PRODUCTS.filter(p => p.genre !== product.genre && p.id !== product.id).slice(0, 4 - related.length);
            related.push(...others);
        }

        relatedGrid.innerHTML = related.map(game => `
            <div class="game-card" data-title="${game.title}">
                <div class="game-image">
                    <img src="${resolveAssetPath(game.image)}" alt="${game.title}">
                    <div class="game-badges">
                        ${game.badge ? `<span class="badge ${game.badgeType}">${game.badge}</span>` : ''}
                    </div>
                    <button class="game-wishlist-btn ${Wishlist.isInWishlist(game.id) ? 'active' : ''}" data-id="${game.id}" onclick="Wishlist.toggle(${game.id})">
                        <i class="${Wishlist.isInWishlist(game.id) ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
                <div class="game-info">
                    <h3><a href="product.html?id=${game.id}">${game.title}</a></h3>
                    <div class="game-price">${formatPrice(game.price)}</div>
                    <div class="game-actions">
                        <button class="btn-buy" onclick="window.location.href='product.html?id=${game.id}'">View Detail</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
});
