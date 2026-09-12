(() => {
  "use strict";

  const WHATSAPP_NUMBER = "918005677079";
  const DEFAULT_MESSAGE =
    "Hello Agile Solutions, I want to discuss a web or software development project.";

  const openWhatsApp = (message = DEFAULT_MESSAGE) => {
    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Logo, quote, service cards and CTA buttons all open WhatsApp.
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openWhatsApp();
    });
  });

  const form = document.getElementById("whatsappForm");
  const error = document.getElementById("formError");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    error.textContent = "";

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("workEmail").value.trim();
    const countryCode = document.getElementById("countryCode").value;
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7) {
      error.textContent = "Please enter a valid phone number.";
      return;
    }

    const message = [
      DEFAULT_MESSAGE,
      "",
      "New Project Enquiry",
      "Name: " + name,
      "Work Email: " + email,
      "WhatsApp / Phone: " + countryCode + " " + phone,
      "Required Service: " + service
    ].join("\n");

    openWhatsApp(message);
  });
})();





/* =========================================================
   AGILE SOLUTIONS - SERVICES SECTION JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const servicesScroll = document.querySelector(".agile-services-scroll");
    const servicesGrid = document.querySelector(".agile-services-grid");

    const leftArrow = document.querySelector(".agile-mobile-scroll-left");
    const rightArrow = document.querySelector(".agile-mobile-scroll-right");

    if (!servicesScroll || !servicesGrid) {
        return;
    }

    /* ---------------------------------------------------------
       Desktop / small-screen mouse wheel
       Convert vertical mouse wheel to horizontal scrolling
       only when horizontal service scrolling is active.
       --------------------------------------------------------- */
    servicesScroll.addEventListener(
        "wheel",
        function (event) {
            if (
                window.innerWidth <= 900 &&
                Math.abs(event.deltaY) > Math.abs(event.deltaX)
            ) {
                event.preventDefault();
                servicesScroll.scrollLeft += event.deltaY;
            }
        },
        { passive: false }
    );

    /* ---------------------------------------------------------
       MOBILE:
       3 columns are visible at once.
       One arrow click moves exactly ONE SCREEN = 3 columns.
       Because the grid is 2 rows x 6 columns with
       grid-auto-flow: column, both rows move together.
       --------------------------------------------------------- */
    function getScreenMoveAmount() {
        if (window.innerWidth > 600) {
            return 0;
        }

        const firstCard = servicesGrid.querySelector(".agile-service-card");

        if (!firstCard) {
            return servicesScroll.clientWidth;
        }

        const cardWidth = firstCard.getBoundingClientRect().width;

        // CSS mobile column gap = 10px.
        const columnGap = 10;

        // 3 cards/columns are visible per screen.
        return (cardWidth + columnGap) * 3;
    }

    function getMaxScroll() {
        return Math.max(
            0,
            servicesScroll.scrollWidth - servicesScroll.clientWidth
        );
    }

    function updateArrowState() {
        if (!leftArrow || !rightArrow) {
            return;
        }

        // Arrows are only displayed by CSS on mobile.
        if (window.innerWidth > 600) {
            leftArrow.classList.remove("is-disabled");
            rightArrow.classList.remove("is-disabled");
            return;
        }

        const maxScroll = getMaxScroll();
        const currentScroll = servicesScroll.scrollLeft;

        leftArrow.classList.toggle(
            "is-disabled",
            currentScroll <= 2
        );

        rightArrow.classList.toggle(
            "is-disabled",
            currentScroll >= maxScroll - 2
        );
    }

    function moveServices(direction) {
        if (window.innerWidth > 600) {
            return;
        }

        const amount = getScreenMoveAmount();

        servicesScroll.scrollBy({
            left: direction * amount,
            behavior: "smooth"
        });
    }

    if (leftArrow) {
        leftArrow.addEventListener("click", function () {
            moveServices(-1);
        });
    }

    if (rightArrow) {
        rightArrow.addEventListener("click", function () {
            moveServices(1);
        });
    }

    servicesScroll.addEventListener("scroll", updateArrowState);
    window.addEventListener("resize", updateArrowState);

    updateArrowState();
});


