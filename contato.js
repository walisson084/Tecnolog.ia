const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
let shootingStar = null;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = "#00ff99";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class ShootingStar {
    constructor() {
        this.x = -100;
        this.y = Math.random() * (canvas.height / 2);
        this.length = 150;
        this.speed = 8;
        this.opacity = 1;
    }

    update() {
        this.x += this.speed;
        this.y += this.speed * 0.5;
        this.opacity -= 0.01;
    }

    draw() {
        ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length, this.y - this.length * 0.5);
        ctx.stroke();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    if (shootingStar) {
        shootingStar.update();
        shootingStar.draw();
        if (shootingStar.opacity <= 0) {
            shootingStar = null;
        }
    }

    requestAnimationFrame(animate);
}

initParticles();
animate();

window.addEventListener("load", () => {
    setTimeout(() => {
        shootingStar = new ShootingStar();
    }, 800);
});
