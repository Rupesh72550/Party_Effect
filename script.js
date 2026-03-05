document.addEventListener('DOMContentLoaded', () => {
    const inputSection = document.getElementById('input-section');
    const greetingSection = document.getElementById('greeting-section');
    const nameInput = document.getElementById('name-input');
    const startBtn = document.getElementById('start-btn');
    const welcomeMessage = document.getElementById('welcome-message');

    startBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();

        if (name === '') {
            nameInput.classList.add('shake');
            setTimeout(() => nameInput.classList.remove('shake'), 500);
            return;
        }

        // Hide input section and show greeting
        inputSection.classList.add('hidden');
        
        setTimeout(() => {
            welcomeMessage.textContent = `Welcome, ${name}!`;
            greetingSection.classList.remove('hidden');
            
            // Trigger celebration
            startCelebration();
        }, 300); // Wait for the hide transition
    });

    // Optional: Allow pressing Enter to start
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startBtn.click();
        }
    });
});

function startCelebration() {
    // 1. Change background to party mode
    document.body.classList.add('party-mode');

    // 2. Start confetti
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        createConfetti();
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());

    // 3. Start fireworks
    let fireworkInterval = setInterval(() => {
        createFirework();
    }, 400);

    // Stop intense fireworks after 3 seconds
    setTimeout(() => {
        clearInterval(fireworkInterval);
        
        // Slower fireworks after
        setInterval(() => {
            createFirework();
        }, 1500);
    }, 3000);
}

function createConfetti() {
    const colors = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#eccc68'];
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    // Randomize appearance
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Randomize shape (some circles, some squares, some rectangles)
    const type = Math.random();
    if (type < 0.3) {
        // Circle
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.borderRadius = '50%';
    } else if (type < 0.6) {
        // Square
        confetti.style.width = '10px';
        confetti.style.height = '10px';
    } else {
        // Rectangle
        confetti.style.width = '15px';
        confetti.style.height = '8px';
    }

    // Randomize fall speed
    const duration = Math.random() * 3 + 2;
    confetti.style.animationDuration = duration + 's';
    
    document.body.appendChild(confetti);

    // Remove element after it falls
    setTimeout(() => {
        confetti.remove();
    }, duration * 1000);
}

function createFirework() {
    const container = document.getElementById('fireworks-container');
    const x = Math.random() * 100;
    const y = Math.random() * 60 + 10; // Upper half mostly
    
    const colors = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#ff6b81', '#7bed9f'];
    const hue = colors[Math.floor(Math.random() * colors.length)];

    // Create the central explosion flash
    const flash = document.createElement('div');
    flash.classList.add('firework');
    flash.style.left = x + 'vw';
    flash.style.top = y + 'vh';
    flash.style.background = `radial-gradient(circle, ${hue} 0%, transparent 60%)`;
    container.appendChild(flash);
    
    setTimeout(() => flash.remove(), 800);

    // Create particles
    const particleCount = 20 + Math.random() * 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = x + 'vw';
        particle.style.top = y + 'vh';
        particle.style.backgroundColor = hue;
        
        // Calculate explosion physics
        const angle = Math.random() * Math.PI * 2;
        const velocity = 20 + Math.random() * 60; // Spread distance
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity + 15; // +15 gravity effect
        
        // CSS variables for animation keyframes
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}
