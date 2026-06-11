/**
 * Benstore — Checkout Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const checkoutContainer = document.getElementById('checkoutOrderReview');
    if (!checkoutContainer) return;

    // Render Cart Items for Review
    function renderOrderReview() {
        const cart = Cart.getCart();
        
        if (cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }

        const itemsHtml = cart.map(item => {
            const product = getProductById(item.id);
            if (!product) return '';
            
            return `
                <div class="checkout-order-item">
                    <img src="${resolveAssetPath(product.image)}" alt="${product.title}">
                    <div class="checkout-order-item-info">
                        <h4>${product.title}</h4>
                        <span>Qty: ${item.qty}</span>
                    </div>
                    <div class="item-price">${formatPrice(product.price * item.qty)}</div>
                </div>
            `;
        }).join('');

        checkoutContainer.innerHTML = itemsHtml;

        // Render Totals
        const subtotal = Cart.getCartTotal();
        const tax = Math.floor(subtotal * 0.11); // 11% Tax
        const total = subtotal + tax;

        document.getElementById('checkoutSubtotal').textContent = formatPrice(subtotal);
        document.getElementById('checkoutTax').textContent = formatPrice(tax);
        document.getElementById('checkoutTotal').textContent = formatPrice(total);
    }

    renderOrderReview();

    // Payment method selection styling
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            paymentOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            const radio = opt.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    // Form Submission Simulation
    const checkoutForm = document.getElementById('checkoutForm');
    const successModal = document.getElementById('checkoutSuccessModal');
    
    if (checkoutForm && successModal) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state on button
            const btn = checkoutForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                Cart.clearCart();
                successModal.classList.add('active');
            }, 1500);
        });
    }
});
