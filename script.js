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
   INDUSTRIES MOBILE IMAGE SLIDER
   - Left / Right arrows
   - Touch swipe
   - Auto slide
   - Desktop image unaffected
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const mobileImage = document.getElementById("industryMobileImage");
    const leftArrow = document.querySelector(".industry-arrow-left");
    const rightArrow = document.querySelector(".industry-arrow-right");

    if (!mobileImage || !leftArrow || !rightArrow) {
        return;
    }

    const slides = [
        {
            src: "assets/industries-mobile-1.jpg",
            alt: "Industries served - mobile view 1"
        },
        {
            src: "assets/industries-mobile-2.jpg",
            alt: "Industries served - mobile view 2"
        }
    ];

    let currentSlide = 0;

    /* ---------------------------------------------------------
       SHOW SLIDE
    --------------------------------------------------------- */

    function showSlide(index) {

        currentSlide =
            (index + slides.length) % slides.length;

        mobileImage.src = slides[currentSlide].src;
        mobileImage.alt = slides[currentSlide].alt;

        /*
         * Arrow state
         * Since slider is circular, both arrows remain active.
         */
        leftArrow.classList.remove("is-disabled");
        rightArrow.classList.remove("is-disabled");
    }


    /* ---------------------------------------------------------
       NEXT SLIDE
    --------------------------------------------------------- */

    function nextSlide() {
        showSlide(currentSlide + 1);
    }


    /* ---------------------------------------------------------
       PREVIOUS SLIDE
    --------------------------------------------------------- */

    function previousSlide() {
        showSlide(currentSlide - 1);
    }


    /* ---------------------------------------------------------
       ARROW CLICK
    --------------------------------------------------------- */

    leftArrow.addEventListener("click", function () {

        previousSlide();

        restartAutoSlide();
    });


    rightArrow.addEventListener("click", function () {

        nextSlide();

        restartAutoSlide();
    });


    /* ---------------------------------------------------------
       TOUCH SWIPE
    --------------------------------------------------------- */

    let touchStartX = 0;
    let touchEndX = 0;

    mobileImage.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    mobileImage.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        { passive: true }
    );


    function handleSwipe() {

        const swipeDistance =
            touchStartX - touchEndX;

        /*
         * Minimum swipe distance
         */
        if (Math.abs(swipeDistance) < 50) {
            return;
        }

        if (swipeDistance > 0) {

            // Swipe left → next image
            nextSlide();

        } else {

            // Swipe right → previous image
            previousSlide();

        }

        restartAutoSlide();
    }


    /* ---------------------------------------------------------
       AUTO SLIDE
       Every 4 seconds
    --------------------------------------------------------- */

    let autoSlideTimer;

    function startAutoSlide() {

        clearInterval(autoSlideTimer);

        autoSlideTimer = setInterval(function () {

            /*
             * Only auto-slide on mobile
             */
            if (window.innerWidth <= 600) {

                nextSlide();

            }

        }, 2000);
    }


    /* ---------------------------------------------------------
       RESTART AUTO SLIDE
       After user clicks/swipes
    --------------------------------------------------------- */

    function restartAutoSlide() {

        clearInterval(autoSlideTimer);

        startAutoSlide();
    }


    /* ---------------------------------------------------------
       INITIAL SLIDE
    --------------------------------------------------------- */

    showSlide(0);

    startAutoSlide();

});







/* =========================================
   AGILE REVIEWS CAROUSEL
   - Desktop/tablet: 4 cards visible
   - Mobile: 2 cards visible
   - Auto slide
   - Previous/next arrows
   - Touch/swipe support
   - Infinite loop
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("reviewsSlider");
  const track = document.getElementById("reviewsTrack");
  const prevBtn = document.querySelector(".review-prev");
  const nextBtn = document.querySelector(".review-next");

  if (!slider || !track || !prevBtn || !nextBtn) return;

  const originalCards = Array.from(track.children);
  const realCount = originalCards.length;

  // Clone reviews for a smooth infinite carousel.
  originalCards.forEach((card) => {
    track.appendChild(card.cloneNode(true));
  });

  const allCards = Array.from(track.children);

  const whatsappNumber = "918005677079";
  const whatsappMessage =
    "Hello Agile Solutions, I want to discuss a web or software development project.";

  let currentIndex = 0;
  let autoTimer = null;
  let isAnimating = false;
  let startX = 0;
  let currentX = 0;
  let isTouching = false;

  function isMobile() {
    return window.innerWidth <= 767;
  }

  function getStep() {
    const card = allCards[0];
    if (!card) return 0;

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);

    return card.getBoundingClientRect().width + gap;
  }

  function applyTransform(animate = true) {
    track.style.transition = animate
      ? "transform 600ms cubic-bezier(.22, .61, .36, 1)"
      : "none";

    track.style.transform =
      `translate3d(-${currentIndex * getStep()}px, 0, 0)`;
  }

  function goTo(index) {
    if (!isMobile() || isAnimating) return;

    currentIndex = index;
    isAnimating = true;
    applyTransform(true);

    window.setTimeout(() => {
      if (currentIndex >= realCount) {
        currentIndex = 0;
        applyTransform(false);
      }

      if (currentIndex < 0) {
        currentIndex = realCount - 1;
        applyTransform(false);
      }

      isAnimating = false;
    }, 630);
  }

  function next() {
    goTo(currentIndex + 1);
  }

  function previous() {
    if (!isMobile()) return;

    if (currentIndex === 0) {
      currentIndex = realCount;
      applyTransform(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          goTo(realCount - 1);
        });
      });
      return;
    }

    goTo(currentIndex - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();

    // Auto-slide is mobile-only.
    if (isMobile()) {
      autoTimer = setInterval(next, 4000);
    }
  }

  function stopAutoSlide() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function openWhatsApp() {
    const url =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Every original + cloned review card opens WhatsApp.
  allCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button, a")) return;
      openWhatsApp();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openWhatsApp();
      }
    });
  });

  // Arrows only perform carousel movement on mobile.
  nextBtn.addEventListener("click", () => {
    next();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    previous();
    startAutoSlide();
  });

  // Touch/swipe on mobile.
  slider.addEventListener("touchstart", (event) => {
    if (!isMobile() || !event.touches[0]) return;

    isTouching = true;
    startX = event.touches[0].clientX;
    currentX = startX;
    stopAutoSlide();
  }, { passive: true });

  slider.addEventListener("touchmove", (event) => {
    if (!isTouching || !event.touches[0]) return;
    currentX = event.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener("touchend", () => {
    if (!isTouching) return;

    const difference = currentX - startX;
    isTouching = false;

    if (Math.abs(difference) > 45) {
      if (difference < 0) {
        next();
      } else {
        previous();
      }
    }

    startAutoSlide();
  });

  // Pause auto-slide while the mobile user is interacting.
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  // Keep layout correct after rotation/resizing.
  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      if (!isMobile()) {
        currentIndex = 0;
        applyTransform(false);
        stopAutoSlide();
      } else {
        applyTransform(false);
        startAutoSlide();
      }
    }, 150);
  });

  // Initial state.
  applyTransform(false);
  startAutoSlide();
});
