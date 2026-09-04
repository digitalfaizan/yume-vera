const featuredProducts = document.getElementById("featured-products");

const featured = products.slice(0, 5);


/* =========================
   CREATE PRODUCTS
========================= */

featuredProducts.innerHTML = featured.map(product => {

    return `
    <article class="product-card">

        <div class="product-slider">

            <div class="slides">

                <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                    class="product-slide active"
                >

                <img
                    src="${product.images[1]}"
                    alt="${product.name}"
                    class="product-slide"
                >

            </div>

            <button class="slider-btn prev" type="button">
                ‹
            </button>

            <button class="slider-btn next" type="button">
                ›
            </button>

            <div class="slider-dots">
                <span class="dot active"></span>
                <span class="dot"></span>
            </div>

        </div>


        <!-- PRODUCT INFORMATION -->

        <a
            href="product.html?id=${product.id}"
            class="product-link"
        >

            <h3>${product.name}</h3>

            <p>
                ${product.size} · Eau de Parfum
            </p>

            <span>
                ₹${product.price}
            </span>

        </a>


        <!-- ACTION BUTTONS -->

        <div class="product-actions">

            <button
                class="product-add-cart"
                data-product-id="${product.id}"
                type="button"
            >
                ADD TO CART
            </button>

            <button
                class="product-buy-now"
                data-product-id="${product.id}"
                type="button"
            >
                BUY NOW
            </button>

        </div>

    </article>
`;

}).join("");


/* =========================
   VIEW ALL CARD
========================= */

featuredProducts.insertAdjacentHTML("beforeend", `

    <a href="perfumes.html" class="view-all-card">

        <span>VIEW ALL</span>

        <strong>
            PERFUMES →
        </strong>

    </a>

`);


/* =========================
   INDIVIDUAL IMAGE SLIDERS
========================= */

document.querySelectorAll(".product-slider").forEach(slider => {

    const slides = slider.querySelectorAll(".product-slide");
    const dots = slider.querySelectorAll(".dot");

    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");

    let current = 0;


    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        dots.forEach(dot => {
            dot.classList.remove("active");
        });

        slides[index].classList.add("active");
        dots[index].classList.add("active");

        current = index;
    }


    next.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();

        let nextIndex = current + 1;

        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }

        showSlide(nextIndex);

    });


    prev.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();

        let prevIndex = current - 1;

        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }

        showSlide(prevIndex);

    });


    dots.forEach((dot, index) => {

        dot.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            showSlide(index);

        });

    });

});


/* =========================
   COLLECTION SLIDER
========================= */

const productTrack =
    document.getElementById("featured-products");

const collectionPrev =
    document.querySelector(".collection-prev");

const collectionNext =
    document.querySelector(".collection-next");

let collectionPosition = 0;


function getSlideAmount() {

    const card =
        productTrack.querySelector(".product-card");

    const gap =
        parseInt(
            window.getComputedStyle(productTrack).gap
        );

    return card.offsetWidth + gap;
}


/* NEXT */

collectionNext.addEventListener("click", () => {

    const items =
        productTrack.querySelectorAll(
            ".product-card, .view-all-card"
        );

    const visibleCards =
        window.innerWidth <= 768 ? 1 : 3;

    const maxPosition =
        items.length - visibleCards;


    if (collectionPosition < maxPosition) {

        collectionPosition++;

        productTrack.scrollTo({
            left:
                collectionPosition *
                getSlideAmount(),

            behavior: "smooth"
        });

    }

});


/* PREVIOUS */

collectionPrev.addEventListener("click", () => {

    if (collectionPosition > 0) {

        collectionPosition--;

        productTrack.scrollTo({
            left:
                collectionPosition *
                getSlideAmount(),

            behavior: "smooth"
        });

    }

});



/* =========================
   PRODUCT ACTIONS
========================= */

document.querySelectorAll(".product-add-cart").forEach(button => {

    button.addEventListener("click", () => {

        const productId = button.dataset.productId;

        const product = products.find(
            item => item.id === productId
        );

        if (!product) return;


        let cart =
            JSON.parse(localStorage.getItem("yumeVeraCart")) || [];


        const existing =
            cart.find(item => item.id === product.id);


        if (existing) {

            existing.quantity++;

        } else {

            cart.push({

                id: product.id,

                name: product.name,

                price: product.price,

                size: product.size,

                image: product.images[0],

                quantity: 1

            });

        }


        localStorage.setItem(
            "yumeVeraCart",
            JSON.stringify(cart)
        );


        button.textContent = "ADDED ✓";


        setTimeout(() => {

            button.textContent = "ADD TO CART";

        }, 1500);

    });

});


/* =========================
   BUY NOW
========================= */

document.querySelectorAll(".product-buy-now").forEach(button => {

    button.addEventListener("click", () => {

        const productId = button.dataset.productId;

        const product = products.find(
            item => item.id === productId
        );

        if (!product) return;


        const cart = [{

            id: product.id,

            name: product.name,

            price: product.price,

            size: product.size,

            image: product.images[0],

            quantity: 1

        }];


        localStorage.setItem(
            "yumeVeraCart",
            JSON.stringify(cart)
        );


        window.location.href = "checkout.html";

    });

});