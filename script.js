let currentSlide = 0;

const slider = document.getElementById("slider");
const navItems = document.querySelectorAll(".nav-item");

const totalSlides = 6;


/* =========================
   PINDAH SLIDE
========================= */

function goToSlide(index) {
  if (index < 0) index = 0;
  if (index >= totalSlides) index = totalSlides - 1;

  currentSlide = index;

  slider.style.transform =
    `translate3d(-${currentSlide * 16.6667}%, 0, 0)`;

  updateNavigation();
}


/* =========================
   NAVIGASI
========================= */

function updateNavigation() {

    navItems.forEach((item, index) => {

        item.classList.remove("active");

        if (index === currentSlide) {

            item.classList.add("active");

        }

    });

}


/* =========================
   SWIPE HP
========================= */

let startX = 0;
let endX = 0;

slider.addEventListener("touchstart", function(event) {

    startX = event.touches[0].clientX;

});


slider.addEventListener("touchend", function(event) {

    endX = event.changedTouches[0].clientX;

    handleSwipe();

});


function handleSwipe() {

    const distance = endX - startX;

    if (Math.abs(distance) < 50) {
        return;
    }

    if (distance < 0) {

        // Swipe kiri
        goToSlide(currentSlide + 1);

    } else {

        // Swipe kanan
        goToSlide(currentSlide - 1);

    }

}


/* =========================
   MOUSE / TRACKPAD
========================= */

let mouseStart = 0;

slider.addEventListener("mousedown", function(event) {

    mouseStart = event.clientX;

});

slider.addEventListener("mouseup", function(event) {

    const mouseEnd = event.clientX;

    const distance = mouseEnd - mouseStart;

    if (Math.abs(distance) < 50) {
        return;
    }

    if (distance < 0) {
        goToSlide(currentSlide + 1);
    } else {
        goToSlide(currentSlide - 1);
    }

});


/* =========================
   MULAI DARI HOME
========================= */

goToSlide(0);

/* =========================
   COUNTDOWN
========================= */

const weddingDate = new Date("December 12, 2026 08:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    document.getElementById("days").innerText =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);

/* =========================
   RSVP WHATSAPP
========================= */

function kirimRSVP() {

    const nomorWhatsApp = "6285609363301";

    const pesan =
        "Assalamualaikum, saya ingin mengkonfirmasi kehadiran pada acara pernikahan Catur Wibisono & Mutiara Dewi.";

    const url =
        "https://wa.me/" +
        nomorWhatsApp +
        "?text=" +
        encodeURIComponent(pesan);

    window.open(url, "_blank");
}

function bukaUndangan() {
  const music = document.getElementById("weddingMusic");

  music.play().catch(function(error) {
    console.log("Musik belum dapat diputar:", error);
  });

  goToSlide(1);
}

slider.style.transform =
  `translate3d(-${currentSlide * 16.6667}%, 0, 0)`;