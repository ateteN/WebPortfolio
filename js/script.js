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

// 4. 3D Tilt Effect for Project Cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on cursor position relative to center
        // Sensitivity factor: 15
        const rotateX = (centerY - y) / 30;
        const rotateY = (x - centerX) / 30;
        
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        // Return to flat state with a smooth 0.4s transition
        card.style.transition = 'transform 0.4s ease';
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
        
        // Reset the transition to 0.15s for the next mousemove
        setTimeout(() => {
            card.style.transition = 'transform 0.15s ease';
        }, 400);
    });

    card.addEventListener('mouseenter', () => {
        // Ensure starting transition is snappy
        card.style.transition = 'transform 0.15s ease';
    });
});

// 5. Resume Viewer Toggle
const openResumeBtn = document.getElementById('open-resume');
const closeResumeBtn = document.getElementById('close-resume');
const resumeViewer = document.getElementById('resume-viewer');
const mainWrapper = document.getElementById('main-wrapper');

openResumeBtn.addEventListener('click', () => {
    resumeViewer.style.display = 'flex';
    mainWrapper.style.display = 'none';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

closeResumeBtn.addEventListener('click', () => {
    resumeViewer.style.display = 'none';
    mainWrapper.style.display = 'block';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// 6. Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-links a');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});