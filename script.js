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
/* =========================================================
   SERVICE CARD -> PHONE CALL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const serviceCards =
        document.querySelectorAll(".agile-service-card");

    const phoneNumber = "+918005677079";

    function makePhoneCall() {
        window.location.href = "tel:" + phoneNumber;
    }

    serviceCards.forEach(function (card) {

        /* Card click */
        card.addEventListener("click", function (event) {

            // Do not trigger call if an actual link/button
            // inside the card is clicked.
            if (event.target.closest("a, button")) {
                return;
            }

            makePhoneCall();
        });

        /* Keyboard accessibility */
        card.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                makePhoneCall();
            }

        });

    });

});


/* =========================================================
   AGILE SOLUTIONS PORTFOLIO
========================================================= */

/* =========================================================
   AGILE SOLUTIONS - PORTFOLIO SECTION JS

   FIX ONLY:
   - Laptop/Desktop stays static
   - Tablet + Mobile keep ORIGINAL 5s scroll speed
   - Clicking ANY card pauses the marquee
   - Clicking again resumes the marquee
   - Image hover scroll stays the same
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const track = document.querySelector(".portfolio-track");

  if (!track) return;


  /* =======================================================
     PORTFOLIO MARQUEE
  ======================================================= */

  function updatePortfolioAnimation() {

    const width = window.innerWidth;

    if (width > 1024) {

      // Laptop/Desktop: exactly six cards, no movement.
      track.style.animation = "none";
      track.classList.remove("portfolio-is-paused");

    } else {

      // Tablet + Mobile: ORIGINAL 5 second speed.
      track.style.animation =
        "portfolioInfiniteScroll 5s linear infinite";
    }
  }


  /* =======================================================
     CALCULATE FULL IMAGE SCROLL DISTANCE
  ======================================================= */

  function setupPortfolioImageScroll() {

    const windows =
      document.querySelectorAll(".portfolio-image-window");

    windows.forEach(function (imageWindow) {

      const image =
        imageWindow.querySelector("img");

      if (!image) return;


      function calculateDistance() {

        const imageHeight =
          image.getBoundingClientRect().height;

        const windowHeight =
          imageWindow.clientHeight;

        const distance =
          Math.max(
            0,
            imageHeight - windowHeight
          );

        image.style.setProperty(
          "--portfolio-scroll-distance",
          "-" + distance + "px"
        );
      }


      if (image.complete) {

        calculateDistance();

      } else {

        image.addEventListener(
          "load",
          calculateDistance,
          { once: true }
        );
      }
    });
  }


  /* =======================================================
     CARD CLICK = PAUSE / RESUME
     TABLET + MOBILE ONLY
  ======================================================= */

  function setupPortfolioCardClickPause() {

    const cards =
      document.querySelectorAll(".portfolio-card");

    cards.forEach(function (card) {

      card.addEventListener("click", function () {

        if (window.innerWidth <= 1024) {

          track.classList.toggle(
            "portfolio-is-paused"
          );
        }
      });
    });
  }


  /* =======================================================
     INITIALIZE
  ======================================================= */

  updatePortfolioAnimation();
  setupPortfolioImageScroll();
  setupPortfolioCardClickPause();


  /* =======================================================
     RESIZE
  ======================================================= */

  let resizeTimer;

  window.addEventListener("resize", function () {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {

      updatePortfolioAnimation();
      setupPortfolioImageScroll();

    }, 150);
  });


  /* =======================================================
     IMAGE LOAD
  ======================================================= */

  window.addEventListener("load", function () {

    setupPortfolioImageScroll();

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
    const mobileFrame = document.querySelector(".industry-mobile-frame");
    const mobileLink = document.getElementById("industryMobileLink");
    const leftArrow = document.querySelector(".industry-arrow-left");
    const rightArrow = document.querySelector(".industry-arrow-right");

    if (!mobileImage || !mobileFrame || !mobileLink || !leftArrow || !rightArrow) {
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

    let ignoreNextImageClick = false;

    mobileFrame.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    mobileFrame.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            const swipeDistance = touchStartX - touchEndX;

            if (Math.abs(swipeDistance) >= 50) {
                ignoreNextImageClick = true;
                window.setTimeout(function () {
                    ignoreNextImageClick = false;
                }, 500);
            }

            handleSwipe();

        },
        { passive: true }
    );

    /* A normal tap on the image calls Agile Solutions.
       A swipe changes the image without opening the phone dialer. */
    mobileLink.addEventListener("click", function (event) {
        if (ignoreNextImageClick) {
            event.preventDefault();
            ignoreNextImageClick = false;
        }
    });


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
   - Review cards -> Phone Call
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const slider = document.getElementById("reviewsSlider");
  const track = document.getElementById("reviewsTrack");
  const prevBtn = document.querySelector(".review-prev");
  const nextBtn = document.querySelector(".review-next");

  if (!slider || !track || !prevBtn || !nextBtn) return;


  /* =======================================================
     ORIGINAL REVIEW CARDS
  ======================================================= */

  const originalCards = Array.from(track.children);
  const realCount = originalCards.length;


  /* =======================================================
     CLONE REVIEWS FOR INFINITE LOOP
  ======================================================= */

  originalCards.forEach((card) => {
    track.appendChild(card.cloneNode(true));
  });

  const allCards = Array.from(track.children);


  /* =======================================================
     PHONE NUMBER
  ======================================================= */

  const phoneNumber = "+918005677079";


  /* =======================================================
     VARIABLES
  ======================================================= */

  let currentIndex = 0;
  let autoTimer = null;
  let isAnimating = false;

  let startX = 0;
  let currentX = 0;
  let isTouching = false;


  /* =======================================================
     MOBILE CHECK
  ======================================================= */

  function isMobile() {
    return window.innerWidth <= 767;
  }


  /* =======================================================
     CARD STEP
  ======================================================= */

  function getStep() {

    const card = allCards[0];

    if (!card) return 0;

    const styles = window.getComputedStyle(track);

    const gap =
      parseFloat(
        styles.columnGap ||
        styles.gap ||
        0
      );

    return (
      card.getBoundingClientRect().width +
      gap
    );
  }


  /* =======================================================
     APPLY CAROUSEL TRANSFORM
  ======================================================= */

  function applyTransform(animate = true) {

    track.style.transition = animate
      ? "transform 600ms cubic-bezier(.22, .61, .36, 1)"
      : "none";

    track.style.transform =
      `translate3d(-${currentIndex * getStep()}px, 0, 0)`;
  }


  /* =======================================================
     GO TO SLIDE
  ======================================================= */

  function goTo(index) {

    if (!isMobile() || isAnimating) {
      return;
    }

    currentIndex = index;

    isAnimating = true;

    applyTransform(true);


    window.setTimeout(() => {

      /* -----------------------------------------------
         Infinite loop - forward
      ----------------------------------------------- */

      if (currentIndex >= realCount) {

        currentIndex = 0;

        applyTransform(false);
      }


      /* -----------------------------------------------
         Infinite loop - backward
      ----------------------------------------------- */

      if (currentIndex < 0) {

        currentIndex = realCount - 1;

        applyTransform(false);
      }


      isAnimating = false;

    }, 630);
  }


  /* =======================================================
     NEXT
  ======================================================= */

  function next() {

    goTo(currentIndex + 1);

  }


  /* =======================================================
     PREVIOUS
  ======================================================= */

  function previous() {

    if (!isMobile()) {
      return;
    }


    /* -----------------------------------------------
       Infinite backward movement
    ----------------------------------------------- */

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


  /* =======================================================
     AUTO SLIDE START
  ======================================================= */

  function startAutoSlide() {

    stopAutoSlide();


    /* Auto slide only on mobile */

    if (isMobile()) {

      autoTimer = setInterval(() => {

        next();

      }, 4000);

    }

  }


  /* =======================================================
     AUTO SLIDE STOP
  ======================================================= */

  function stopAutoSlide() {

    if (autoTimer) {

      clearInterval(autoTimer);

      autoTimer = null;

    }

  }


  /* =======================================================
     REVIEW CARD -> PHONE CALL
  ======================================================= */

  function makePhoneCall() {

    window.location.href =
      `tel:${phoneNumber}`;

  }


  /* =======================================================
     EVERY REVIEW CARD -> PHONE CALL
  ======================================================= */

  allCards.forEach((card) => {


    /* -----------------------------------------------
       Mouse / Touch Click
    ----------------------------------------------- */

    card.addEventListener("click", (event) => {

      /*
        If an actual button or link exists inside
        the card, don't trigger phone call.
      */

      if (event.target.closest("button, a")) {
        return;
      }


      makePhoneCall();

    });


    /* -----------------------------------------------
       Keyboard Accessibility
    ----------------------------------------------- */

    card.addEventListener("keydown", (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();

        makePhoneCall();

      }

    });

  });


  /* =======================================================
     NEXT ARROW
  ======================================================= */

  nextBtn.addEventListener("click", () => {

    next();

    startAutoSlide();

  });


  /* =======================================================
     PREVIOUS ARROW
  ======================================================= */

  prevBtn.addEventListener("click", () => {

    previous();

    startAutoSlide();

  });


  /* =======================================================
     TOUCH START
  ======================================================= */

  slider.addEventListener(
    "touchstart",
    (event) => {

      if (
        !isMobile() ||
        !event.touches[0]
      ) {
        return;
      }


      isTouching = true;

      startX =
        event.touches[0].clientX;

      currentX = startX;


      /* Pause auto slide while touching */

      stopAutoSlide();

    },
    {
      passive: true
    }
  );


  /* =======================================================
     TOUCH MOVE
  ======================================================= */

  slider.addEventListener(
    "touchmove",
    (event) => {

      if (
        !isTouching ||
        !event.touches[0]
      ) {
        return;
      }


      currentX =
        event.touches[0].clientX;

    },
    {
      passive: true
    }
  );


  /* =======================================================
     TOUCH END / SWIPE
  ======================================================= */

  slider.addEventListener(
    "touchend",
    () => {

      if (!isTouching) {
        return;
      }


      const difference =
        currentX - startX;


      isTouching = false;


      /* Swipe threshold */

      if (Math.abs(difference) > 45) {


        /* Swipe left */

        if (difference < 0) {

          next();

        }


        /* Swipe right */

        else {

          previous();

        }

      }


      /* Restart auto slide */

      startAutoSlide();

    }
  );


  /* =======================================================
     MOUSE ENTER
     ======================================================= */

  slider.addEventListener(
    "mouseenter",
    () => {

      stopAutoSlide();

    }
  );


  /* =======================================================
     MOUSE LEAVE
  ======================================================= */

  slider.addEventListener(
    "mouseleave",
    () => {

      startAutoSlide();

    }
  );


  /* =======================================================
     RESIZE
  ======================================================= */

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);


      resizeTimer = setTimeout(() => {


        /* ---------------------------------------------
           Desktop / Tablet
        --------------------------------------------- */

        if (!isMobile()) {

          currentIndex = 0;

          applyTransform(false);

          stopAutoSlide();

        }


        /* ---------------------------------------------
           Mobile
        --------------------------------------------- */

        else {

          applyTransform(false);

          startAutoSlide();

        }


      }, 150);

    }
  );


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  applyTransform(false);

  startAutoSlide();

});

