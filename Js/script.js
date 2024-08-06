// window.addEventListener('load', () => {
//   pageRevealAnimation();
// })

// -=Media Button=- //

const mediaButton = document.querySelectorAll(".social-network-button");
const mediaMenu = document.getElementById("media-menu");
const mediaMenuLinks = mediaMenu.getElementsByClassName("media-menu-btn");

let tl = gsap.timeline({ paused: true });
tl.call(addMediaMenuStyle);
tl.fromTo(
  mediaMenu,
  0.7,
  { css: { transform: "translateX(-100%)" } },
  { css: { transform: "translateX(0%)" }, ease: Power3.easeOut }
);
tl.fromTo(
  mediaMenuLinks,
  0.6,
  { x: "-120%" },
  { x: "0%", ease: Power1.easeInOut, stagger: 0.05 },
  "-=0.55"
);
tl.call(addMediaMenuStyle);
tl.reverse();

function toggleClassActive(obj) {
  obj.classList.toggle("active");
}

function closeMediaMenu() {
  tl.reverse();
}

function addMediaMenuStyle() {
  if (pageThree.classList.contains("active"))
    mediaMenu.classList.add("on-third-page");
  else mediaMenu.classList.remove("on-third-page");
}

mediaButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    tl.reversed(!tl.reversed());
    toggleClassActive(mediaMenu);
  });
});

// -=Themes Change=- //

const themeChangeButton = document.querySelectorAll(".logo");
const root = document.documentElement;

// Windows theme, doesnt work;

// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {checkWindowsTheme(e)});

// function checkWindowsTheme(e) {
//   if (e.matches) {
//     localStorage.setItem('theme', 'dark');
//   } else {
//     localStorage.setItem('theme', 'light');
//   }
//   setTheme();
// }

setTheme();

themeChangeButton.forEach((el) => {
  el.addEventListener("click", () => {
    changeThemeAnimation();
    closeMediaMenu();
  });
});

function reMakeTheme() {
  if (localStorage.getItem("theme") === "dark") {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
  setTheme();
}

function setTheme() {
  if (localStorage.getItem("theme") === "dark") {
    root.classList.add("dark-theme");
  } else {
    root.classList.remove("dark-theme");
  }
}

// -=Theme Animation=- //

let animationBox;

function changeThemeAnimation() {
  let themeAnim = gsap.timeline();

  document.body.insertAdjacentHTML(
    "afterbegin",
    '<div class="change-theme-animation-box"><div class="box"></div><div class="box"></div><div class="box"></div></div>'
  );

  animationBox = document.querySelector(".change-theme-animation-box");

  const animationBoxes = animationBox.querySelectorAll(".box");

  themeAnim.from(animationBoxes, { css: { transform: "translateX(100%)" } });
  themeAnim.to(animationBoxes, 0.7, {
    css: { transform: "translateX(0)" },
    stagger: 0.15,
    ease: Power3.easeOut,
  });
  themeAnim.call(reMakeTheme);
  themeAnim.to(
    animationBoxes,
    {
      css: { transform: "translateX(-100%)" },
      stagger: 0.15,
      ease: Power3.easeOut,
      duration: 0.7,
    },
    "=+0.3"
  );
  themeAnim.call(deleteAnimationBox);
}

function deleteAnimationBox() {
  animationBox.parentNode.removeChild(animationBox);
}

// -=Question Acordeon=- //

const Acordeon = document.querySelectorAll(".questions .faq");

Acordeon.forEach((question) => {
  question.addEventListener("click", () => {
    Acordeon.forEach((q) => {
      if (q !== question && q.classList.contains("active")) {
        q.classList.remove("active");

        setTimeout(() => {
          const answer = q.querySelector(".answer");
          answer.style.maxHeight = null;
        }, 200);
      }
    });

    question.classList.toggle("active");
    const answer = question.querySelector(".answer");

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

// -=Slider between pages=- //

const homeButton = document.querySelectorAll(".Home");
const aboutUsButton = document.querySelectorAll(".About-us");
const frequentQuestionsButton = document.querySelectorAll(
  ".Frequent-questions"
);

console.log(homeButton);

const pageOne = document.getElementById("section-one");
const pageTwo = document.getElementById("section-two");
const pageThree = document.getElementById("section-three");

const pagesArr = [pageOne, pageTwo, pageThree];

homeButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (pageOne.classList.contains("active")) return;
    console.log(getActivePage());
    closeMediaMenu();
    pageAnimation(getActivePage(), pageOne);
  });
});

aboutUsButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (pageTwo.classList.contains("active")) return;
    closeMediaMenu();
    pageAnimation(getActivePage(), pageTwo);
  });
});

frequentQuestionsButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (pageThree.classList.contains("active")) return;
    closeMediaMenu();
    pageAnimation(getActivePage(), pageThree);
  });
});

function closePages() {
  pageOne.classList.remove("active");
  pageTwo.classList.remove("active");
  pageThree.classList.remove("active");
}

function getActivePage() {
  for (let page of pagesArr) {
    if (page.classList.contains("active")) {
      console.log(page);
      return page;
    }
  }
}

// -=Page slider Animation=- //

