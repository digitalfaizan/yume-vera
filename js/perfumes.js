const allProducts =
    document.getElementById("all-products");


/* =========================
   CREATE PRODUCT CARDS
========================= */

allProducts.innerHTML = products.map(product => {

    return `

        <article class="full-product-card">


            <!-- PRODUCT IMAGE -->

            <div class="full-product-image">

                <div class="full-slides">

                    <img
                        src="${product.images[0]}"
                        alt="${product.name}"
                        class="full-product-slide active"
                    >

                    <img
                        src="${product.images[1]}"
                        alt="${product.name}"
                        class="full-product-slide"
                    >

                </div>


                <!-- IMAGE ARROWS -->

                <button
                    class="full-prev"
                    type="button"
                >
                    ‹
                </button>


                <button
                    class="full-next"
                    type="button"
                >
                    ›
                </button>


                <!-- DOTS -->

                <div class="full-dots">

                    <span class="full-dot active"></span>

                    <span class="full-dot"></span>

                </div>


                <!-- VIEW PRODUCT -->

                <a
                    href="product.html?id=${product.id}"
                    class="view-product-overlay"
                >
                    VIEW PRODUCT →
                </a>

            </div>


            <!-- PRODUCT INFO -->

            <div class="full-product-info">

                <div>

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="full-inspiration">
                        ${product.inspiration}
                    </p>

                </div>


                <div class="full-product-meta">

                    <p>
                        ${product.description}
                    </p>

                    <div class="full-product-price">

                        <span>
                            ₹${product.price}
                        </span>

                        <small>
                            ${product.size}
                        </small>

                    </div>

                </div>


                <!-- ACTIONS -->

                <div class="full-product-actions">

                    <button
                        class="full-add-cart"
                        data-product-id="${product.id}"
                        type="button"
                    >
                        ADD TO CART
                    </button>


                    <button
                        class="full-buy-now"
                        data-product-id="${product.id}"
                        type="button"
                    >
                        BUY NOW
                    </button>

                </div>

            </div>

        </article>

    `;

}).join("");



/* =========================
   IMAGE SLIDERS
========================= */

document
    .querySelectorAll(".full-product-image")
    .forEach(slider => {

        const slides =
            slider.querySelectorAll(
                ".full-product-slide"
            );

        const dots =
            slider.querySelectorAll(
                ".full-dot"
            );

        const prev =
            slider.querySelector(".full-prev");

        const next =
            slider.querySelector(".full-next");


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


        next.addEventListener("click", event => {

            event.preventDefault();

            event.stopPropagation();


            let nextIndex =
                current + 1;


            if (nextIndex >= slides.length) {
                nextIndex = 0;
            }


            showSlide(nextIndex);

        });


        prev.addEventListener("click", event => {

            event.preventDefault();

            event.stopPropagation();


            let prevIndex =
                current - 1;


            if (prevIndex < 0) {
                prevIndex = slides.length - 1;
            }


            showSlide(prevIndex);

        });


        dots.forEach((dot, index) => {

            dot.addEventListener("click", event => {

                event.preventDefault();

                event.stopPropagation();

                showSlide(index);

            });

        });

    });



/* =========================
   ADD TO CART
========================= */

document
    .querySelectorAll(".full-add-cart")
    .forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                button.dataset.productId;


            const product =
                products.find(
                    item => item.id === productId
                );


            if (!product) return;


            let cart =
                JSON.parse(
                    localStorage.getItem("yumeVeraCart")
                ) || [];


            const existing =
                cart.find(
                    item => item.id === product.id
                );


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

                button.textContent =
                    "ADD TO CART";

            }, 1500);

        });

    });



/* =========================
   BUY NOW
========================= */

document
    .querySelectorAll(".full-buy-now")
    .forEach(button => {

        button.addEventListener("click", () => {

            const productId =
                button.dataset.productId;


            const product =
                products.find(
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


            window.location.href =
                "checkout.html";

        });

    });