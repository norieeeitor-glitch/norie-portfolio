/* =========================================================
   NORIE ANNE PORTFOLIO JAVASCRIPT
   ========================================================= */

/* ================= MOBILE MENU ================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

mobileMenuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");
    mobileMenuButton.classList.toggle("active");

});


/* Close mobile menu after clicking a link */

document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");
            mobileMenuButton.classList.remove("active");

        });

    });


/* ================= NAV ACTIVE STATE ================= */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-pill");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* ================= DOT FIELD BACKGROUND ================= */

const canvas =
    document.getElementById("dotCanvas");

const ctx =
    canvas.getContext("2d");

let dots = [];

let mouse = {
    x: -1000,
    y: -1000
};


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    createDots();

}


function createDots() {

    dots = [];

    const spacing = 28;

    for (
        let x = 0;
        x < canvas.width;
        x += spacing
    ) {

        for (
            let y = 0;
            y < canvas.height;
            y += spacing
        ) {

            dots.push({

                x: x,
                y: y,

                baseX: x,
                baseY: y,

                phase:
                    Math.random() *
                    Math.PI * 2

            });

        }

    }

}


function drawDots(time) {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    dots.forEach(dot => {

        const distanceX =
            mouse.x - dot.baseX;

        const distanceY =
            mouse.y - dot.baseY;

        const distance =
            Math.sqrt(
                distanceX * distanceX +
                distanceY * distanceY
            );

        const interaction =
            Math.max(
                0,
                1 - distance / 220
            );

        dot.x =
            dot.baseX +
            Math.cos(
                time * 0.0015 +
                dot.phase
            ) * 3 +
            distanceX *
            interaction *
            0.04;

        dot.y =
            dot.baseY +
            Math.sin(
                time * 0.0015 +
                dot.phase
            ) * 3 +
            distanceY *
            interaction *
            0.04;

        const radius =
            1.2 +
            interaction * 2;

        ctx.beginPath();

        ctx.arc(
            dot.x,
            dot.y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(198, 181, 150, ${
                0.15 +
                interaction * 0.55
            })`;

        ctx.fill();

    });

    requestAnimationFrame(drawDots);

}


window.addEventListener(
    "resize",
    resizeCanvas
);


window.addEventListener(
    "mousemove",
    event => {

        mouse.x =
            event.clientX;

        mouse.y =
            event.clientY;

    }
);


window.addEventListener(
    "mouseleave",
    () => {

        mouse.x = -1000;
        mouse.y = -1000;

    }
);


resizeCanvas();

requestAnimationFrame(drawDots);


/* ================= SMOOTH SCROLL ================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (event) {

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });