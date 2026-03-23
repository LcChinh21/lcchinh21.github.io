// Falling Leaves Animation - Forest Vibe (Simplified Version)
const leafEmojis = ['🍃', '🍂', '🌿', '🍁'];

function createFallingLeaves() {
    const container = document.getElementById('fallingLeavesContainer');
    
    if (!container) {
        console.log('Container not found!');
        return;
    }
    
    // Create multiple leaves
    const leafCount = window.innerWidth > 768 ? 20 : 15;
    
    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        
        // Random emoji
        const emoji = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        leaf.textContent = emoji;
        
        // Random position
        const randomLeft = Math.random() * 100;
        leaf.style.left = randomLeft + '%';
        leaf.style.top = (Math.random() * -100) + 'px';
        
        // Random animation duration
        const duration = 5 + Math.random() * 5;
        leaf.style.animationDuration = duration + 's';
        
        // Random animation delay
        const delay = Math.random() * 3;
        leaf.style.animationDelay = delay + 's';
        
        // Random opacity
        leaf.style.opacity = 0.5 + Math.random() * 0.3;
        
        container.appendChild(leaf);
        console.log('Created leaf ' + (i + 1) + ' of ' + leafCount);
    }
    
    console.log('✅ Created ' + leafCount + ' leaves!');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createFallingLeaves);
} else {
    createFallingLeaves();
}

console.log('🍃 Leaves script loaded!');

