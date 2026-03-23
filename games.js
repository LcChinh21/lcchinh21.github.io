// ===== CLICK AVATAR GAME =====
let clickScore = 0;
const clickScoreEl = document.getElementById('click-score');
const clickableAvatar = document.getElementById('clickable-avatar');
const clickResetBtn = document.getElementById('click-reset');
const clickFeedback = document.getElementById('click-feedback');

const clickMessages = [
    '✨ Great!',
    '🎉 Nice!',
    '💫 Awesome!',
    '🌟 Fantastic!',
    '🍃 Keep going!',
    '✨ Boom!',
    '🎊 Perfect!',
    '💥 Incredible!'
];

if (clickableAvatar) {
    clickableAvatar.addEventListener('click', function() {
        clickScore++;
        clickScoreEl.textContent = clickScore;
        this.classList.add('clicked');
        
        const msg = clickMessages[Math.floor(Math.random() * clickMessages.length)];
        clickFeedback.textContent = msg;
        
        setTimeout(() => {
            this.classList.remove('clicked');
            clickFeedback.textContent = '';
        }, 400);
    });
}

if (clickResetBtn) {
    clickResetBtn.addEventListener('click', function() {
        clickScore = 0;
        clickScoreEl.textContent = clickScore;
        clickFeedback.textContent = 'Reset! 🔄';
        setTimeout(() => {
            clickFeedback.textContent = '';
        }, 1000);
    });
}

// ===== MEMORY CARD GAME =====
const memoryEmojis = ['🎨', '🎭', '🎪', '🎬', '🎨', '🎭', '🎪', '🎬'];
let memoryCards = [];
let flipped = [];
let matched = [];
let tries = 0;
const memoryGrid = document.getElementById('memoryGrid');
const memoryStartBtn = document.getElementById('memory-start');
const memoryTriesEl = document.getElementById('memory-tries');
const memoryResult = document.getElementById('memory-result');

function initMemoryGame() {
    memoryCards = [...memoryEmojis].sort(() => Math.random() - 0.5);
    flipped = [];
    matched = [];
    tries = 0;
    memoryTriesEl.textContent = tries;
    memoryResult.textContent = '';
    memoryGrid.innerHTML = '';
    
    memoryCards.forEach((emoji, idx) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = idx;
        card.dataset.emoji = emoji;
        card.textContent = '?';
        
        card.addEventListener('click', flipCard);
        memoryGrid.appendChild(card);
    });
}

function flipCard(e) {
    if (tries >= 10) return;
    
    const card = e.target;
    const idx = card.dataset.index;
    
    if (flipped.includes(idx) || matched.includes(idx) || card.classList.contains('flipped')) {
        return;
    }
    
    card.classList.add('flipped');
    card.textContent = card.dataset.emoji;
    flipped.push(idx);
    
    if (flipped.length === 2) {
        tries++;
        memoryTriesEl.textContent = tries;
        
        const [first, second] = flipped;
        if (memoryCards[first] === memoryCards[second]) {
            matched.push(first, second);
            document.querySelector(`[data-index="${first}"]`).classList.add('matched');
            document.querySelector(`[data-index="${second}"]`).classList.add('matched');
            flipped = [];
            
            if (matched.length === memoryCards.length) {
                memoryResult.textContent = `🎉 Won in ${tries} tries!`;
            }
        } else {
            setTimeout(() => {
                document.querySelector(`[data-index="${first}"]`).classList.remove('flipped');
                document.querySelector(`[data-index="${first}"]`).textContent = '?';
                document.querySelector(`[data-index="${second}"]`).classList.remove('flipped');
                document.querySelector(`[data-index="${second}"]`).textContent = '?';
                flipped = [];
            }, 600);
        }
        
        if (tries >= 10 && matched.length < memoryCards.length) {
            setTimeout(() => {
                memoryResult.textContent = '😅 Game Over! Try again.';
            }, 600);
        }
    }
}

if (memoryStartBtn) {
    memoryStartBtn.addEventListener('click', initMemoryGame);
}

// ===== TYPING SPEED TEST =====
const typingTexts = [
    'The quick brown fox jumps over the lazy dog',
    'I love coding with passion and creativity',
    'Practice makes perfect in programming',
    'Ghibli vibe is the best aesthetic',
    'JavaScript is fun and powerful'
];

const typingTextEl = document.getElementById('typing-text');
const typingInput = document.getElementById('typing-input');
const typingWPM = document.getElementById('typing-wpm');
const typingAccuracy = document.getElementById('typing-accuracy');
const typingStartBtn = document.getElementById('typing-start');
const typingResult = document.getElementById('typing-result');

let typingStartTime = null;
let currentTypingText = '';
let isTypingActive = false;

if (typingStartBtn) {
    typingStartBtn.addEventListener('click', () => {
        if (!isTypingActive) {
            startTypingTest();
        } else {
            endTypingTest();
        }
    });
}

function startTypingTest() {
    currentTypingText = typingTexts[Math.floor(Math.random() * typingTexts.length)];
    typingTextEl.textContent = currentTypingText;
    typingInput.value = '';
    typingInput.disabled = false;
    typingInput.focus();
    typingStartTime = Date.now();
    isTypingActive = true;
    typingStartBtn.textContent = 'End';
    typingResult.textContent = '';
    typingWPM.textContent = '0';
    typingAccuracy.textContent = '0';
}

function endTypingTest() {
    isTypingActive = false;
    typingInput.disabled = true;
    typingStartBtn.textContent = 'Start';
    
    const endTime = Date.now();
    const timeSeconds = (endTime - typingStartTime) / 1000;
    const timeMinutes = timeSeconds / 60;
    
    const userInput = typingInput.value;
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / timeMinutes);
    
    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < Math.min(userInput.length, currentTypingText.length); i++) {
        if (userInput[i] === currentTypingText[i]) {
            correctChars++;
        }
    }
    const accuracy = Math.round((correctChars / currentTypingText.length) * 100);
    
    typingWPM.textContent = wpm;
    typingAccuracy.textContent = accuracy;
    
    if (accuracy >= 95) {
        typingResult.textContent = `🎉 Perfect! WPM: ${wpm}`;
    } else if (accuracy >= 80) {
        typingResult.textContent = `✨ Great! WPM: ${wpm}`;
    } else if (accuracy >= 60) {
        typingResult.textContent = `👍 Good! WPM: ${wpm}`;
    } else {
        typingResult.textContent = `💪 Keep practicing! WPM: ${wpm}`;
    }
}

if (typingInput) {
    typingInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && isTypingActive) {
            endTypingTest();
        }
    });
}

console.log('Mini games loaded! 🎮✨');
