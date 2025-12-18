// 1 navbar 
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
// 3 api 
async function loadPosts() {
    const wrapper = document.getElementById('posts-wrapper');

    if (!wrapper) return;

    showSkeletons(wrapper, 3);

    try {
        const response = await fetch('https://api.npoint.io/343f546cc96c1e5c1279');
        if (!response.ok) throw new Error("Network error");

        const posts = await response.json();

        wrapper.innerHTML = '';

        let followedUsers = JSON.parse(localStorage.getItem('followedUsers')) || [];

        posts.forEach(post => {
            const article = document.createElement('article');
            article.setAttribute('data-aos', 'fade-up');

            const isFollowed = followedUsers.includes(post.id);
            const followText = isFollowed ? "أتابع" : "متابعة";
            const followClass = isFollowed ? "followed" : "";

            article.innerHTML = `
                <div class="data-profile">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="profile">
                    <div class="info-profile">
                        <h3>${post.first_name} ${post.last_name}</h3>
                        <time>${post.time_ago}</time>
                    </div>
                    <span></span>
                    <h3 class="follow-btn ${followClass}" data-id="${post.id}">${followText}</h3>
                </div>
                <div class="classi-tag">
                    <p class="article-classi"><i class="bi bi-check-circle-fill"></i> <span>${post.type}</span> </p>
                    ${post.tags.map(tag => `<p class="article-classi"><i class="bi bi-tags-fill"></i> <span>${tag}</span> </p>`).join('')}
                </div>
                <p>${post.content.substring(0, 150)}...</p>
                <span class="line"></span>
                <div class="inter-action">
                    <div class="comments">
                        <i><i class="bi bi-chat-dots-fill"></i></i>
                        <span>${post.comments_count}</span>
                        <p>تعليق</p>
                    </div>
                    <div class="likes">
                        <i><i class="bi bi-heart-fill"></i></i>
                        <span>${post.likes_count}</span>
                        <p>إعجاب</p>
                    </div>
                    <div class="share">
                        <i><i class="bi bi-share-fill"></i></i>
                        <span>${post.shares_count}</span>
                        <p>مشاركة</p>
                    </div>
                </div>
                <button class="show-more" onclick="window.location.href='../comments/index.html?id=${post.id}'">عرض المزيد</button>
            `;

            const followBtn = article.querySelector('.follow-btn');
            followBtn.addEventListener('click', () => toggleFollow(post.id, followBtn));

            wrapper.appendChild(article);
        });

        if (typeof AOS !== 'undefined') AOS.refresh();

    } catch (error) {
        console.error("Error loading posts:", error);
        wrapper.innerHTML = '<p style="text-align:center; padding:20px;">فشل تحميل المنشورات، يرجى المحاولة لاحقاً.</p>';
    }
}

function showSkeletons(container, count) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const skeletonHtml = `
            <div class="skeleton-card">
                <div class="skeleton sk-avatar"></div>
                <div class="skeleton sk-title"></div>
                <div class="skeleton sk-line"></div>
                <div class="skeleton sk-line-short"></div>
                <div class="skeleton sk-btn"></div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', skeletonHtml);
    }
}

document.addEventListener('DOMContentLoaded', loadPosts);
// 4 upload image
const fileInput = document.getElementById('fileInput');
const imageContainer = document.getElementById('imageContainer');
const limitMessage = document.getElementById('limitMessage');

// Initial load from LocalStorage on page startup
document.addEventListener('DOMContentLoaded', () => {
    const savedImages = JSON.parse(localStorage.getItem('userImages')) || [];
    savedImages.forEach(imgData => renderImage(imgData));
    updateWarningVisibility(); 
});

// Handle Multiple Files Upload with strict limit of 10
fileInput.addEventListener('change', function() {
    const files = Array.from(this.files);
    
    files.forEach((file) => {
        // Recalculate count inside the loop to account for newly added images
        const currentImagesCount = document.querySelectorAll('.container-img').length;

        if (currentImagesCount < 10) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Image = e.target.result;
                renderImage(base64Image);
                saveImageToLocal(base64Image);
                updateWarningVisibility(); 
            };
            reader.readAsDataURL(file);
        } else {
            // If limit is reached, trigger warning and skip remaining files
            updateWarningVisibility();
        }
    });

    // Clear input so user can select files again if they delete some
    this.value = ''; 
});

/**
 * Function to manage the visibility and style of the limit message
 */
function updateWarningVisibility() {
    const currentImagesCount = document.querySelectorAll('.container-img').length;
    
    if (currentImagesCount >= 10) {
        limitMessage.style.display = "block"; 
        limitMessage.style.color = "red";
        limitMessage.style.fontWeight = "bold";
    } else {
        limitMessage.style.display = "none"; 
    }
}

/**
 * Function to render the image element in the gallery
 */
function renderImage(imageSrc) {
    const imgDiv = document.createElement('div');
    imgDiv.className = 'container-img';
    
    imgDiv.innerHTML = `
        <button class="remove-btn"><i class="bi bi-x-lg"></i></button>
        <img src="${imageSrc}" alt="Uploaded Photo">
    `;
    
    // Remove functionality
    imgDiv.querySelector('.remove-btn').addEventListener('click', function() {
        imgDiv.remove();
        deleteImageFromLocal(imageSrc);
        updateWarningVisibility(); // Hide warning if count drops below 10
    });
    
    imageContainer.appendChild(imgDiv);
}

/**
 * LocalStorage Helpers: Save and Delete
 */
function saveImageToLocal(base64Data) {
    let images = JSON.parse(localStorage.getItem('userImages')) || [];
    images.push(base64Data);
    localStorage.setItem('userImages', JSON.stringify(images));
}

function deleteImageFromLocal(imageSrc) {
    let images = JSON.parse(localStorage.getItem('userImages')) || [];
    images = images.filter(img => img !== imageSrc);
    localStorage.setItem('userImages', JSON.stringify(images));
}