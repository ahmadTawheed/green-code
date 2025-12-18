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