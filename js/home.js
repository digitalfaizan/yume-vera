const featuredProducts = document.getElementById("featured-products");

const featured = products.slice(0, 5);


/* =========================
   CREATE PRODUCTS
========================= */

featuredProducts.innerHTML = featured.map(product => {

    return `
        <article class="product-card">

    <a
        href="product.html?id=${product.id}"
        class="product-link"
    >

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

            <h3>${product.name}</h3>

            <p>
                ${product.size} · Eau de Parfum
            </p>

                        <span>
                ₹${product.price}
            </span>

        </a>



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