const openMenuBtn = document.getElementById("openMenuBtn");
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
