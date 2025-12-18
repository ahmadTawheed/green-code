// 1 navbar 
//  Controle =>  (Side Menu)
const openMenuBtn = document.getElementById('openMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
// function to open menu
function openMenu() {
    sideMenu.classList.add('open');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
// function to close menu
function closeMenu() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}
openMenuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);
const sideMenuLinks = document.querySelectorAll('.side-menu-nav a');
sideMenuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// 2 dark mode 
document.addEventListener("DOMContentLoaded", () => {
    // [1] Catch Element to Access it
    const themeToggleBtn = document.getElementById('themeToggle');
    // [2] Dark Mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark');
        themeToggleBtn.innerHTML = '<i class="bi bi-brightness-low-fill"></i>';
    }
    themeToggleBtn.addEventListener('click', () => {
        // toggle => if find remove it , if unfind add it
        document.body.classList.toggle('dark');
        const isDarkMode = document.body.classList.contains('dark');
        themeToggleBtn.innerHTML = isDarkMode ? '<i class="bi bi-brightness-low-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
});
// Phone 
document.addEventListener("DOMContentLoaded", () => {
    // [1] Catch Element to Access it
    const themeToggleBtnPhone = document.getElementById('themeToggle-phone');
    // [2] Dark Mode
    const currentThemePhone = localStorage.getItem('theme') || 'light';
    if (currentThemePhone === 'dark') {
        document.body.classList.add('dark');
        themeToggleBtnPhone.innerHTML = '<i class="bi bi-brightness-low-fill"></i>';
    }
    themeToggleBtnPhone.addEventListener('click', () => {
        // toggle => if find remove it , if unfind add it
        document.body.classList.toggle('dark');
        const isDarkModePhone = document.body.classList.contains('dark');
        themeToggleBtnPhone.innerHTML = isDarkModePhone ? '<i class="bi bi-brightness-low-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
        localStorage.setItem('theme', isDarkModePhone ? 'dark' : 'light');
    });
});
// 3 email js
function sendMail() {
    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    }
    emailjs.send("service_do953jm", "template_4oj2koc", params).then(alert("تم الإرسال بنجاح!"));
}