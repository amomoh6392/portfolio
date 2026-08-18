const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("show");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}


// Current year
const currentYear = document.querySelector("#currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// Typing animation
const typingText = document.querySelector("#typingText");

const phrases = [
    "Hello, I'm",
    "I'm a Front-End Developer",
    "I build responsive websites",
    "I solve problems with code"
];

let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {

    if (!typingText) {
        return;
    }

    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {

        typingText.textContent =
            currentPhrase.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentPhrase.length) {
            isDeleting = true;

            setTimeout(typeEffect, 1800);
            return;
        }

        setTimeout(typeEffect, 100);

    } else {

        typingText.textContent =
            currentPhrase.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {

            isDeleting = false;

            phraseIndex++;

            if (phraseIndex === phrases.length) {
                phraseIndex = 0;
            }

            setTimeout(typeEffect, 500);
            return;
        }

        setTimeout(typeEffect, 60);
    }
}

typeEffect();