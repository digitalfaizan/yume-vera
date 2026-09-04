/* =========================================
   YUME VERA — CHECKOUT
   Requires products.js to be loaded first
   (defines the global `products` array).
========================================= */

const CART_STORAGE_KEY = "yumeVeraCart";

/* Keep this the same value used in cart.js.
   Change shipping logic here later if it
   needs to become dynamic (weight, region…). */
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


function clearCart() {

    localStorage.removeItem(CART_STORAGE_KEY);

}


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


function formatPrice(amount) {

    return `₹${amount.toLocaleString("en-IN")}`;

}


/* =========================
   DOM REFERENCES
========================= */

const checkoutSection = document.getElementById("checkout-section");
const checkoutEmptySection = document.getElementById("checkout-empty");
const checkoutConfirmationSection = document.getElementById("checkout-confirmation");

const summaryItemsEl = document.getElementById("checkout-summary-items");

const subtotalEl = document.getElementById("checkout-subtotal");
const shippingEl = document.getElementById("checkout-shipping");
const totalEl = document.getElementById("checkout-total");

const form = document.getElementById("checkout-form");
const placeOrderBtn = document.getElementById("place-order-btn");

const panelUpi = document.getElementById("panel-upi");
const panelCard = document.getElementById("panel-card");

const confirmationOrderNumberEl = document.getElementById("confirmation-order-number");


/* =========================
   ORDER SUMMARY
========================= */

let orderSubtotal = 0;
let orderTotal = 0;


function renderSummary() {

    const rawCart = getCart();

    if (rawCart.length === 0) {

        checkoutSection.hidden = true;
        checkoutEmptySection.hidden = false;

        return false;

    }

    checkoutSection.hidden = false;
    checkoutEmptySection.hidden = true;

    const cart = rawCart.map(resolveCartItem);


    summaryItemsEl.innerHTML = cart.map(item => {

        const lineTotal = item.price * item.quantity;

        return `
            <div class="checkout-summary-item">

                <div class="checkout-summary-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>

                <div>
                    <p class="checkout-summary-item-name">
                        ${item.name}
                    </p>
                    <p class="checkout-summary-item-qty">
                        QTY ${item.quantity}
                    </p>
                </div>

                <span class="checkout-summary-item-price">
                    ${formatPrice(lineTotal)}
                </span>

            </div>
        `;

    }).join("");


    orderSubtotal = cart.reduce(
        (sum, item) => sum + (item.price * item.quantity),
        0
    );

    orderTotal = orderSubtotal + SHIPPING_CHARGE;

    subtotalEl.textContent = formatPrice(orderSubtotal);
    shippingEl.textContent = formatPrice(SHIPPING_CHARGE);
    totalEl.textContent = formatPrice(orderTotal);

    return true;

}


const hasItems = renderSummary();


/* =========================
   PAYMENT METHOD UI
========================= */

if (hasItems) {

    document
        .querySelectorAll('input[name="paymentMethod"]')
        .forEach(input => {

            input.addEventListener("change", () => {

                panelUpi.hidden = input.value !== "upi";
                panelCard.hidden = input.value !== "card";

                clearFieldError("paymentMethod");

            });

        });

}


/* =========================
   VALIDATION
========================= */

const validators = {

    firstName: value =>
        value.trim().length > 0
            ? ""
            : "First name is required.",

    lastName: value =>
        value.trim().length > 0
            ? ""
            : "Last name is required.",

    email: value => {

        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value.trim().length === 0) {
            return "Email is required.";
        }

        return pattern.test(value.trim())
            ? ""
            : "Enter a valid email address.";

    },

    phone: value => {

        const digits = value.replace(/\D/g, "");

        if (digits.length === 0) {
            return "Phone number is required.";
        }

        return digits.length >= 10
            ? ""
            : "Enter a valid phone number.";

    },

    address: value =>
        value.trim().length > 0
            ? ""
            : "Address is required.",

    city: value =>
        value.trim().length > 0
            ? ""
            : "City is required.",

    state: value =>
        value.trim().length > 0
            ? ""
            : "State is required.",

    pinCode: value => {

        const pattern = /^[0-9]{6}$/;

        if (value.trim().length === 0) {
            return "PIN code is required.";
        }

        return pattern.test(value.trim())
            ? ""
            : "Enter a valid 6-digit PIN code.";

    }

};


