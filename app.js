/* =========================================================
   TASKINGRESS PUBLIC LANDING PAGE
   Plain JavaScript only
========================================================= */

/* ---------------------------------------------------------
   Dynamic copyright year
--------------------------------------------------------- */

const copyrightYear = document.getElementById("copyright-year");

if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   Mobile navigation
--------------------------------------------------------- */

const mobileMenuButton = document.querySelector(".mobile-menu-button");
const mainNavigation = document.querySelector(".main-navigation");
const navigationLinks = document.querySelectorAll(".main-navigation a");

function closeMobileMenu() {
  if (!mobileMenuButton || !mainNavigation) return;

  mainNavigation.classList.remove("open");
  mobileMenuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

if (mobileMenuButton && mainNavigation) {
  mobileMenuButton.addEventListener("click", () => {
    const menuIsOpen = mainNavigation.classList.toggle("open");

    mobileMenuButton.setAttribute(
      "aria-expanded",
      menuIsOpen ? "true" : "false"
    );

    document.body.classList.toggle("menu-open", menuIsOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 720) {
    closeMobileMenu();
  }
});

/* ---------------------------------------------------------
   Pilot form submission
   Sends data to Formspree or another static form endpoint
--------------------------------------------------------- */

const pilotForm = document.getElementById("pilot-form");
const formContainer = document.getElementById("form-container");
const successMessage = document.getElementById("success-message");
const resetFormButton = document.getElementById("reset-form");

if (pilotForm && formContainer && successMessage) {
  pilotForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = pilotForm.querySelector(".submit-button");
    const originalButtonText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = "Submitting...";

    try {
      const formData = new FormData(pilotForm);

      const response = await fetch(pilotForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      formContainer.hidden = true;
      successMessage.hidden = false;

      successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    } catch (error) {
      alert(
        "Sorry, your request could not be submitted. Please email hello@taskingress.com directly."
      );
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  });
}

if (resetFormButton && pilotForm && formContainer && successMessage) {
  resetFormButton.addEventListener("click", () => {
    pilotForm.reset();

    successMessage.hidden = true;
    formContainer.hidden = false;
  });
}

/* ---------------------------------------------------------
   Subtle reveal animation
--------------------------------------------------------- */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}