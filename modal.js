// Modal functionality for feedback form
const modal = document.getElementById('feedbackModal');
const chatIcon = document.getElementById('chatIcon');
const closeBtn = document.querySelector('.close');
const feedbackForm = document.getElementById('feedbackForm');
const messagesList = document.getElementById('messagesList');
const topAvatar = document.querySelector('.hero .avatar');
const avatarChatBubble = document.getElementById('avatarChatBubble');
let avatarChatTimer;

const avatarFunChats = [
    '🌿 Oops, you found me! Let\'s build something cool today!',
    '✨ Click accepted! Sending you +10 coding luck.',
    '🍃 Ghibli mode on... keep scrolling for surprises!',
    '😄 Hey there! Thanks for visiting my little corner.',
    '🚀 Keep going! Every small step makes a big project.'
];

// Open modal when chat icon is clicked
chatIcon.addEventListener('click', () => {
    modal.classList.add('show');
});

// Close modal when close button is clicked
closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

if (topAvatar && avatarChatBubble) {
    topAvatar.style.cursor = 'pointer';
    topAvatar.addEventListener('click', () => {
        const randomText = avatarFunChats[Math.floor(Math.random() * avatarFunChats.length)];
        avatarChatBubble.textContent = randomText;
        avatarChatBubble.classList.add('show');

        clearTimeout(avatarChatTimer);
        avatarChatTimer = setTimeout(() => {
            avatarChatBubble.classList.remove('show');
        }, 3200);
    });
}

// Handle form submission
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('visitorName').value.trim();
    const message = document.getElementById('visitorMessage').value.trim();
    
    if (name && message) {
        // Get existing messages from localStorage
        let messages = JSON.parse(localStorage.getItem('siteMessages') || '[]');
        
        // Add new message to the beginning
        messages.unshift({
            name: name,
            message: message,
            timestamp: new Date().toLocaleString('vi-VN')
        });
        
        // Keep only the last 30 messages
        if (messages.length > 30) {
            messages = messages.slice(0, 30);
        }
        
        // Save to localStorage
        localStorage.setItem('siteMessages', JSON.stringify(messages));
        
        // Show feedback preview card on hero section
        showFeedbackStack();
        
        // Clear form
        feedbackForm.reset();
        document.getElementById('visitorName').focus();
        
        // Update message display
        displayMessages();
        
        // Optional: Show success feedback
        const submitBtn = feedbackForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✨ Message sent!';
        submitBtn.style.background = 'linear-gradient(90deg, #b8d1a8 0%, #c5dab5 100%)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 2000);
    }
});

// Show feedback stack on hero (scrollable list of all feedback)
function showFeedbackStack() {
    const stackScroll = document.getElementById('feedbackStackScroll');
    const messages = JSON.parse(localStorage.getItem('siteMessages') || '[]');
    
    if (!stackScroll) return;
    
    if (messages.length === 0) {
        stackScroll.innerHTML = '';
        return;
    }
    
    // Clear previous cards
    stackScroll.innerHTML = '';
    
    // Add feedback cards (newest first - already sorted by unshift)
    messages.forEach((msg, index) => {
        const feedbackCard = document.createElement('div');
        feedbackCard.className = 'feedback-card';
        feedbackCard.style.animationDelay = (index * 0.08) + 's';
        
        feedbackCard.innerHTML = `
            <p class="card-name">✨ ${escapeHtml(msg.name)}</p>
            <p class="card-message">"${escapeHtml(msg.message)}"</p>
            <span class="card-time">${msg.timestamp || 'Just now'}</span>
        `;
        
        stackScroll.appendChild(feedbackCard);
    });
    
    // Scroll to top to show newest feedback
    setTimeout(() => {
        stackScroll.scrollTop = 0;
    }, 100);
}

// Display all messages from localStorage
function displayMessages() {
    const messages = JSON.parse(localStorage.getItem('siteMessages') || '[]');
    
    // Update modal messages
    if (messages.length === 0) {
        messagesList.innerHTML = '<div class="empty-messages">No messages yet. Be the first to leave a message! 💬</div>';
    } else {
        messagesList.innerHTML = '';
        messages.forEach((msg, index) => {
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item';
            messageItem.style.animationDelay = (index * 0.05) + 's';
            
            messageItem.innerHTML = `
                <div class="visitor-name">✨ ${escapeHtml(msg.name)}</div>
                <p class="visitor-message">${escapeHtml(msg.message)}</p>
                <small style="color: #a8b896; font-size: 11px;">${msg.timestamp || 'Just now'}</small>
            `;
            
            messagesList.appendChild(messageItem);
        });
    }
    
    // Update main page comments section
    const commentsContainer = document.getElementById('visitorCommentsContainer');
    if (!commentsContainer) return;
    
    if (messages.length === 0) {
        commentsContainer.innerHTML = '<div class="empty-feedback"><p>No messages yet. Click the 💬 icon at the top to leave one! ✨</p></div>';
    } else {
        commentsContainer.innerHTML = '';
        messages.forEach((msg, index) => {
            const commentCard = document.createElement('div');
            commentCard.className = 'visitor-comment-card';
            commentCard.style.animationDelay = (index * 0.1) + 's';
            
            commentCard.innerHTML = `
                <div class="visitor-name">✨ ${escapeHtml(msg.name)}</div>
                <p class="visitor-message">"${escapeHtml(msg.message)}"</p>
                <small class="visitor-time">${msg.timestamp || 'Just now'}</small>
            `;
            
            commentsContainer.appendChild(commentCard);
        });
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load messages when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        displayMessages();
        showFeedbackStack();
    });
} else {
    displayMessages();
    showFeedbackStack();
}
