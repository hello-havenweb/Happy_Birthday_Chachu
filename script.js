const PASSWORD = "birthday2026";

const passwordPage = document.getElementById("password-page");
const envelopePage = document.getElementById("envelope-page");
const birthdayPage = document.getElementById("birthday-page");
const passwordInput = document.getElementById("password-input");
const unlockBtn = document.getElementById("unlock-btn");
const passwordError = document.getElementById("password-error");
const envelope = document.getElementById("envelope");
const musicToggle = document.getElementById("music-toggle");
const birthdayAudio = document.getElementById("birthday-song");
const replayBtn = document.getElementById("replay-btn");
const confettiCanvas = document.getElementById("confetti-canvas");

let musicPlaying = false;

unlockBtn.addEventListener("click", checkPassword);
passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkPassword();
});

function checkPassword() {
    if (passwordInput.value === PASSWORD) {
        passwordPage.classList.remove("active");
        envelopePage.classList.add("active");
        passwordError.textContent = "";
    } else {
        passwordError.textContent = "❌ Incorrect password. Try again!";
        passwordInput.value = "";
    }
}

envelope.addEventListener("click", () => {
    envelope.classList.add("open");
    setTimeout(() => {
        envelopePage.classList.remove("active");
        birthdayPage.classList.add("active");
        startConfetti();
        startFireworks();
    }, 1500);
});

const gifts = document.querySelectorAll(".gift");
const giftMessage = document.getElementById("gift-message");

gifts.forEach(gift => {
    gift.addEventListener("click", () => {
        const message = gift.getAttribute("data-message");
        giftMessage.textContent = message;
        gift.style.animation = "none";
        setTimeout(() => {
            gift.style.animation = "fadeIn 0.5s";
        }, 10);
    });
});

musicToggle.addEventListener("click", () => {
    if (musicPlaying) {
        birthdayAudio.pause();
        musicToggle.textContent = "🎵 Play Music";
        musicPlaying = false;
    } else {
        birthdayAudio.play();
        musicToggle.textContent = "⏸ Pause Music";
        musicPlaying = true;
    }
});

replayBtn.addEventListener("click", () => {
    location.reload();
});

const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiPieces = [];

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 8 + 5,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces.forEach((piece, index) => {
        ctx.fillStyle = piece.color;
        ctx.fillRect(piece.x, piece.y, piece.size, piece.size);
        piece.y += piece.speedY;
        piece.x += piece.speedX;
        if (piece.y > confettiCanvas.height) {
            confettiPieces.splice(index, 1);
        }
    });
    if (confettiPieces.length > 0) {
        requestAnimationFrame(drawConfetti);
    }
}

function startConfetti() {
    createConfetti();
    drawConfetti();
}

function startFireworks() {
    setInterval(() => {
        if (confettiPieces.length < 50) {
            for (let i = 0; i < 30; i++) {
                confettiPieces.push({
                    x: Math.random() * confettiCanvas.width,
                    y: -10,
                    size: Math.random() * 6 + 3,
                    speedY: Math.random() * 4 + 2,
                    speedX: Math.random() * 3 - 1.5,
                    color: `hsl(${Math.random() * 360}, 100%, 60%)`
                });
            }
            drawConfetti();
        }
    }, 2000);
}

window.addEventListener("resize", () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});
