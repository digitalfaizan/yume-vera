/* =========================================
   YUME VERA — CART
   Requires products.js to be loaded first
   (defines the global `products` array).
========================================= */

const CART_STORAGE_KEY = "yumeVeraCart";

/* Change this in one place when shipping
   logic needs to become dynamic later. */
const SHIPPING_CHARGE = 100;


/* =========================
   STORAGE HELPERS
========================= */

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(CART_STORAGE_KEY)
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveCart(cart) {

    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );

}


/* Look up the live product record so name /
   price / image stay accurate even if the
   cart item was saved a while ago. Falls
   back to what's stored on the cart item
   itself if the product can't be found. */
function resolveCartItem(item) {

    const product = products.find(
        p => p.id === item.id
    );

    if (!product) {
        return item;
    }

    return {

        id: product.id,

        name: product.name,

        price: product.price,

        size: product.size,

        image: product.images[0],

        quantity: item.quantity

    };

}


/* =========================
   DOM REFERENCES
========================= */

const cartSection = document.getElementById("cart-section");
const cartEmptySection = document.getElementById("cart-empty");

const cartItemsEl = document.getElementById("cart-items");

const subtotalEl = document.getElementById("cart-subtotal");
const shippingEl = document.getElementById("cart-shipping");
const totalEl = document.getElementById("cart-total");

const checkoutBtn = document.getElementById("checkout-btn");


/* =========================
   RENDER
========================= */

function formatPrice(amount) {

    return `₹${amount.toLocaleString("en-IN")}`;

}


function renderCart() {

    const rawCart = getCart();

    if (rawCart.length === 0) {

        cartSection.hidden = true;
        cartEmptySection.hidden = false;

        return;

    }

    cartSection.hidden = false;
    cartEmptySection.hidden = true;

    const cart = rawCart.map(resolveCartItem);


    cartItemsEl.innerHTML = cart.map(item => {

        const lineTotal = item.price * item.quantity;

        return `
            <article class="cart-item" data-id="${item.id}">

                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>

                <div class="cart-item-info">

                    <div class="cart-item-top">

                        <div>
                            <h3>${item.name}</h3>
                            <p class="cart-item-size">
                                ${item.size} · EAU DE PARFUM
                            </p>
                        </div>

                        <button
                            class="cart-item-remove"
                            type="button"
                            data-action="remove"
                            data-id="${item.id}"
                            aria-label="Remove ${item.name}"
                        >
                            ×
                        </button>

                    </div>

                    <div class="cart-item-bottom">

                        <div class="quantity cart-item-quantity">

                            <button
                                type="button"
                                data-action="decrease"
                                data-id="${item.id}"
                            >
                                −
                            </button>

                            <span>${item.quantity}</span>

                            <button
                                type="button"
                                data-action="increase"
                                data-id="${item.id}"
                            >
                                +
                            </button>

                        </div>

                        <span class="cart-item-price">
                            ${formatPrice(lineTotal)}
                        </span>

                    </div>

                </div>

            </article>
        `;

    }).join("");


    const subtotal = cart.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    const total = subtotal + SHIPPING_CHARGE;

    subtotalEl.textContent = formatPrice(subtotal);
    shippingEl.textContent = formatPrice(SHIPPING_CHARGE);
    totalEl.textContent = formatPrice(total);

}


/* =========================
   CART ACTIONS
========================= */

function updateQuantity(id, delta) {

    const cart = getCart();

    const item = cart.find(entry => entry.id === id);

    if (!item) return;

    item.quantity += delta;

    if (item.quantity < 1) {
        item.quantity = 1;
    }

    saveCart(cart);
    renderCart();

}


function removeItem(id) {

    const cart = getCart().filter(
        entry => entry.id !== id
    );

    saveCart(cart);
    renderCart();

}


cartItemsEl.addEventListener("click", event => {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = button.dataset.id;
    const action = button.dataset.action;

    if (action === "increase") {
        updateQuantity(id, 1);
    }

    if (action === "decrease") {
        updateQuantity(id, -1);
    }

    if (action === "remove") {
        removeItem(id);
    }

});


checkoutBtn.addEventListener("click", () => {

    window.location.href = "checkout.html";

});


/* =========================
   INIT
========================= */

renderCart();