/* =========================================================
   SERVICE CARD -> WHATSAPP
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const serviceCards = document.querySelectorAll(".agile-service-card");

    const whatsappNumber = "918005677079";

    const whatsappMessage =
        "Hello Agile Solutions, I want to discuss a web or software development project.";

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(whatsappMessage);

    function openWhatsApp() {
        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    }

    serviceCards.forEach(function (card) {
        card.addEventListener("click", function (event) {
            // Do not trigger WhatsApp if an actual link/button
            // inside the card is clicked.
            if (event.target.closest("a, button")) {
                return;
            }

            openWhatsApp();
        });

        card.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openWhatsApp();
            }
        });
    });
});




/* =========================================
   AGILE SOLUTIONS PORTFOLIO
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       PORTFOLIO TABS
    ====================================== */

    const tabs =
        document.querySelectorAll(".portfolio-tab");

    const grids =
        document.querySelectorAll(".portfolio-grid");


    tabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const category =
                tab.dataset.category;


            /* ---------------------------------
               REMOVE ACTIVE FROM ALL TABS
            ---------------------------------- */

            tabs.forEach((item) => {

                item.classList.remove("active");

                item.setAttribute(
                    "aria-selected",
                    "false"
                );

            });


            /* ---------------------------------
               ACTIVE CLICKED TAB
            ---------------------------------- */

            tab.classList.add("active");

            tab.setAttribute(
                "aria-selected",
                "true"
            );


            /* ---------------------------------
               HIDE ALL PORTFOLIO GRIDS
            ---------------------------------- */

            grids.forEach((grid) => {

                grid.classList.remove(
                    "active-grid"
                );

            });


            /* ---------------------------------
               SHOW SELECTED PORTFOLIO
            ---------------------------------- */

            const selectedGrid =
                document.getElementById(category);


            if (selectedGrid) {

                selectedGrid.classList.add(
                    "active-grid"
                );

            }

        });

    });



    /* =====================================
       WHATSAPP CONFIGURATION
    ====================================== */

    const whatsappNumber =
        "918005677079";


    const whatsappMessage =
        "Hello Agile Solutions, I want to discuss a web or software development project.";


    const encodedMessage =
        encodeURIComponent(
            whatsappMessage
        );


    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;



    /* =====================================
       MAKE EVERY PORTFOLIO IMAGE
       CLICKABLE FOR WHATSAPP
    ====================================== */

    const portfolioItems =
        document.querySelectorAll(
            ".portfolio-item"
        );


    portfolioItems.forEach((item) => {

        /*
           Prevent # navigation
        */

        item.setAttribute(
            "href",
            whatsappURL
        );


        /*
           Open WhatsApp in new tab
        */

        item.setAttribute(
            "target",
            "_blank"
        );


        item.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

});







/* =========================================================
   AGILE SOLUTIONS - INDUSTRIES MOBILE SLIDER
   - Arrow navigation
   - Touch/swipe navigation
   - Desktop image is never used on mobile
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const mobileImage = document.getElementById("industryMobileImage");
    const slider = document.querySelector(".industries-mobile-view");
    const leftArrow = document.querySelector(".industry-arrow-left");
    const rightArrow = document.querySelector(".industry-arrow-right");

    if (!mobileImage || !slider || !leftArrow || !rightArrow) {
        return;
    }

    const slides = [
        {
            src: "assets/industries-mobile-1.jpg",
            alt: "Industries served by our website designing company - first mobile view"
        },
        {
            src: "assets/industries-mobile-2.jpg",
            alt: "Industries served by our website designing company - second mobile view"
        }
    ];

    let currentSlide = 0;

    function showSlide(index) {

        currentSlide = Math.max(
            0,
            Math.min(index, slides.length - 1)
        );

        mobileImage.src = slides[currentSlide].src;
        mobileImage.alt = slides[currentSlide].alt;

        leftArrow.classList.toggle(
            "is-disabled",
            currentSlide === 0
        );

        rightArrow.classList.toggle(
            "is-disabled",
            currentSlide === slides.length - 1
        );
    }

    /* =========================
       ARROW CLICK
       ========================= */

    leftArrow.addEventListener("click", function () {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    });

    rightArrow.addEventListener("click", function () {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    });

    /* =========================
       TOUCH / SWIPE
       ========================= */

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const swipeThreshold = 45;

    slider.addEventListener(
        "touchstart",
        function (event) {

            if (!event.touches || !event.touches.length) {
                return;
            }

            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;

            touchEndX = touchStartX;
            touchEndY = touchStartY;
        },
        { passive: true }
    );

    slider.addEventListener(
        "touchmove",
        function (event) {

            if (!event.touches || !event.touches.length) {
                return;
            }

            touchEndX = event.touches[0].clientX;
            touchEndY = event.touches[0].clientY;
        },
        { passive: true }
    );

    slider.addEventListener(
        "touchend",
        function () {

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            /* Ignore mostly vertical finger movement */
            if (Math.abs(deltaX) <= Math.abs(deltaY)) {
                return;
            }

            /* Swipe LEFT = next image */
            if (deltaX < -swipeThreshold) {

                if (currentSlide < slides.length - 1) {
                    showSlide(currentSlide + 1);
                }

                return;
            }

            /* Swipe RIGHT = previous image */
            if (deltaX > swipeThreshold) {

                if (currentSlide > 0) {
                    showSlide(currentSlide - 1);
                }
            }
        },
        { passive: true }
    );

    /* Start on mobile image 1 */
    showSlide(0);
});
