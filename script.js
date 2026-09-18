document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LOADER
    ========================= */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader.classList.add("hide");
        }, 500);

    });


    /* =========================
       HEADER SCROLL
    ========================= */

    const header = document.getElementById("header");
    const topBtn = document.getElementById("topBtn");

    function handleScroll() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
            topBtn.classList.add("show");
        } else {
            header.classList.remove("scrolled");
            topBtn.classList.remove("show");
        }

    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();


    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const opened = navMenu.classList.contains("open");

        menuBtn.textContent = opened ? "×" : "☰";

        document.body.classList.toggle("no-scroll", opened);

    });


    /* Close menu when link clicked */

    document.querySelectorAll("#navMenu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");
            menuBtn.textContent = "☰";
            document.body.classList.remove("no-scroll");

        });

    });


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });


    /* =========================
       PRODUCT FILTER
    ========================= */

    const filters =
        document.querySelectorAll(".filter");

    const products =
        document.querySelectorAll(".product-card");


    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(item => {
                item.classList.remove("active");
            });

            filter.classList.add("active");

            const selected =
                filter.dataset.filter;


            products.forEach(product => {

                const category =
                    product.dataset.category;


                if (
                    selected === "all" ||
                    category === selected
                ) {

                    product.classList.remove("hidden");

                    product.style.animation =
                        "none";

                    requestAnimationFrame(() => {

                        product.style.animation =
                            "fadeProduct .4s ease";

                    });

                } else {

                    product.classList.add("hidden");

                }

            });

        });

    });


    /* =========================
       PRODUCT MODAL
    ========================= */

    const modal =
        document.getElementById("productModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalWhatsapp =
        document.getElementById("modalWhatsapp");

    const modalCategory =
        document.getElementById("modalCategory");


    const descriptions = {

        "NAYRO Toilet Cleaner":
            "Designed for everyday toilet cleaning and a fresh, clean finish.",

        "NAYRO Glass Cleaner":
            "Made for everyday glass and window cleaning with a polished finish.",

        "NAYRO Multi Surface Cleaner":
            "A versatile solution for everyday household surface cleaning.",

        "NAYRO Kitchen Cleaner":
            "Designed for everyday kitchen cleaning and surface care.",

        "NAYRO Dish Wash Liquid":
            "An everyday dish-cleaning solution for your kitchen.",

        "NAYRO Floor Cleaner":
            "Designed for everyday floor cleaning and a fresh home."

    };


    function openProduct(productName) {

        modalTitle.textContent =
            productName;

        modalDescription.textContent =
            descriptions[productName] ||
            "NAYRO home-cleaning solution.";

        modalCategory.textContent =
            "NAYRO HOME CLEANING";


        const message =
            `Hello NAYRO, I am interested in ${productName}. Please share more details.`;

        modalWhatsapp.href =
            `https://wa.me/919987475783?text=${encodeURIComponent(message)}`;


        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add("no-scroll");

    }


    document.querySelectorAll(".product-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const card =
                    button.closest(".product-card");

                const productName =
                    card.dataset.product;

                openProduct(productName);

            });

        });


    function closeModal() {

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("no-scroll");

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener(
        "click",
        event => {

            if (event.target === modal) {
                closeModal();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeModal();
            }

        }
    );


    /* =========================
       CONTACT FORM
    ========================= */

    const form =
        document.getElementById("enquiryForm");


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById("name")
                .value.trim();

            const phone =
                document.getElementById("phone")
                .value.trim();

            const product =
                document.getElementById("product")
                .value;

            const message =
                document.getElementById("message")
                .value.trim();


            if (!name || !phone || !product || !message) {

                alert(
                    "Please fill in all fields."
                );

                return;

            }


            const whatsappMessage =
`Hello NAYRO,

Name: ${name}
Phone: ${phone}
Product: ${product}

Message:
${message}

I would like to enquire about this product.`;


            const whatsappURL =
                `https://wa.me/919987475783?text=${encodeURIComponent(whatsappMessage)}`;


            window.open(
                whatsappURL,
                "_blank",
                "noopener"
            );

        }
    );


    /* =========================
       BACK TO TOP
    ========================= */

    topBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =========================
       CLOSE MOBILE MENU ON ESC
    ========================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navMenu.classList.contains("open")
            ) {

                navMenu.classList.remove("open");
                menuBtn.textContent = "☰";
                document.body.classList.remove("no-scroll");

            }

        }
    );

});


/* Product filter animation */

const style =
document.createElement("style");

style.textContent = `

@keyframes fadeProduct {

    from {
        opacity: 0;
        transform: translateY(15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }

}

`;

document.head.appendChild(style);
