// 1 - navbar 
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
// 2 - dark mode 
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
// 3 - artilce 
const followButtons = document.querySelectorAll('.follow');

// Colors configuration
const colorFollow = "#059669";
const colorFollowing = "#12bc2c"; // Adjusted from your hex for compatibility

// 1. Initial Load from LocalStorage
followButtons.forEach(button => {
    const buttonId = button.getAttribute('data-id');
    const savedState = localStorage.getItem(buttonId);

    if (savedState === 'following') {
        button.innerText = "أتابع";
        button.style.color = colorFollowing;
    } else {
        button.innerText = "متابعة";
        button.style.color = colorFollow;
    }
});

// 2. Click Event Listener
followButtons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonId = this.getAttribute('data-id');

        if (this.innerText === "متابعة") {
            // Change to "Following" state
            this.innerText = "أتابع";
            this.style.color = colorFollowing;
            localStorage.setItem(buttonId, 'following');
        } else {
            // Change back to "Follow" state
            this.innerText = "متابعة";
            this.style.color = colorFollow;
            localStorage.setItem(buttonId, 'not_following'); 
        }
    });
});
// 4 - api 
let allPostComments = [];
let displayedCommentsCount = 0;
const commentsPerPage = 5;

async function loadDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (!postId) return;

    setSkeletons();
    renderCommentSkeletons();

    try {
        const [postsRes, commsRes] = await Promise.all([
            fetch('https://api.npoint.io/343f546cc96c1e5c1279'),
            fetch('https://api.npoint.io/7c4ae67fd9871e4cd8c8')
        ]);

        const posts = await postsRes.json();
        const allComments = await commsRes.json();

        await new Promise(resolve => setTimeout(resolve, 1000));

        const post = posts.find(p => p.id == postId);
        allPostComments = allComments.filter(c => c.post_id == postId);

        if (post) {
            removeSkeletons();

            document.querySelector('.name-time h3').textContent = `${post.first_name} ${post.last_name}`;
            document.querySelector('.name-time time').textContent = post.time_ago;
            document.querySelector('#DetailsPost > p').textContent = post.content;
            document.querySelector('.like-count').textContent = post.likes_count;
            document.querySelector('.title-comment span').textContent = allPostComments.length;

            const swiperWrapper = document.querySelector('.swiper-wrapper');
            if (post.image_paths && post.image_paths.length > 0) {
                swiperWrapper.innerHTML = post.image_paths.map(img => `
                    <div class="swiper-slide"><img src="../posts/${img}" alt="post image"></div>
                `).join('');
                if (typeof swiper !== 'undefined') swiper.update();
            }

            document.querySelectorAll('.skeleton-comment-wrapper').forEach(el => el.remove());
            document.querySelectorAll('.dtls-comments').forEach(el => {
                if (!el.classList.contains('add-comment')) el.remove();
            });

            displayedCommentsCount = 0;
            renderCommentsSlice();
        }
    } catch (error) {
        console.error("حدث خطأ في جلب البيانات:", error);
    }
}

function renderCommentsSlice() {
    const container = document.getElementById('AddComment');
    const showMoreBtn = document.querySelector('.comnt-show-more');

    const nextSlice = allPostComments.slice(displayedCommentsCount, displayedCommentsCount + commentsPerPage);

    const maxVote = allPostComments.length > 0 ? Math.max(...allPostComments.map(c => c.best_answer_votes || 0)) : 0;

    nextSlice.forEach(comment => {
        const commentHTML = `
        <div class="dtls-comments" data-aos="fade-left">
            <div class="dtls-comment">
                <div class="dtls-comnt-profile">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="profile">
                    <h3>مشارك</h3>
                    <span></span>
                    <h3 class="follow" data-id="user-${comment.id}">متابعة</h3>
                </div>
                <time>منذ فترة</time>
            </div>
            <p>${comment.content}</p>
            <div class="dtls-interactive-comment">
                <button class="like-btn" data-id="${comment.id}">
                    <i class="bi bi-heart-fill"></i><span class="like-count">${comment.likes_count}</span>
                </button>
                <button class="like-btn-vote" data-id="${comment.id}">
                    <i class="bi bi-check-circle-fill"></i><span>تم التجربة ونجح</span> 
                    <span class="like-count-vote">${comment.best_answer_votes}</span>
                </button>
            </div>
            ${comment.best_answer_votes === maxVote && maxVote > 0 ? '<button class="best-comment">أفضل إجابة</button>' : ''}
        </div>`;

        container.insertAdjacentHTML('beforebegin', commentHTML);
    });

    displayedCommentsCount += nextSlice.length;

    if (showMoreBtn) {
        container.before(showMoreBtn);

        if (displayedCommentsCount >= allPostComments.length) {
            showMoreBtn.style.display = 'none';
        } else {
            showMoreBtn.style.display = 'block';
        }
    }

    initInteractions();
    if (window.AOS) AOS.refresh();
}

function renderCommentSkeletons() {
    const container = document.getElementById('AddComment');
    let skeletons = '';
    for (let i = 0; i < 3; i++) {
        skeletons += `
        <div class="dtls-comments skeleton-comment-wrapper" style="border:none">
            <div class="skeleton-comment skeleton"></div>
        </div>`;
    }
    container.insertAdjacentHTML('beforebegin', skeletons);
}

function initInteractions() {
    document.querySelectorAll('.follow').forEach(btn => {
        btn.onclick = function () {
            this.classList.toggle('following');
            this.innerText = this.classList.contains('following') ? 'أتابع' : 'متابعة';
        };
    });

    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.onclick = function () {
            this.classList.toggle('active');
            let count = this.querySelector('.like-count');
            let val = parseInt(count.innerText);
            count.innerText = this.classList.contains('active') ? val + 1 : val - 1;
        };
    });

    document.querySelectorAll('.like-btn-vote').forEach(btn => {
        btn.onclick = function () {
            this.classList.toggle('active');
            let count = this.querySelector('.like-count-vote');
            let val = parseInt(count.innerText);
            count.innerText = this.classList.contains('active') ? val + 1 : val - 1;
        };
    });
}

function setSkeletons() {
    document.querySelector('.name-time h3').classList.add('skeleton', 'skeleton-title');
    document.querySelector('.name-time time').classList.add('skeleton', 'skeleton-text');
    document.querySelector('#DetailsPost > p').classList.add('skeleton', 'skeleton-text');
}

function removeSkeletons() {
    document.querySelector('.name-time h3').classList.remove('skeleton', 'skeleton-title');
    document.querySelector('.name-time time').classList.remove('skeleton', 'skeleton-text');
    document.querySelector('#DetailsPost > p').classList.remove('skeleton', 'skeleton-text');
}

document.addEventListener('DOMContentLoaded', () => {
    loadDetails();

    const showMoreBtn = document.querySelector('.comnt-show-more');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', renderCommentsSlice);
    }
});