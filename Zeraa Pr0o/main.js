document.addEventListener("DOMContentLoaded", () => {
    // [1] Catch Elements
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeToggleBtnPhone = document.getElementById('themeToggle-phone');

    // [2] Dark Mode Logic
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark');
            if(themeToggleBtn) themeToggleBtn.innerHTML = '<i class="bi bi-brightness-low-fill"></i>';
            if(themeToggleBtnPhone) themeToggleBtnPhone.innerHTML = '<i class="bi bi-brightness-low-fill"></i>';
        } else {
            document.body.classList.remove('dark');
            if(themeToggleBtn) themeToggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i>';
            if(themeToggleBtnPhone) themeToggleBtnPhone.innerHTML = '<i class="bi bi-moon-fill"></i>';
        }
    }

    applyTheme(currentTheme);

    const toggleFunction = () => {
        document.body.classList.toggle('dark');
        const isDarkMode = document.body.classList.contains('dark');
        applyTheme(isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    };

    if(themeToggleBtn) themeToggleBtn.addEventListener('click', toggleFunction);
    if(themeToggleBtnPhone) themeToggleBtnPhone.addEventListener('click', toggleFunction);
});

// 2

const API_URL = "https://api.npoint.io/f00c01415495aba4c385";
let allPosts = [];
let activeSorts = []; 

const postsContainer = document.getElementById('postsContainer');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const sortButtons = document.querySelectorAll('.sort-btn');

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allPosts = data.community_posts;
    } catch (error) {
        console.error("Error loading API:", error);
    }
}

function renderSkeleton() {
    postsContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        postsContainer.innerHTML += `
            <div class="box2">
                <div class="skeleton" style="width: 40%"></div>
                <div class="skeleton" style="width: 90%"></div>
                <div class="skeleton" style="width: 70%"></div>
                <div class="icons">
                    <div class="skeleton" style="width: 60px"></div>
                    <div class="skeleton" style="width: 60px"></div>
                </div>
            </div>
        `;
    }
}

function renderPosts() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedType = typeFilter.value;

    if (query === "") {
        postsContainer.innerHTML = '<p class="empty-msg">ابدأ الكتابة في شريط البحث لعرض النتائج...</p>';
        return;
    }

    let filtered = allPosts.filter(post => {
        const matchesSearch = post.content.toLowerCase().includes(query) || post.user_name.toLowerCase().includes(query);
        const matchesType = (selectedType === 'all') || (post.post_type === selectedType);
        return matchesSearch && matchesType;
    });

    if (activeSorts.length > 0) {
        filtered.sort((a, b) => {
            for (let sortType of activeSorts) {
                if (sortType === 'newest') {
                    if (b.id !== a.id) return b.id - a.id;
                } else if (sortType === 'votes') {
                    if (b.votes_count !== a.votes_count) return b.votes_count - a.votes_count;
                } else if (sortType === 'comments') {
                    if (b.solutions_count !== a.solutions_count) return b.solutions_count - a.solutions_count;
                }
            }
            return 0;
        });
    }

    if (filtered.length === 0) {
        postsContainer.innerHTML = '<p class="empty-msg">لا توجد نتائج تطابق بحثك</p>';
        return;
    }

    postsContainer.innerHTML = filtered.map(post => `
        <div class="box2">
            <h3 style="color: var(--text-primary-color); margin-bottom: 10px;">${post.tag}</h3>
            <p>${post.content}</p>
            <div class="icons">
                <div class="ic"><i class="fa-solid fa-user"></i><span>${post.user_name}</span></div>
                <div class="ic"><i class="fa-solid fa-clock"></i><span>${post.timestamp}</span></div>
                <div class="ic"><i class="fa-solid fa-comment"></i><span>${post.solutions_count} حلول</span></div>
                <div class="ic"><i class="fa-solid fa-circle-check"></i><span>${post.votes_count} تصويت</span></div>
            </div>
            <div style="margin-top: 15px; font-weight: bold; font-size: 0.8rem; opacity: 0.7;">نوع: ${post.post_type}</div>
        </div>
    `).join('');
}

searchInput.addEventListener('input', () => {
    renderSkeleton();
    setTimeout(renderPosts, 400); 
});

typeFilter.addEventListener('change', renderPosts);

sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const sortMode = btn.dataset.sort;

        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
            activeSorts = activeSorts.filter(s => s !== sortMode);
        } else {
            btn.classList.add('active');
            activeSorts.push(sortMode);
        }
        
        renderPosts();
    });
});

fetchData();

