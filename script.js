// =========================
// PORTFÓLIO V2 — HITALO
// =========================

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// =========================
// ANO AUTOMÁTICO
// =========================
const yearElement = document.querySelector("#current-year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// =========================
// HEADER + MENU MOBILE
// =========================
const header = document.querySelector("#site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 30);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        document.body.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            document.body.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        });
    });
}

// =========================
// SCROLL SUAVE
// =========================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start"
        });
    });
});

// =========================
// REVEAL DAS SEÇÕES
// =========================
const revealElements = document.querySelectorAll("[data-reveal]");
revealElements.forEach((element) => {
    const delay = element.dataset.delay || "0";
    element.style.setProperty("--delay", `${delay}ms`);
});

if (prefersReducedMotion) {
    revealElements.forEach((element) => element.classList.add("visible"));
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
}

// =========================
// NAV ATIVA POR SEÇÃO
// =========================
const sectionLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
const sections = Array.from(document.querySelectorAll("main section[id]"));

const navSectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const currentId = `#${entry.target.id}`;
            sectionLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === currentId);
            });
        });
    },
    { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => navSectionObserver.observe(section));

// =========================
// PAUSA DO MARQUEE
// =========================
const marquee = document.querySelector(".marquee-track");
if (marquee) {
    marquee.addEventListener("mouseenter", () => {
        marquee.style.animationPlayState = "paused";
    });
    marquee.addEventListener("mouseleave", () => {
        marquee.style.animationPlayState = "running";
    });
}

// =========================
// GLOW DOS CARDS
// =========================
if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-project-glow]").forEach((card) => {
        card.addEventListener("pointermove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty("--mx", `${x}%`);
            card.style.setProperty("--my", `${y}%`);
        });
    });
}

// =========================
// COPIAR E-MAIL
// =========================
const copyEmailButton = document.querySelector(".copy-email");
const toast = document.querySelector(".toast");
let toastTimeout;

const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 2200);
};

if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async () => {
        const email = copyEmailButton.dataset.email;
        if (!email) return;

        try {
            await navigator.clipboard.writeText(email);
            showToast("E-mail copiado.");
        } catch {
            showToast("Não foi possível copiar automaticamente.");
        }
    });
}

// =========================
// VOLTAR AO TOPO
// =========================
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    const updateBackToTop = () => {
        backToTop.classList.toggle("visible", window.scrollY > 700);
    };

    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    });
}

// =========================
// CONSOLE
// =========================
console.log(
    "%cHitalo.%c Portfolio V2 carregado.",
    "color: #8faf9a; font-weight: 800;",
    "color: #9aa59e;"
);
