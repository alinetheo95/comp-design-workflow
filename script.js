const container = document.querySelector('.container');
const circles = [];
const lines = [];
const numCircles = 12;

// Create circles in a centered area
for (let i = 0; i < numCircles; i++) {
    const circle = document.createElement('div');
    circle.className = 'circle';
    
    // Define centered area (70% of screen, centered)
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const areaWidth = window.innerWidth * 0.7;
    const areaHeight = window.innerHeight * 0.7;
    
    const x = centerX - areaWidth/2 + Math.random() * areaWidth;
    const y = centerY - areaHeight/2 + Math.random() * areaHeight;
    
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
    
    container.appendChild(circle);
    circles.push({
        element: circle,
        x: x + 30, // Center of circle
        y: y + 30
    });
}

// Function to calculate distance between two points
function distance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// Function to create a line between two circles
function createLine(circle1, circle2) {
    const line = document.createElement('div');
    line.className = 'line';
    
    const dx = circle2.x - circle1.x;
    const dy = circle2.y - circle1.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    line.style.width = length + 'px';
    line.style.left = circle1.x + 'px';
    line.style.top = circle1.y + 'px';
    line.style.transform = `rotate(${angle}deg)`;
    
    container.appendChild(line);
    return line;
}

// Connect circles that are close to each other
const maxDistance = 300;
for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
        const dist = distance(circles[i], circles[j]);
        if (dist < maxDistance) {
            const line = createLine(circles[i], circles[j]);
            lines.push(line);
        }
    }
}

// Add interactive hover effects
circles.forEach(circle => {
    circle.element.addEventListener('mouseenter', () => {
        // Highlight connected lines with vibrant colors
        lines.forEach((line, index) => {
            if (index % 3 === 0) {
                line.style.background = 'linear-gradient(90deg, rgba(255, 99, 71, 0.9), rgba(255, 20, 147, 0.9))';
            } else if (index % 3 === 1) {
                line.style.background = 'linear-gradient(90deg, rgba(218, 24, 132, 0.9), rgba(139, 74, 156, 0.9))';
            } else {
                line.style.background = 'linear-gradient(90deg, rgba(210, 105, 30, 0.9), rgba(106, 76, 147, 0.9))';
            }
            line.style.height = '4px';
        });
    });
    
    circle.element.addEventListener('mouseleave', () => {
        // Reset lines to original colors
        lines.forEach((line, index) => {
            if (index % 2 === 0) {
                line.style.background = 'linear-gradient(90deg, rgba(218, 24, 132, 0.6), rgba(139, 74, 156, 0.6))';
            } else {
                line.style.background = 'linear-gradient(90deg, rgba(210, 105, 30, 0.6), rgba(255, 99, 71, 0.6))';
            }
            line.style.height = '2px';
        });
    });
});

// Animate circles with slight movement
function animateCircles() {
    circles.forEach((circle, index) => {
        const time = Date.now() * 0.001;
        const offsetX = Math.sin(time + index) * 20;
        const offsetY = Math.cos(time + index * 0.5) * 15;
        
        circle.element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();

// Handle window resize
window.addEventListener('resize', () => {
    // Remove existing lines
    lines.forEach(line => line.remove());
    lines.length = 0;
    
    // Recreate connections
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            const dist = distance(circles[i], circles[j]);
            if (dist < maxDistance) {
                const line = createLine(circles[i], circles[j]);
                lines.push(line);
            }
        }
    }
});