function showFieldError(fieldName, message) {

    const errorEl = document.getElementById(`error-${fieldName}`);
    const fieldEl = document.getElementById(fieldName);

    if (errorEl) {
        errorEl.textContent = message;
    }

    if (fieldEl) {
        fieldEl.closest(".form-group").classList.add("has-error");
    }

}


function clearFieldError(fieldName) {

    const errorEl = document.getElementById(`error-${fieldName}`);
    const fieldEl = document.getElementById(fieldName);

    if (errorEl) {
        errorEl.textContent = "";
    }

    if (fieldEl) {
        fieldEl.closest(".form-group").classList.remove("has-error");
    }

}


/* Clear a field's error as soon as the
   person starts fixing it. */
if (hasItems) {

    Object.keys(validators).forEach(fieldName => {

        const fieldEl = document.getElementById(fieldName);

        if (!fieldEl) return;

        fieldEl.addEventListener("input", () => {
            clearFieldError(fieldName);
        });

    });

}


function validateForm() {

    let isValid = true;
    let firstInvalidField = null;

    Object.keys(validators).forEach(fieldName => {

        const fieldEl = document.getElementById(fieldName);
        const message = validators[fieldName](fieldEl.value);

        if (message) {

            showFieldError(fieldName, message);

            isValid = false;

            if (!firstInvalidField) {
                firstInvalidField = fieldEl;
            }

        } else {

            clearFieldError(fieldName);

        }

    });


    const paymentSelected = document.querySelector(
        'input[name="paymentMethod"]:checked'
    );

    if (!paymentSelected) {

        document.getElementById("error-paymentMethod").textContent =
            "Select a payment method.";

        isValid = false;

        if (!firstInvalidField) {
            firstInvalidField = document.getElementById("payment-options");
        }

    } else {

        document.getElementById("error-paymentMethod").textContent = "";

    }


    if (firstInvalidField) {
        firstInvalidField.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }

    return isValid;

}


/* =========================
   PAYMENT GATEWAY INTEGRATION POINT
   ---------------------------------
   This is a stub. It does NOT process a
   real payment and never claims one has
   succeeded. When Razorpay/Cashfree is
   ready, replace the body of this function
   with the real gateway call, keep secret
   keys on the backend only, and resolve
   the promise once the backend confirms
   payment — not before.
========================= */

function initiatePayment(paymentMethod, orderDetails) {

    return new Promise(resolve => {

        // TODO: connect Razorpay/Cashfree here.
        // For Cash on Delivery, no online
        // payment step is required.

        resolve({ demo: true, paymentMethod });

    });

}


function generateOrderNumber() {

    const year = new Date().getFullYear();

    const random = Math.floor(1000 + Math.random() * 9000);

    return `YV-${year}-${random}`;

}


/* =========================
   SUBMIT
========================= */

if (hasItems) {

    form.addEventListener("submit", async event => {

        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const paymentMethod = document.querySelector(
            'input[name="paymentMethod"]:checked'
        ).value;

        placeOrderBtn.disabled = true;
        placeOrderBtn.textContent = "PROCESSING…";

        const orderDetails = {

            customer: {
                firstName: document.getElementById("firstName").value.trim(),
                lastName: document.getElementById("lastName").value.trim(),
                email: document.getElementById("email").value.trim(),
                phone: document.getElementById("phone").value.trim()
            },

            shipping: {
                address: document.getElementById("address").value.trim(),
                apartment: document.getElementById("apartment").value.trim(),
                city: document.getElementById("city").value.trim(),
                state: document.getElementById("state").value.trim(),
                pinCode: document.getElementById("pinCode").value.trim()
            },

            subtotal: orderSubtotal,
            shipping_charge: SHIPPING_CHARGE,
            total: orderTotal,

            paymentMethod

        };

        await initiatePayment(paymentMethod, orderDetails);

        const orderNumber = generateOrderNumber();

        clearCart();

        checkoutSection.hidden = true;

        confirmationOrderNumberEl.textContent = orderNumber;
        checkoutConfirmationSection.hidden = false;

        window.scrollTo({ top: 0, behavior: "smooth" });

    });

}
