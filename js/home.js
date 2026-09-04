const featuredProducts = document.getElementById("featured-products");


// Show only 5 products
const featured = products.slice(0, 5);


// Create products
featuredProducts.innerHTML = featured.map(product => {

    return `
        <article class="product-card">

            <a
                href="product.html?id=${product.id}"
                class="product-image"
                data-first="${product.images[0]}"
                data-second="${product.images[1]}"
            >

                <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                >

            </a>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.size} · EAU DE PARFUM
                </p>

                <span>
                    ₹${product.price}
                </span>

            </div>

        </article>
    `;

}).join("");



/* =========================
   IMAGE HOVER / SWIPE
========================= */

document.querySelectorAll(".product-image").forEach(image => {

    const img = image.querySelector("img");

    const firstImage = image.dataset.first;
    const secondImage = image.dataset.second;


    /* -------------------------
       DESKTOP HOVER
    ------------------------- */

    image.addEventListener("mouseenter", () => {

        img.src = secondImage;

    });


    image.addEventListener("mouseleave", () => {

        img.src = firstImage;

    });



    /* -------------------------
       MOBILE SWIPE
    ------------------------- */

    let touchStartX = 0;
    let touchEndX = 0;


    image.addEventListener("touchstart", (event) => {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    image.addEventListener("touchend", (event) => {

        touchEndX = event.changedTouches[0].screenX;


        const swipeDistance =
            touchStartX - touchEndX;


        // Swipe left → second image
        if (swipeDistance > 40) {

            img.src = secondImage;

        }


        // Swipe right → first image
        else if (swipeDistance < -40) {

            img.src = firstImage;

        }

    }, { passive: true });

});



/* =========================
   VIEW ALL BUTTON
========================= */

const viewAllContainer = document.createElement("div");

viewAllContainer.className = "view-all-products";

viewAllContainer.innerHTML = `
    <a href="perfumes.html" class="view-all-btn">
        VIEW ALL PRODUCTS
        <span>→</span>
    </a>
`;

featuredProducts.parentElement.appendChild(viewAllContainer);