function pageAnimation(pageFrom, pageTo) {
  let tA = gsap.timeline();

  document.body.insertAdjacentHTML(
    "afterbegin",
    '<div class="change-theme-animation-box"></div>'
  );
  animationBox = document.querySelector(".change-theme-animation-box");
  animationBox.style.backgroundColor = "var(--main-color)";

  tA.fromTo(
    animationBox,
    { css: { transform: "translateY(100%)" } },
    {
      css: { transform: "translateY(0%)" },
      duration: 0.8,
      ease: Power1.easeInOut,
    }
  );
  tA.fromTo(
    pageFrom,
    { opacity: 1 },
    {
      opacity: 0,
      duration: 0.7,
      ease: Power1.easeOut,
    },
    "-=0.7"
  );
  tA.call(() => {
    closePages();
    pageTo.classList.add("active");
  });
  tA.to(animationBox, {
    css: { transform: "translateY(-100%)" },
    duration: 0.5,
  });
  tA.call(deleteAnimationBox);
  tA.to(pageFrom, { opacity: 1 });
}

// -=First Page Reveal=- //

const pageHeroText = document.querySelectorAll("#section-one .hero h1");
const pageNav = document.querySelectorAll("#section-one .navigation");
const allPagesNavigation = document.querySelectorAll(".navigation");
console.log(allPagesNavigation);

function pageRevealAnimation() {
  let tl = gsap.timeline();

  pageHeroText[0].style.position = "absolute";

  const pageHeroTextWithoutFirstEL = [...pageHeroText];
  pageHeroTextWithoutFirstEL.shift();

  splitText();

  tl.set(pageHeroTextWithoutFirstEL, { autoAlpha: 0, y: 20 });
  tl.set(pageHeroText[0], {
    top: "50%",
    yPercent: -60,
    autoAlpha: 1,
    overflow: "hidden",
  });
  tl.set(pageNav, {
    clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
    scale: 0.98,
  });

  tl.from(pageHeroText[0].querySelectorAll("span"), {
    duration: 1.8,
    ease: Expo.easeInOut,
    stagger: 0.08,
    y: "110%",
    delay: 0.4,
    scale: 0.4,
  });
  tl.to(pageHeroText[0], {
    top: "0",
    yPercent: 0,
    overflow: "visible",
    duration: 0.7,
    ease: Power1.easeInOut,
    onComplete: function () {
      pageHeroText[0].style.position = "relative";
    },
  });
  tl.to(pageHeroTextWithoutFirstEL, {
    y: 0,
    autoAlpha: 1,
    stagger: 0.08,
    ease: Expo.easeOut,
    duration: 2,
  });
  tl.fromTo(
    pageNav,
    { clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)" },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scale: 1,
      duration: 1.4,
      ease: Expo.easeOut,
    },
    "-=1.8"
  );

  const socialMenuAnim = pageOne.querySelectorAll(
    ".social-network-bar .social-link"
  );
  const animationHeader = [
    pageOne.querySelector(".social-network-button"),
    pageOne.querySelector(".section-button"),
  ];

  tl.fromTo(
    socialMenuAnim,
    { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      stagger: 0.07,
      ease: Power2.easeInOut,
    },
    "-=1.8"
  );
  tl.fromTo(
    animationHeader,
    { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.4,
      ease: Power2.easeInOut,
      stagger: 0.2,
    },
    "-=2.2"
  );
  tl.call(function () {
    allPagesNavigation.forEach((nav) => {
      nav.classList.add("shadow");
    });
  });
}

function getElTopPos(El) {
  return (window.innerHeight - El.offsetHeight) / 2;
}

// function splitText() {
//   text = pageHeroText[0].textContent;

//   pageHeroText[0].textContent = '';

//   const chars = text.split('');

//   chars.forEach(char => {
//     let span = document.createElement("span");
//     span.textContent = char;
//     span.style.display = "inline-block";

//     pageHeroText[0].appendChild(span);
//   })
// }

function splitText() {
  const heroText = pageHeroText[0].textContent;
  const heroTextArray = heroText.split(" ");

  pageHeroText[0].textContent = "";
  pageHeroText[0].style.display = "flex";
  heroTextArray.forEach((word, index) => {
    const wordWrapper = document.createElement("div");
    wordWrapper.style.wordSpacing -= "10";
    wordWrapper.classList.add("word");

    word.split("").forEach((letter) => {
      const letterSpan = document.createElement("span");
      letterSpan.textContent = letter;
      letterSpan.style.display = "inline-block";
      wordWrapper.appendChild(letterSpan);
    });

    // add non-breaking space after each word

    wordWrapper.innerHTML += '<span style="margin-right: 0.1em"></span>';

    pageHeroText[0].appendChild(wordWrapper);
  });
}

// function splitText() {
//   let text = pageHeroText[0].textContent;
//   let splitText = text.split("");
//   pageHeroText[0].textContent = "";
//   splitText.forEach((letter, index) => {
//     let span = document.createElement("span");
//     span.textContent = letter;
//     span.style.display = "inline-block";
//     pageHeroText[0].appendChild(span);
//   });
// }

pageRevealAnimation();
