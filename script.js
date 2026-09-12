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






//   Service section js 
document.addEventListener("DOMContentLoaded", function () {

const servicesScroll = document.querySelector(".agile-services-scroll");

const leftArrow = document.querySelector(".agile-mobile-scroll-left");

const rightArrow = document.querySelector(".agile-mobile-scroll-right");

if (!servicesScroll) {
    return;
}

// Existing mouse-wheel horizontal scrolling for smaller screens.
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

// Mobile arrows: move exactly one card at a time.
function getCardMoveAmount() {
    const card = servicesScroll.querySelector(".agile-service-card");

    if (!card) {
        return 282;
    }

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 12;

    return cardWidth + gap;
}

function updateArrowState() {
    if (!leftArrow || !rightArrow || window.innerWidth > 600) {
        return;
    }

    const maxScroll =
        servicesScroll.scrollWidth - servicesScroll.clientWidth;

    leftArrow.classList.toggle(
        "is-disabled",
        servicesScroll.scrollLeft <= 2
    );

    rightArrow.classList.toggle(
        "is-disabled",
        servicesScroll.scrollLeft >= maxScroll - 2
    );
}

if (leftArrow) {
    leftArrow.addEventListener("click", function () {
        servicesScroll.scrollBy({
            left: -getCardMoveAmount(),
            behavior: "smooth"
        });
    });
}

if (rightArrow) {
    rightArrow.addEventListener("click", function () {
        servicesScroll.scrollBy({
            left: getCardMoveAmount(),
            behavior: "smooth"
        });
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
        // Do not trigger WhatsApp if an actual link/button inside the card is clicked. 
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