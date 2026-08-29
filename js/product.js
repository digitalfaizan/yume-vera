/* =========================
   GET PRODUCT
========================= */

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const product = products.find(
    item => item.id === productId
);


/* =========================
   CHECK PRODUCT
========================= */

if (!product) {

    document.querySelector("main").innerHTML = `
        <section class="product-not-found">

            <h1>PRODUCT NOT FOUND</h1>

            <a href="perfumes.html">
                BACK TO PERFUMES
            </a>

        </section>
    `;

} else {


    /* =========================
       PRODUCT INFORMATION
    ========================= */

    document.title = `${product.name} — Yume Vera`;

    document.getElementById("product-name").textContent =
        product.name;

    document.getElementById("product-inspiration").textContent =
        product.inspiration;

    document.getElementById("product-description").textContent =
        product.description;

    document.getElementById("product-size").textContent =
        product.size;

    document.getElementById("product-price").textContent =
        `₹${product.price}`;


    /* =========================
       MAIN IMAGE
    ========================= */

    const mainImage =
        document.getElementById("product-main-image");

    mainImage.src = product.images[0];

    mainImage.alt = product.name;


    /* =========================
       THUMBNAILS
    ========================= */

    const thumbnails =
        document.getElementById("product-thumbnails");


    product.images.forEach((image, index) => {

        const thumbnail = document.createElement("button");

        thumbnail.className =
            `product-thumbnail ${index === 0 ? "active" : ""}`;

        thumbnail.innerHTML = `
            <img
                src="${image}"
                alt="${product.name}"
            >
        `;


        thumbnail.addEventListener("click", () => {

            mainImage.src = image;

            document
                .querySelectorAll(".product-thumbnail")
                .forEach(item => {
                    item.classList.remove("active");
                });

            thumbnail.classList.add("active");

        });


        thumbnails.appendChild(thumbnail);

    });


    /* =========================
       QUANTITY
    ========================= */

    let quantity = 1;

    const quantityDisplay =
        document.getElementById("quantity");


    document
        .getElementById("quantity-minus")
        .addEventListener("click", () => {

            if (quantity > 1) {

                quantity--;

                quantityDisplay.textContent =
                    quantity;

            }

        });


    document
        .getElementById("quantity-plus")
        .addEventListener("click", () => {

            quantity++;

            quantityDisplay.textContent =
                quantity;

        });


    /* =========================
       BUY NOW
    ========================= */

    document
        .getElementById("buy-now")
        .addEventListener("click", () => {

            const total =
                product.price * quantity;

            alert(
                `${product.name}\nQuantity: ${quantity}\nTotal: ₹${total} + shipping`
            );

        });


    /* =========================
       ADD TO CART
    ========================= */

    document
        .getElementById("add-to-cart")
        .addEventListener("click", () => {

            const cartItem = {

                id: product.id,

                name: product.name,

                price: product.price,

                size: product.size,

                image: product.images[0],

                quantity: quantity

            };


            console.log("Added to cart:", cartItem);

        });

}