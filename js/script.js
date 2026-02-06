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

// Fly button in arc behind GIF in Step 2
function flyBehindGif(btn) {
    const gif = document.querySelector('#step2 .bear-img');
    const btnRect = btn.getBoundingClientRect();
    const gifRect = gif.getBoundingClientRect();

    // Make the GIF sit above the button in z-order
    gif.style.position = 'relative';
    gif.style.zIndex = '10';
    btn.style.zIndex = '1';
    btn.style.transition = 'none';
    btn.style.pointerEvents = 'none';

    // End point: center of the GIF
    const endX = gifRect.left + gifRect.width / 2 - btnRect.left - btnRect.width / 2;
    const endY = gifRect.top + gifRect.height / 2 - btnRect.top - btnRect.height / 2;

    // Control point: swing out to the right and above the text for a nice arc
    const cpX = endX + 250;
    const cpY = endY * 0.4;

    const duration = 900;
    const startTime = performance.now();

    function animate(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        // Quadratic bezier curve
        const x = 2 * (1 - t) * t * cpX + t * t * endX;
        const y = 2 * (1 - t) * t * cpY + t * t * endY;
        const scale = 1 - t * 0.8;

        btn.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${t * 360}deg)`;
        btn.style.opacity = 1 - t;

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            btn.style.visibility = 'hidden';
        }
    }

    requestAnimationFrame(animate);
}

// Hide behind yes button in Step 3
function hideBehindYes(btn) {
    const yesBtn = document.querySelector('#step3 .btn-yes');
    const btnRect = btn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    // Calculate distance to move behind the yes button
    const dx = yesRect.left + yesRect.width / 2 - btnRect.left - btnRect.width / 2;
    const dy = yesRect.top + yesRect.height / 2 - btnRect.top - btnRect.height / 2;

    btn.style.zIndex = '1';
    btn.style.transform = `translate(${dx}px, ${dy}px) scale(0.8)`;
    btn.style.opacity = '0';
}

// Push right button off screen in Step 5
function pushButton(noBtn) {
    const yesBtn = document.querySelector('#step5 .btn-yes');
    // Slide the yes button sharply to the right, pushing the no button away
    yesBtn.style.transform = 'translateX(200%)';
    noBtn.style.transform = 'translateX(600%)';
    // After animation, reset yes button and hide no button
    setTimeout(() => {
        yesBtn.style.transform = 'translateX(0)';
        noBtn.style.visibility = 'hidden';
    }, 500);
}

// Mario stomp in Step 7
function marioStomp() {
    const yesBtn = document.querySelector('#step7 .btn-yes');
    const noBtn = document.querySelector('#step7 .btn-no');

    // Disable buttons during animation
    yesBtn.style.pointerEvents = 'none';
    noBtn.style.pointerEvents = 'none';
    noBtn.style.transformOrigin = 'bottom center';

    // Calculate horizontal distance to land on the no button
    const yesRect = yesBtn.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();
    const dx = noRect.left + noRect.width / 2 - yesRect.left - yesRect.width / 2;

    // Jump 1 — up
    yesBtn.style.transition = 'transform 0.25s ease-out';
    yesBtn.style.transform = `translate(${dx}px, -90px)`;

    // Jump 1 — land
    setTimeout(() => {
        yesBtn.style.transition = 'transform 0.15s ease-in';
        yesBtn.style.transform = `translate(${dx}px, 0)`;
        noBtn.style.transition = 'transform 0.15s ease-in';
        noBtn.style.transform = 'scaleY(0.75)';
    }, 280);

    // Jump 2 — up (no button springs back)
    setTimeout(() => {
        yesBtn.style.transition = 'transform 0.25s ease-out';
        yesBtn.style.transform = `translate(${dx}px, -110px)`;
        noBtn.style.transition = 'transform 0.2s ease-out';
        noBtn.style.transform = 'scaleY(1)';
    }, 530);

    // Jump 2 — land
    setTimeout(() => {
        yesBtn.style.transition = 'transform 0.15s ease-in';
        yesBtn.style.transform = `translate(${dx}px, 0)`;
        noBtn.style.transition = 'transform 0.15s ease-in';
        noBtn.style.transform = 'scaleY(0.5)';
    }, 830);

    // Jump 3 — BIG jump
    setTimeout(() => {
        yesBtn.style.transition = 'transform 0.35s ease-out';
        yesBtn.style.transform = `translate(${dx}px, -160px)`;
        noBtn.style.transition = 'transform 0.2s ease-out';
        noBtn.style.transform = 'scaleY(0.7)';
    }, 1080);

    // Jump 3 — STOMP!
    setTimeout(() => {
        yesBtn.style.transition = 'transform 0.13s ease-in';
        yesBtn.style.transform = `translate(${dx}px, 0)`;
        noBtn.style.transition = 'transform 0.13s ease-in';
        noBtn.style.transform = 'scaleY(0.1)';
    }, 1480);

    // Button flattened — fade out and return yes button
    setTimeout(() => {
        noBtn.style.transition = 'opacity 0.3s';
        noBtn.style.opacity = '0';
        yesBtn.style.transition = 'transform 0.4s ease-out';
        yesBtn.style.transform = 'translate(0, 0)';
        yesBtn.style.pointerEvents = 'auto';
    }, 1700);
}

// Grow "Yes" button when "Nein" is clicked on Step 8
let noClickCount = 0;
function growYesButton() {
    noClickCount++;
    const yesBtn = document.querySelector('#step8 .grow-btn');
    const scales = [1.5, 2.2, 3, 4.5];
    const scale = scales[Math.min(noClickCount - 1, scales.length - 1)];
    yesBtn.style.transform = `scale(${scale})`;
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