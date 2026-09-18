/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =========================================
     HAMBURGER MENU
  ========================================== */

  const hamburger =
    document.getElementById("hamburger");

  const navMenu =
    document.getElementById("navMenu");


  if (hamburger && navMenu) {

    hamburger.addEventListener("click", () => {

      const isOpen =
        navMenu.classList.toggle("active");

      hamburger.classList.toggle(
        "active",
        isOpen
      );

      hamburger.setAttribute(
        "aria-expanded",
        isOpen
      );

    });


    /*
      Mobile menu link click hone par
      menu close.
    */

    navMenu
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {

          navMenu.classList.remove("active");

          hamburger.classList.remove("active");

          hamburger.setAttribute(
            "aria-expanded",
            "false"
          );

        });

      });

  }


  /* =========================================
     DARK / LIGHT MODE
  ========================================== */

  const themeToggle =
    document.getElementById("themeToggle");


  const savedTheme =
    localStorage.getItem("abdullah-theme");


  /*
    Default = DARK
  */

  if (savedTheme === "light") {

    document.body.classList.add("light");

    if (themeToggle) {
      themeToggle.textContent = "🌙";
    }

  } else {

    document.body.classList.remove("light");

    if (themeToggle) {
      themeToggle.textContent = "☀️";
    }

  }


  if (themeToggle) {

    themeToggle.addEventListener("click", () => {

      const isLight =
        document.body.classList.toggle("light");


      if (isLight) {

        themeToggle.textContent = "🌙";

        localStorage.setItem(
          "abdullah-theme",
          "light"
        );

      } else {

        themeToggle.textContent = "☀️";

        localStorage.setItem(
          "abdullah-theme",
          "dark"
        );

      }

    });

  }


  /* =========================================
     SCROLL REVEAL
  ========================================== */

  const revealElements =
    document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right"
    );


  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("active");

            /*
              Ek baar animation hone ke baad
              observer ki zarurat nahi.
            */

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });


  /* =========================================
     SKILL BARS
     
     IMPORTANT:
     Starting width = 0
     Scroll par target width tak animate.
  ========================================== */

  const skillFills =
    document.querySelectorAll(".skill-fill");


  const skillsSection =
    document.getElementById("skills");


  let skillsAnimated = false;


  const animateSkills = () => {

    if (skillsAnimated) {
      return;
    }

    skillsAnimated = true;


    skillFills.forEach((fill, index) => {

      const targetWidth =
        fill.dataset.width || "0%";


      /*
        Pehle explicitly 0.
      */

      fill.style.width = "0";


      /*
        Staggered animation.
      */

      setTimeout(() => {

        fill.style.width =
          targetWidth;

      }, index * 100);

    });

  };


  if (skillsSection) {

    const skillObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              animateSkills();

              skillObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.25
        }
      );


    skillObserver.observe(skillsSection);

  }


  /* =========================================
     PROJECT CAROUSEL
     
     IMPORTANT FIX:
     - All project cards remain in DOM.
     - Sirf active card display hota hai.
     - Next/Previous par proper slide change.
     - Cards delete nahi hote.
     ========================================== */

  const projectCards =
    Array.from(
      document.querySelectorAll(
        ".project-card"
      )
    );


  const dots =
    Array.from(
      document.querySelectorAll(".dot")
    );


  const prevButton =
    document.getElementById(
      "prevProject"
    );


  const nextButton =
    document.getElementById(
      "nextProject"
    );


  let currentProject = 0;


  /*
    Project ko show karne ka
    single function.
  */

  function showProject(index) {

    if (!projectCards.length) {
      return;
    }


    /*
      Index ko safe range mein rakho.
    */

    if (index < 0) {

      index =
        projectCards.length - 1;

    }

    if (
      index >= projectCards.length
    ) {

      index = 0;

    }


    currentProject = index;


    /*
      IMPORTANT:
      Kisi card ko remove nahi karna.

      Sirf classes change karni hain.
    */

    projectCards.forEach(
      (card, cardIndex) => {

        card.classList.toggle(
          "active",
          cardIndex === currentProject
        );

      }
    );


    /*
      Dots update.
    */

    dots.forEach(
      (dot, dotIndex) => {

        dot.classList.toggle(
          "active",
          dotIndex === currentProject
        );

      }
    );

  }


  /*
    Next button.
  */

  if (nextButton) {

    nextButton.addEventListener(
      "click",
      () => {

        showProject(
          currentProject + 1
        );

      }
    );

  }


  /*
    Previous button.
  */

  if (prevButton) {

    prevButton.addEventListener(
      "click",
      () => {

        showProject(
          currentProject - 1
        );

      }
    );

  }


  /*
    Dot buttons.
  */

  dots.forEach((dot, index) => {

    dot.addEventListener(
      "click",
      () => {

        showProject(index);

      }
    );

  });


  /*
    Initial state.

    FIRST project only.
    Baaki sab closed.
  */

  showProject(0);


  /* =========================================
     KEYBOARD CAROUSEL
  ========================================== */

  document.addEventListener(
    "keydown",
    event => {

      /*
        ArrowLeft = previous
        ArrowRight = next
      */

      if (event.key === "ArrowLeft") {

        showProject(
          currentProject - 1
        );

      }


      if (event.key === "ArrowRight") {

        showProject(
          currentProject + 1
        );

      }

    }
  );


  /* =========================================
     FAQ ACCORDION
     
     FIRST OPEN BY DEFAULT.
     
     Important:
     FAQ items ko delete nahi karna.
     Sirf active class toggle hogi.
  ========================================== */

  const faqItems =
    Array.from(
      document.querySelectorAll(
        ".faq-item"
      )
    );


  function setFaqState(
    item,
    shouldOpen
  ) {

    item.classList.toggle(
      "active",
      shouldOpen
    );


    const icon =
      item.querySelector(
        ".faq-icon"
      );


    if (icon) {

      icon.textContent =
        shouldOpen ? "−" : "+";

    }

  }


  /*
    Initial state:
    FIRST = OPEN
    Others = CLOSED
  */

  faqItems.forEach(
    (item, index) => {

      setFaqState(
        item,
        index === 0
      );

    }
  );


  /*
    FAQ click.

    Is version mein kisi item ko remove
    nahi kiya ja raha.
  */

  faqItems.forEach(item => {

    const question =
      item.querySelector(
        ".faq-question"
      );


    if (!question) {
      return;
    }


    question.addEventListener(
      "click",
      () => {

        const wasOpen =
          item.classList.contains(
            "active"
          );


        /*
          Sab ko close.
        */

        faqItems.forEach(
          faq => {

            setFaqState(
              faq,
              false
            );

          }
        );


        /*
          Agar clicked item pehle
          closed tha to open.
        */

        if (!wasOpen) {

          setFaqState(
            item,
            true
          );

        }

      }
    );

  });


  /* =========================================
     COUNTERS
     
     0 se start.
     Scroll par target tak animate.
     
     Page refresh par DOM value already 0 hai.
  ========================================== */

  const counters =
    document.querySelectorAll(
      ".counter"
    );


  const statsSection =
    document.querySelector(
      ".stats"
    );


  let countersStarted = false;


  function animateCounter(counter) {

    const target =
      Number(
        counter.dataset.target
      );


    /*
      Explicitly 0 se start.
    */

    counter.textContent = "0";


    const duration = 1600;

    const startTime =
      performance.now();


    function updateCounter(
      currentTime
    ) {

      const elapsed =
        currentTime - startTime;


      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      /*
        Smooth easing.
      */

      const eased =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      const currentValue =
        Math.floor(
          target * eased
        );


      counter.textContent =
        currentValue;


      if (progress < 1) {

        requestAnimationFrame(
          updateCounter
        );

      } else {

        counter.textContent =
          target;

      }

    }


    requestAnimationFrame(
      updateCounter
    );

  }


  if (statsSection) {

    const counterObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting &&
              !countersStarted
            ) {

              countersStarted = true;


              counters.forEach(
                counter => {

                  animateCounter(
                    counter
                  );

                }
              );


              counterObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.3
        }
      );


    counterObserver.observe(
      statsSection
    );

  }


  /* =========================================
     CONTACT FORM
  ========================================== */

  const contactForm =
    document.getElementById(
      "contactForm"
    );


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        alert(
          "Thanks! Your message has been received."
        );


        contactForm.reset();

      }
    );

  }


  /* =========================================
     CLOSE MENU WHEN CLICKING OUTSIDE
  ========================================== */

  document.addEventListener(
    "click",
    event => {

      if (
        !hamburger ||
        !navMenu
      ) {
        return;
      }


      const clickedInsideMenu =
        navMenu.contains(
          event.target
        );


      const clickedHamburger =
        hamburger.contains(
          event.target
        );


      if (
        navMenu.classList.contains(
          "active"
        ) &&
        !clickedInsideMenu &&
        !clickedHamburger
      ) {

        navMenu.classList.remove(
          "active"
        );

        hamburger.classList.remove(
          "active"
        );

        hamburger.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


});