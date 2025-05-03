document.addEventListener('DOMContentLoaded', function() {

    const storeItems = {
        1: { id: 1, name: "Always Maxi Duo Sanitary Pads Super Plus x 18", price: 53.95 + (53.95 * 0.4),quantity:0,  image: "src/images/always pad pack.jpeg" },
        2: { id: 2, name: "Lil-lets Tampons x32", price: 54.99 + (54.99 * 0.4), quantity:0, image: "src/images/lilets tampons.jpeg" },
        3: { id: 3, name: "Always Sensitive Sanitary Pads Ultra Super Plus", price: 52.95 + (52.95 * 0.4),quantity:0,  image: "src/images/Always Sensitive Santary Pads Ultra Super Plus.webp" },
        4: { id: 4, name: "PURA Health Alcohol Wipes Hand Sanitizer", price: 32.50 + (32.50 * 0.4), quantity:0,  image: "src/images/Alcohol Wipes Hand Sanitizer.webp" },
        5: { id: 5, name: "Dettol Hand Sanitizer", price: 86.45 + (86.45 * 0.4), quantity:0, image: "src/images/Hand Sanitizer.webp" }
    };

    const gallery = document.querySelector('.gallery');
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById('cartTotal');
    const cartButton = document.getElementById('cart-button');
    const checkoutSection = document.getElementById('checkout');
    const placeOrderButton = document.getElementById('place-order-button');
    const trackOrderButton = document.querySelector('.order-tracking button');
    const trackingResult = document.getElementById('trackingResult');

    let cart = [];

    function createProductCards() {
        const fragment = document.createDocumentFragment();

        for (let key in storeItems) {
            const product = storeItems[key];
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.setAttribute('data-id', product.id);

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            productCard.appendChild(img);

            const name = document.createElement('h2');
            name.textContent = product.name;
            productCard.appendChild(name);

            const price = document.createElement('p');
            price.textContent = `R${product.price.toFixed(2)}`;
            productCard.appendChild(price);

            const quantityControl = document.createElement('div');
            quantityControl.classList.add('quantity-control');

            const quantityDisplay = document.createElement('span');
            quantityDisplay.classList.add('quantity-display');
            quantityDisplay.textContent = '0';
            quantityControl.appendChild(quantityDisplay);

            productCard.appendChild(quantityControl);

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.addEventListener('click', function() {
                addToCart(product.id);
            });
            productCard.appendChild(addToCartButton);

            fragment.appendChild(productCard);
        }

        gallery.appendChild(fragment);
    }

    function addToCart(productId) {
        const product = storeItems[productId];
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1; // Reset quantity to 1
        } else {
            const cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1// Initialize quantity to 1
            };
            cart.push(cartItem);
        }

        updateCart();
        updateProductCardQuantity(productId);
    }

    function updateProductCardQuantity(productId) {
        const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
        const quantityDisplay = productCard.querySelector('.quantity-display');
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            quantityDisplay.textContent = existingItem.quantity;
        } else {
            quantityDisplay.textContent = '0';
        }
    }

    function updateCart() {
        let total = 0;
        let itemCount = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            itemCount += item.quantity;
        });

        console.log('Cart:', cart);
        console.log('Total:', total);

        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = itemCount;
        }
        if (cartTotal) {
            cartTotal.textContent = total.toFixed(2);
        }
    }

    if (cartButton) {
        cartButton.addEventListener('click', function() {
            checkoutSection.style.display = 'block';
            document.querySelector('header').style.display = 'none';
            document.querySelector('nav').style.display = 'none';
            document.querySelector('.gallery').style.display = 'none';
            document.querySelector('.princess-hamper-information').style.display = 'none';
            updateOrderSummary();
        });
    }

    

    if (placeOrderButton) {
        placeOrderButton.addEventListener('click', function() {
            placeOrder();
        });
    }

    function placeOrder() {
        const orderId = uuid.v4();  // Ensure uuid library is included
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        if (!name || !email || !address) {
            alert('Please fill in all fields before placing your order.');
            return;
        }

        const order = {
            id: orderId,
            items: cart,
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
            status: 'Order Received'
        };

        // Simulating order placement and payment
        setTimeout(() => {
            alert(`Thank you for your order, ${name}! Your order ID is ${orderId}. We'll send a confirmation email to ${email} shortly.`);
        }, 1000);
    }

    function trackOrder() {
        const orderId = document.getElementById('orderId').value;
        const trackingResult = document.getElementById('trackingResult');
        
        if (!orderId) {
            alert('Please enter an Order ID to track your order.');
            return;
        }
        
        // Simulating order tracking
        const statuses = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        trackingResult.innerHTML = `
            <h3>Order ID: ${orderId}</h3>
            <p>Status: ${randomStatus}</p>
            <p>Estimated Delivery: Within 3-5 business days</p>
        `;
    }

    // Initialize product cards
    createProductCards();

    // Track Order Button Event
    if (trackOrderButton) {
        trackOrderButton.addEventListener('click', trackOrder);
    }
});
