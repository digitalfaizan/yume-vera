document.getElementById("header").innerHTML = `

<header class="site-header">

    <a href="index.html" class="header-logo">
        YUME VERA
    </a>


    <nav class="desktop-nav">

        <a href="index.html">HOME</a>

        <a href="perfume.html">PERFUMES</a>

        

        <a href="about.html">ABOUT</a>

        <a href="contact.html">CONTACT</a>

    </nav>


    <div class="header-actions">

        <a href="#" class="search-link">
            SEARCH
        </a>

        <a href="cart.html" class="cart-link">
            CART
        </a>

    </div>


    <!-- MOBILE MENU BUTTON -->

    <button
        class="hamburger"
        id="hamburger"
        type="button"
        aria-label="Open menu"
    >

        <span></span>
        <span></span>

    </button>


    <!-- MOBILE MENU -->

    <div class="mobile-menu" id="mobile-menu">

        <button
            class="mobile-menu-close"
            id="mobile-menu-close"
            type="button"
        >
            ×
        </button>


        <nav>

            <a href="index.html">
                HOME
            </a>

            <a href="perfume.html">
                PERFUMES
            </a>

            <a href="about.html">
                ABOUT
            </a>

            <a href="contact.html">
                CONTACT
            </a>

            <a href="#">
                SEARCH
            </a>

            <a href="cart.html">
                CART
            </a>

        </nav>

    </div>

</header>

`;

/* =================================
   MOBILE MENU
================================= */

const hamburger =
    document.getElementById("hamburger");

const mobileMenu =
    document.getElementById("mobile-menu");

const mobileClose =
    document.getElementById("mobile-menu-close");


hamburger.addEventListener("click", () => {

    mobileMenu.classList.add("active");

    document.body.classList.add("menu-open");

});


mobileClose.addEventListener("click", () => {

    mobileMenu.classList.remove("active");

    document.body.classList.remove("menu-open");

});


/* Close menu after clicking a link */

mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

            document.body.classList.remove("menu-open");

        });

    });

    /* =================================
   HIDE HEADER ON SCROLL DOWN
   SHOW HEADER ON SCROLL UP
================================= */

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;


    /* Always show header at very top */

    if (currentScrollY <= 20) {

        document
            .querySelector(".site-header")
            .classList.remove("header-hidden");

        lastScrollY = currentScrollY;

        return;
    }


    /* Scrolling DOWN */

    if (currentScrollY > lastScrollY) {

        document
            .querySelector(".site-header")
            .classList.add("header-hidden");

    }


    /* Scrolling UP */

    else if (currentScrollY < lastScrollY) {

        document
            .querySelector(".site-header")
            .classList.remove("header-hidden");

    }


    lastScrollY = currentScrollY;

});