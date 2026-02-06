// Prevent closing the page until END is clicked
let canClose = false;
window.addEventListener('beforeunload', function(e) {
    if (!canClose) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// Request fullscreen on first click
document.addEventListener('click', function enterFS() {
    document.documentElement.requestFullscreen().catch(() => {});
    document.removeEventListener('click', enterFS);
}, { once: true });

// Create hearts effect
 function createHearts() {
    const hearts = document.querySelector('.hearts');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

setInterval(createHearts, 300);

// Move "No" button function
function moveButton(button) {
    // Move button to body so 'fixed' works correctly (container has transform)
    if (button.parentElement !== document.body) {
        // Leave invisible placeholder so the layout doesn't shift
        const placeholder = document.createElement('button');
        placeholder.className = button.className;
        placeholder.style.visibility = 'hidden';
        placeholder.textContent = button.textContent;
        button.parentElement.replaceChild(placeholder, button);
        document.body.appendChild(button);
    }

    const padding = 20;
    const btnWidth = button.offsetWidth || 160;
    const btnHeight = button.offsetHeight || 50;
    const x = padding + Math.random() * (window.innerWidth - btnWidth - padding * 2);
    const y = padding + Math.random() * (window.innerHeight - btnHeight - padding * 2);

    button.style.position = 'fixed';
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
    button.style.zIndex = '9999';
}

// Hide any "No" buttons that were moved to body
function hideMovedButtons() {
    document.querySelectorAll('body > .btn-no').forEach(btn => btn.style.display = 'none');
}

// Navigation functions
function goToStep2() {
    hideMovedButtons();
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
    triggerConfetti();
}

function goToStep3() {
    hideMovedButtons();
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.add('active');
    triggerConfetti();
}

function goToStep4() {
    hideMovedButtons();
    document.getElementById('step3').classList.remove('active');
    document.getElementById('step4').classList.add('active');
    triggerConfetti();
}

function goToStep5() {
    hideMovedButtons();
    document.getElementById('step4').classList.remove('active');
    document.getElementById('step5').classList.add('active');
    triggerConfetti();
}

function goToStep6() {
    hideMovedButtons();
    document.getElementById('step5').classList.remove('active');
    document.getElementById('step6').classList.add('active');
    triggerConfetti();
}

function goToStep7() {
    hideMovedButtons();
    document.getElementById('step6').classList.remove('active');
    document.getElementById('step7').classList.add('active');
    triggerConfetti();
}

function goToStep8() {
    hideMovedButtons();
    document.getElementById('step7').classList.remove('active');
    document.getElementById('step8').classList.add('active');
    triggerConfetti();
}

function finalStep() {
    document.getElementById('step8').classList.remove('active');
    document.querySelector('.final-message').style.display = 'block';
    document.querySelector('.end-btn').style.display = 'inline-block';
    triggerConfetti();
    
    // Additional confetti for the final celebration
    setTimeout(() => triggerConfetti(), 500);
    setTimeout(() => triggerConfetti(), 1000);
    setTimeout(() => triggerConfetti(), 1500);
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}