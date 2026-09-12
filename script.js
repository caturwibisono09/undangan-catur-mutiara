const slider = document.getElementById("slider");
const navItems = document.querySelectorAll(".nav-item");

const totalSlides = 7;

let currentSlide = 0;

const navSlideIndexes = [0, 2, 3, 4, 5, 6];


// =========================
// PINDAH SLIDE
// =========================

function goToSlide(index) {

    index = Math.max(
        0,
        Math.min(index, totalSlides - 1)
    );

    currentSlide = index;

    slider.style.transform =
        `translate3d(-${currentSlide * (100 / totalSlides)}%, 0, 0)`;

    updateNavigation();
}


// =========================
// UPDATE NAVIGASI
// =========================

function updateNavigation() {

    navItems.forEach((item, i) => {

        item.classList.toggle(
            "active",
            navSlideIndexes[i] === currentSlide
        );

    });

}


// =========================
// BUKA UNDANGAN
// =========================

function bukaUndangan() {

    goToSlide(1);

}


// =========================
// NAMA TAMU DARI URL
// =========================

// Contoh:
// index.html?to=Andi%20Saputra

function setGuestName() {

    const params =
        new URLSearchParams(window.location.search);

    const guest =
        params.get("to");

    if (guest && guest.trim()) {

        document.getElementById("guestName").textContent =
            decodeURIComponent(
                guest.replace(/\+/g, " ")
            ).trim();

    }

}

setGuestName();


// =========================
// COUNTDOWN
// =========================

const weddingDate =
    new Date(
        "2026-12-12T08:00:00+07:00"
    ).getTime();


function updateCountdown() {

    const distance =
        weddingDate - Date.now();


    if (distance <= 0) {

        [
            "days",
            "hours",
            "minutes",
            "seconds"
        ].forEach(id => {

            document.getElementById(id).textContent =
                "00";

        });

        return;
    }


    const days =
        Math.floor(
            distance / 86400000
        );


    const hours =
        Math.floor(
            (distance % 86400000) /
            3600000
        );


    const minutes =
        Math.floor(
            (distance % 3600000) /
            60000
        );


    const seconds =
        Math.floor(
            (distance % 60000) /
            1000
        );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


// =========================
// RSVP WHATSAPP
// =========================

function kirimRSVP() {

    const nomorWhatsApp =
        "6285609363301";


    const namaTamu =
        document
            .getElementById("guestName")
            .textContent
            .trim();


    const pesan =
        `Assalamualaikum, saya ${namaTamu} ingin mengkonfirmasi kehadiran pada acara pernikahan Catur Wibisono & Mutiara Dewi.`;


    const url =
        `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


// =========================
// SWIPE
// =========================

let startX = null;
let startY = null;


slider.addEventListener(
    "pointerdown",
    event => {

        startX = event.clientX;
        startY = event.clientY;

    }
);


slider.addEventListener(
    "pointerup",
    event => {

        if (
            startX === null ||
            startY === null
        ) {
            return;
        }


        const dx =
            event.clientX - startX;


        const dy =
            event.clientY - startY;


        startX = null;
        startY = null;


        // Gerakan horizontal harus lebih dominan

        if (
            Math.abs(dx) < 50 ||
            Math.abs(dx) <= Math.abs(dy)
        ) {
            return;
        }


        if (dx < 0) {

            goToSlide(
                currentSlide + 1
            );

        } else {

            goToSlide(
                currentSlide - 1
            );

        }

    }
);


slider.addEventListener(
    "pointercancel",
    () => {

        startX = null;
        startY = null;

    }
);


// Mulai dari Home

goToSlide(0);