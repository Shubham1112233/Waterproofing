document.addEventListener("DOMContentLoaded", () => {
  const inlineElements = document.querySelectorAll(
    ".inline-left, .inline-right"
  );

  let ticking = false;

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        inlineElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight) {
            element.classList.add("is-visible");
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", handleScroll);

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
