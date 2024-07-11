function openForm() {
  document.getElementById("popupForm").style.display = "flex";
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

let slideIndex = 0;
const slides = document.querySelector(".slider");
const dots = document.querySelectorAll(".dot");

function showSlides(n) {
  if (n >= dots.length) {
    slideIndex = 0;
  } else if (n < 0) {
    slideIndex = dots.length - 1;
  } else {
    slideIndex = n;
  }

  slides.style.transform = `translateX(-${slideIndex * 100}%)`;
  dots.forEach((dot, index) => {
    dot.classList.remove("active");
    if (index === slideIndex) {
      dot.classList.add("active");
    }
  });
}

function currentSlide(n) {
  showSlides(n);
}

function autoSlide() {
  slideIndex++;
  showSlides(slideIndex);
}

setInterval(autoSlide, 9000);

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => currentSlide(index));
});

function showOverlay(element) {
  let overlay = element.querySelector(".overlay");
  overlay.style.opacity = "1";
}

function hideOverlay(element) {
  let overlay = element.querySelector(".overlay");
  overlay.style.opacity = "0";
}

const counters = document.querySelectorAll(".count");
const speed = 200;

const updateCount = (counter) => {
  const target = +counter.getAttribute("data-target");
  const count = +counter.innerText;
  const increment = target / speed;

  if (count < target) {
    counter.innerText = Math.ceil(count + increment);
    setTimeout(() => updateCount(counter), 1);
  } else {
    counter.innerText = `${target} +`;
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

counters.forEach((counter) => {
  observer.observe(counter);
});

document.querySelectorAll(".ourproject-content div").forEach((item) => {
  item.addEventListener("click", (event) => {
    document
      .querySelectorAll(".ourproject-content div")
      .forEach((div) => div.classList.remove("active"));
    document
      .querySelectorAll(".ourproject-image-container img")
      .forEach((img) => img.classList.remove("active"));
    item.classList.add("active");
    const imageId = item.getAttribute("data-image");
    document.getElementById(imageId).classList.add("active");
  });
});
