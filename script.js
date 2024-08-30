document.addEventListener("DOMContentLoaded", function () {
  const scrollLinks = document.querySelectorAll("a.nav-link");

  // Smooth scrolling for all nav links
  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1); // Remove '#'
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const navbar = document.querySelector(".navbar-collapse");
        const navbarToggler = document.querySelector(".navbar-toggler");

        // Close the navbar if it's open (on mobile)
        if (navbar.classList.contains("show")) {
          navbar.classList.remove("show");
          navbarToggler.setAttribute("aria-expanded", "false");
        }

        // Scroll to the target element
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Auto image slider for the welcome section
  const images = [
    "./assets/construction.jpg",
    "./assets/waterproofing.jpg", // Replace with your second image URL
    "./assets/water1.jpg", // Replace with your third image URL
  ];
  const welcomeSection = document.querySelector(".welcome");
  let currentIndex = 0;

  function changeBackgroundImage() {
    currentIndex = (currentIndex + 1) % images.length;
    welcomeSection.style.backgroundImage = `url('${images[currentIndex]}')`;
    setTimeout(changeBackgroundImage, 5000); // Change image every 5 seconds
  }

  // Start changing background image after a delay
  setTimeout(changeBackgroundImage, 3000); // Start after 3 seconds

  // Carousel slider functionality
  let currentIndexCarousel = 0;
  const transitionDuration = 3000; // 1 second for the transition

  function showNextSlide() {
    const slides = document.querySelectorAll(".custom-carousel-slide");
    const totalSlides = slides.length / 2; // Since slides are duplicated
    const carousel = document.querySelector(".custom-carousel");

    if (carousel) {
      if (currentIndexCarousel === totalSlides - 1) {
        // Special handling for the last slide reset case
        carousel.style.transition = `transform ${transitionDuration}ms linear`;
        carousel.style.transform = `translateX(-${totalSlides * 100}%)`;
        setTimeout(() => {
          carousel.style.transition = "none";
          carousel.style.transform = "translateX(0)";
          currentIndexCarousel = 0;
          setTimeout(() => {
            carousel.style.transition = `transform ${transitionDuration}ms linear`;
            showNextSlide(); // Immediately transition to the first slide
          }, 50); // Small delay to reset transition
        }, transitionDuration); // Match the transition duration
      } else {
        currentIndexCarousel = (currentIndexCarousel + 1) % totalSlides;
        carousel.style.transition = `transform ${transitionDuration}ms linear`;
        carousel.style.transform = `translateX(-${
          currentIndexCarousel * 100
        }%)`;
      }
    }
  }

  setInterval(showNextSlide, 7000); // Change slide every 7 seconds

  // Smooth scrolling function for specific nav links with adjustments for fixed navbar
  function smoothScrollTo(targetId, gapHeight) {
    const targetSection = document.getElementById(targetId);
    const navbarHeight = document.querySelector(".navbar").offsetHeight; // Get navbar height

    if (targetSection) {
      const targetPosition = targetSection.offsetTop - navbarHeight - gapHeight; // Calculate adjusted scroll position

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  // Smooth scroll for specific sections
  document
    .querySelector('a.nav-link[href="#our-services"]')
    .addEventListener("click", function (event) {
      event.preventDefault();
      smoothScrollTo("our-services", 199); // Adjust gapHeight as needed
    });

  document
    .querySelector('a.nav-link[href="#who-we-are"]')
    .addEventListener("click", function (event) {
      event.preventDefault();
      smoothScrollTo("who-we-are", 60); // Adjust gapHeight as needed
    });

  document
    .querySelector('a.nav-link[href="#our-customers"]')
    .addEventListener("click", function (event) {
      event.preventDefault();
      smoothScrollTo("our-customers", 200); // Adjust gapHeight as needed
    });

  document
    .querySelector('a.nav-link[href="#contact-us"]')
    .addEventListener("click", function (event) {
      event.preventDefault();
      smoothScrollTo("contact-us", 60); // Adjust gapHeight as needed
    });

  document
    .getElementById("read-more-btn")
    .addEventListener("click", function () {
      const aboutUsSection = document.getElementById("who-we-are");
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    });
  // Slider controls
  let currentIndexSlider = 0;

  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      // Calculate increment value
      const increment = target / 200; // 200 increments to reach target within 2 seconds (2000 ms)

      // Increment count and update display
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10); // Update every 10 ms
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
});
