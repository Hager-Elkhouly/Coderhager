document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
});

function setupMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger-icon');
    const close = document.getElementById('close-icon');
    const links = document.querySelectorAll('.mobile-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains('menu-open');
        if (isOpen) {
            menu.classList.remove('menu-open');
            hamburger.classList.remove('hidden');
            close.classList.add('hidden');
        } else {
            menu.classList.add('menu-open');
            hamburger.classList.add('hidden');
            close.classList.remove('hidden');
        }
    });

    links.forEach(l => l.addEventListener('click', () => {
        menu.classList.remove('menu-open');
        hamburger.classList.remove('hidden');
        close.classList.add('hidden');
    }));
}

let fallbackTimeout = null;
let feedbackTimeout = null;

function handleEmailClick() {
    const fallback = document.getElementById('email-fallback-text');
    if (!fallback) return;
    if (fallbackTimeout) clearTimeout(fallbackTimeout);

    fallback.classList.remove('opacity-0', 'h-0');
    fallback.classList.add('opacity-100', 'h-3', 'mt-0.5');

    fallbackTimeout = setTimeout(() => {
        fallback.classList.remove('opacity-100', 'h-3', 'mt-0.5');
        fallback.classList.add('opacity-0', 'h-0');
    }, 4000);
}

function copyEmailToClipboard(btn) {
    if (!btn) return;
    const email = "hager.elkhouly00@gmail.com";
    const toast = btn.querySelector('.toast-msg');
    const label = btn.querySelector('.copy-btn-text');

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email)
            .then(() => showFeedback(toast, label))
            .catch(() => fallbackCopy(email, toast, label));
    } else {
        fallbackCopy(email, toast, label);
    }
}

function fallbackCopy(text, toast, label) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
        document.execCommand('copy');
        showFeedback(toast, label);
    } catch (e) {
        console.error(e);
    }
    document.body.removeChild(ta);
}

function showFeedback(toast, label) {
    if (!toast || !label) return;
    if (feedbackTimeout) clearTimeout(feedbackTimeout);

    toast.classList.remove('opacity-0', '-top-10');
    toast.classList.add('opacity-100', '-top-12');
    label.textContent = "Copied!";

    feedbackTimeout = setTimeout(() => {
        toast.classList.remove('opacity-100', '-top-12');
        toast.classList.add('opacity-0', '-top-10');
        label.textContent = "Copy Email";
    }, 2000);
}