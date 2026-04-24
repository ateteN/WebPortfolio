const cursor = document.querySelector('.cursor');
const magneticTarget = document.querySelector('.magnetic-target');

// 1. Smooth Cursor Follower
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// // 2. Evasive "Avoidance" Effect
// magneticTarget.addEventListener('mousemove', (e) => {
//     const rect = magneticTarget.getBoundingClientRect();
    
//     // Calculate distance from center of text to mouse
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
    
//     const x = e.clientX - centerX;
//     const y = e.clientY - centerY;
    
//     // REPEL: Multiply by a negative strength (e.g., -0.5)
//     // The higher the number, the further it "runs away"
//     const strength = -0.5; 
    
//     magneticTarget.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
// });

// 3. Hover Expansion for interactive items
const interactives = document.querySelectorAll('a, button, .project-card, .magnetic-target');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});
const blobs = document.querySelectorAll('.glass-shape');

document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    
    blobs.forEach((blob, index) => {
        // Higher divisor = slower, more subtle movement
        // We use index to make them move at slightly different speeds
        const ratio = (index + 1) * 30; 
        
        const x = clientX / ratio;
        const y = clientY / ratio;
        
        // This layers on top of the CSS animation
        blob.style.translate = `${x}px ${y}px`;
    });
});