/* =========================================================
   TARGETED MOBILE AUTO-SCROLL FIXES
   - Services: one screen (6 cards / 3 columns x 2 rows)
     every 3 seconds on phones.
   - User arrow/touch interaction restarts the 3s timer.
   - Industries/reviews use their existing carousel behavior.
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const servicesScroll = document.querySelector(".agile-services-scroll");
    const servicesGrid = document.querySelector(".agile-services-grid");
    const serviceLeft = document.querySelector(".agile-mobile-scroll-left");
    const serviceRight = document.querySelector(".agile-mobile-scroll-right");

    if (!servicesScroll || !servicesGrid) {
        return;
    }

    let serviceAutoTimer = null;
    let serviceTouching = false;

    function isPhoneLayout() {
        return window.innerWidth <= 600;
    }

    function getServiceStep() {
        const card = servicesGrid.querySelector(".agile-service-card");
        if (!card) return servicesScroll.clientWidth;

        const cardWidth = card.getBoundingClientRect().width;
        const styles = window.getComputedStyle(servicesGrid);
        const columnGap = parseFloat(styles.columnGap || styles.gap || "0");

        return (cardWidth + columnGap) * 3;
    }

    function getServiceMaxScroll() {
        return Math.max(
            0,
            servicesScroll.scrollWidth - servicesScroll.clientWidth
        );
    }

    function stopServiceAutoScroll() {
        if (serviceAutoTimer) {
            window.clearInterval(serviceAutoTimer);
            serviceAutoTimer = null;
        }
    }

    function startServiceAutoScroll() {
        stopServiceAutoScroll();

        if (!isPhoneLayout()) {
            return;
        }

        serviceAutoTimer = window.setInterval(function () {
            if (!isPhoneLayout() || serviceTouching) {
                return;
            }

            const maxScroll = getServiceMaxScroll();
            const step = getServiceStep();

            if (maxScroll <= 2) {
                return;
            }

            if (servicesScroll.scrollLeft >= maxScroll - 2) {
                servicesScroll.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });
            } else {
                servicesScroll.scrollBy({
                    left: Math.min(step, maxScroll - servicesScroll.scrollLeft),
                    behavior: "smooth"
                });
            }
        }, 3000);
    }

    function restartServiceAutoScroll() {
        startServiceAutoScroll();
    }

    servicesScroll.addEventListener("touchstart", function () {
        if (isPhoneLayout()) {
            serviceTouching = true;
            stopServiceAutoScroll();
        }
    }, { passive: true });

    servicesScroll.addEventListener("touchend", function () {
        serviceTouching = false;
        restartServiceAutoScroll();
    }, { passive: true });

    servicesScroll.addEventListener("touchcancel", function () {
        serviceTouching = false;
        restartServiceAutoScroll();
    }, { passive: true });

    if (serviceLeft) {
        serviceLeft.addEventListener("click", restartServiceAutoScroll);
    }

    if (serviceRight) {
        serviceRight.addEventListener("click", restartServiceAutoScroll);
    }

    window.addEventListener("resize", function () {
        restartServiceAutoScroll();
    });

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopServiceAutoScroll();
        } else {
            restartServiceAutoScroll();
        }
    });

    startServiceAutoScroll();
});


/* =========================================================
   REVIEW AUTO-SLIDE SAFETY FOR iPHONE / iOS
   Keep the existing 4-second speed and one-card layout.
   Restart when the page becomes active again.
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const reviewsSlider = document.getElementById("reviewsSlider");
    if (!reviewsSlider) return;

    function restartReviewsIfPhone() {
        if (window.innerWidth <= 767) {
            /* Trigger a resize event so the existing review carousel
               recalculates its state and restarts its 4s timer. */
            window.dispatchEvent(new Event("resize"));
        }
    }

    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
            window.setTimeout(restartReviewsIfPhone, 100);
        }
    });

    window.addEventListener("pageshow", function () {
        window.setTimeout(restartReviewsIfPhone, 100);
    });
});
