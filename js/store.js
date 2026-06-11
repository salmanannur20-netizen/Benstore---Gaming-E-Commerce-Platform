/**
 * Benstore — Store Catalog Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const storeGrid = document.getElementById('storeGrid');
    if (!storeGrid) return; // Not on store page

    let currentProducts = [...PRODUCTS];
    
    // UI Elements
    const filterContainer = document.getElementById('filterContainer');
    const sortSelect = document.getElementById('sortSelect');
    const searchInput = document.getElementById('searchInput');
    const resultsCount = document.getElementById('resultsCount');

    // 1. Render Genres Filters
    function renderFilters() {
        const genres = ['All', ...getGenres()];
        filterContainer.innerHTML = genres.map(genre => 
            `<button class="filter-pill ${genre === 'All' ? 'active' : ''}" data-filter="${genre}">${genre}</button>`
        ).join('');

        // Event listeners for filters
        document.querySelectorAll('.filter-pill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active class
                document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                // Apply filter
                const genre = e.target.getAttribute('data-filter');
                applyFiltersAndSort(genre, searchInput.value, sortSelect.value);
            });
        });
    }

    // 2. Main Render Function
    function renderGrid(products) {
        resultsCount.innerHTML = `Showing <span>${products.length}</span> games`;

        if (products.length === 0) {
            storeGrid.innerHTML = `
                <div class="store-empty" style="grid-column: 1/-1;">
                    <i class="fas fa-ghost"></i>
                    <h3>No games found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        storeGrid.innerHTML = products.map(game => `
            <div class="game-card reveal active" data-title="${game.title}">
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
                    <div class="game-meta">
                        <span class="stars">${generateStars(game.rating)}</span>
                        <span>${game.genre}</span>
                    </div>
                    <div class="game-price">${formatPrice(game.price)}</div>
                    <div class="game-actions">
                        <button class="btn-buy" onclick="window.location.href='product.html?id=${game.id}'">Buy Now</button>
                        <button class="btn-cart add-to-cart" onclick="Cart.addToCart(${game.id})"><i class="fas fa-cart-plus"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 3. Filter & Sort Logic
    function applyFiltersAndSort(genre, searchTerm, sortType) {
        let filtered = [...PRODUCTS];

        // Filter by genre
        if (genre !== 'All') {
            filtered = filtered.filter(p => p.genre === genre);
        }

        // Filter by search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(p => p.title.toLowerCase().includes(term));
        }

        // Sort
        switch (sortType) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'newest':
            default:
                filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                break;
        }

        renderGrid(filtered);
    }

    // 4. Setup Listeners
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const activeGenre = document.querySelector('.filter-pill.active').getAttribute('data-filter');
            applyFiltersAndSort(activeGenre, searchInput.value, e.target.value);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const activeGenre = document.querySelector('.filter-pill.active').getAttribute('data-filter');
            applyFiltersAndSort(activeGenre, e.target.value, sortSelect.value);
        });
    }

    // 5. Init
    renderFilters();
    applyFiltersAndSort('All', '', 'newest');
});
