/* =========================================================
   NORIE ANNE PORTFOLIO JAVASCRIPT
   ========================================================= */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("mainNav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

    const lines = menuBtn.querySelectorAll("span");

    if (nav.classList.contains("active")) {

        lines[0].style.transform =
            "rotate(45deg) translate(3px, 3px)";

        lines[1].style.transform =
            "rotate(-45deg) translate(3px, -3px)";

    } else {

        lines[0].style.transform =
            "rotate(0)";

        lines[1].style.transform =
            "rotate(0)";
    }

});


/* Close mobile menu after clicking */

document.querySelectorAll(".nav-button").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        const lines =
            menuBtn.querySelectorAll("span");

        lines[0].style.transform = "rotate(0)";
        lines[1].style.transform = "rotate(0)";

    });

});



/* ================= NAV ACTIVE STATE ================= */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-button");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        if (
            window.scrollY >= sectionTop
        ) {
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



/* ================= DOT FIELD ================= */

const canvas =
    document.getElementById("dotCanvas");

const ctx =
    canvas.getContext("2d");

let dots = [];

let mouse = {
    x: -1000,
    y: -1000
};

let width;
let height;

let dpr =
    Math.min(window.devicePixelRatio || 1, 2);



/* Resize canvas */

function resizeCanvas() {

    width =
        window.innerWidth;

    height =
        window.innerHeight;

    dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    canvas.width =
        width * dpr;

    canvas.height =
        height * dpr;

    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    createDots();
}



/* Create dots */

function createDots() {

    dots = [];

    const spacing =
        window.innerWidth < 600
            ? 22
            : 18;

    const radius =
        window.innerWidth < 600
            ? 1
            : 1.4;


    for (
        let y = spacing / 2;
        y < height;
        y += spacing
    ) {

        for (
            let x = spacing / 2;
            x < width;
            x += spacing
        ) {

            dots.push({

                x: x,
                y: y,

                baseX: x,
                baseY: y,

                radius: radius,

                phase:
                    Math.random() *
                    Math.PI *
                    2

            });

        }

    }

}



/* Mouse */

window.addEventListener(
    "mousemove",
    event => {

        mouse.x =
            event.clientX;

        mouse.y =
            event.clientY;

    },
    { passive: true }
);


/* Reset mouse */

window.addEventListener(
    "mouseleave",
    () => {

        mouse.x = -1000;
        mouse.y = -1000;

    }
);



/* Draw */

function drawDots(time) {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            width,
            height
        );


    gradient.addColorStop(
        0,
        "rgba(215, 204, 177, 0.32)"
    );

    gradient.addColorStop(
        0.45,
        "rgba(154, 120, 97, 0.28)"
    );

    gradient.addColorStop(
        1,
        "rgba(28, 45, 67, 0.35)"
    );


    ctx.fillStyle =
        gradient;


    dots.forEach(dot => {

        const dx =
            mouse.x - dot.baseX;

        const dy =
            mouse.y - dot.baseY;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        const interactionRadius =
            180;


        let pushX = 0;
        let pushY = 0;


        if (
            distance <
            interactionRadius
        ) {

            const force =
                1 -
                distance /
                interactionRadius;

            pushX =
                -dx *
                force *
                0.35;

            pushY =
                -dy *
                force *
                0.35;

        }


        /* Waving movement */

        const wave =
            Math.sin(
                time * 0.0015 +
                dot.baseX * 0.015 +
                dot.baseY * 0.01 +
                dot.phase
            );


        dot.x +=
            (
                dot.baseX +
                pushX -
                dot.x
            ) * 0.08;


        dot.y +=
            (
                dot.baseY +
                pushY +
                wave * 2.5 -
                dot.y
            ) * 0.08;


        let currentRadius =
            dot.radius;


        /* Glow near cursor */

        if (
            distance <
            interactionRadius
        ) {

            const glow =
                1 -
                distance /
                interactionRadius;

            currentRadius +=
                glow * 2.5;
        }


        ctx.beginPath();

        ctx.arc(
            dot.x,
            dot.y,
            currentRadius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });


    requestAnimationFrame(drawDots);

}


/* Start */

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

requestAnimationFrame(drawDots);