// 1 Logic For Navbar Toggle
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

// 2 Logic For Theme Toggle
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

// 3 Logic For Chat Toggle
async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const input = inputField.value.trim();
    const responseDiv = document.getElementById('response');
    const chatWindow = document.getElementById('chatWindow');

    if (!input) return;

    const userMsgHtml = `
        <div class="message user-message">
            <div class="bubble">${input}</div>
        </div>`;
    responseDiv.innerHTML += userMsgHtml;

    inputField.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    const loadingId = 'loading-' + Date.now();
    const loadingHtml = `
        <div class="message ai-message" id="${loadingId}">
            <div class="bubble">جاري التفكير في سؤالك ... <i class="bi bi-hourglass-split"></i></div>
        </div>`;
    responseDiv.innerHTML += loadingHtml;

    try {
        const response = await fetch(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer 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',
                    'HTTP-Referer': 'https://www.sitename.com',
                    'X-Title': 'SiteName',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'deepseek/deepseek-r1-0528:free',
                    messages: [{ role: 'user', content: input }],
                }),
            }
        );

        const data = await response.json();
        const markdownText = data.choices?.[0]?.message?.content || 'عذراً، لم أستطع فهم الإجابة. حاول مرة أخرى.';

        document.getElementById(loadingId).remove();
        const aiMsgHtml = `
            <div class="message ai-message">
                <div class="bubble">${marked.parse(markdownText)}</div>
            </div>`;
        responseDiv.innerHTML += aiMsgHtml;

    } catch (error) {
        document.getElementById(loadingId).innerHTML = `<div class="bubble text-danger">حدث خطأ في الاتصال: ${error.message}</div>`;
    }

    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// وظيفة النصائح الجاهزة
function setQuery(text) {
    document.getElementById('userInput').value = text;
    sendMessage();
}