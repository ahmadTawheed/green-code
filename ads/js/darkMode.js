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