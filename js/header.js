const header = document.getElementById("header");

header.innerHTML = `

    <header class="site-header">

        <nav class="navbar">

            <a href="index.html" class="logo">
                YUME VERA
            </a>


            <!-- DESKTOP NAV -->

            <div class="nav-links">

                <a href="index.html">Home</a>

                <a href="perfumes.html">Perfumes</a>

                <a href="create-your-perfume.html">
                    Create Your Perfume
                </a>

                <a href="about.html">About</a>

                <a href="contact.html">Contact</a>

            </div>


            <!-- DESKTOP ACTIONS -->

            <div class="nav-actions">

                <button class="search-btn">
                    Search
                </button>

                <a href="cart.html" class="cart-btn">
                    Cart
                </a>

            </div>


            <!-- MOBILE MENU BUTTON -->

            <button class="hamburger" aria-label="Open menu">

                <span></span>
                <span></span>
                <span></span>

            </button>

        </nav>


        <!-- MOBILE MENU -->

        <div class="mobile-menu">

            <div class="mobile-menu-links">

                <a href="index.html">Home</a>

                <a href="perfumes.html">Perfumes</a>

                <a href="create-your-perfume.html">
                    Create Your Perfume
                </a>

                <a href="about.html">About</a>

                <a href="contact.html">Contact</a>

                <a href="cart.html">Cart</a>

            </div>

        </div>

    </header>

`;


/* =========================
   SCROLL HEADER
========================= */

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {

    const siteHeader = document.querySelector(".site-header");

    const currentScrollY = window.scrollY;


    if (currentScrollY <= 20) {

        siteHeader.classList.remove("scrolled");
        siteHeader.classList.remove("hidden");

        lastScrollY = currentScrollY;

        return;
    }


    if (currentScrollY > lastScrollY) {

        siteHeader.classList.add("hidden");

    } else if (currentScrollY < lastScrollY) {

        siteHeader.classList.remove("hidden");
        siteHeader.classList.add("scrolled");

    }


    lastScrollY = currentScrollY;

});


/* =========================
   MOBILE MENU
========================= */

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");

    mobileMenu.classList.toggle("active");

});