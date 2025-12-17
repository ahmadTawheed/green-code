function setupInteraction(buttonSelector, countSelector, storageKeyPrefix, activeColor) {
    const buttons = document.querySelectorAll(buttonSelector);

    buttons.forEach(btn => {
        const id = btn.getAttribute('data-id');
        // Targeted selection based on the provided count class
        const countSpan = btn.querySelector(countSelector); 
        const allContents = btn.querySelectorAll('span, i');
        
        let isLiked = localStorage.getItem(`${storageKeyPrefix}_${id}`) === 'true';

        // 1. Initial Load Style
        if (isLiked) {
            applyActiveStyles(btn, allContents, activeColor);
        }

        // 2. Click Event
        btn.addEventListener('click', function () {
            if (!countSpan) return; // Guard clause if span is missing

            let count = parseInt(countSpan.innerText);

            if (!isLiked) {
                countSpan.innerText = count + 1;
                applyActiveStyles(this, allContents, activeColor);
                isLiked = true;
                localStorage.setItem(`${storageKeyPrefix}_${id}`, 'true');
            } else {
                countSpan.innerText = count - 1;
                applyDefaultStyles(this, allContents);
                isLiked = false;
                localStorage.setItem(`${storageKeyPrefix}_${id}`, 'false');
            }
        });
    });
}

function applyActiveStyles(btn, allContents, color) {
    btn.style.backgroundColor = color;
    btn.style.borderColor = color;
    allContents.forEach(el => el.style.color = "#ffffff");
}

function applyDefaultStyles(btn, allContents) {
    btn.style.backgroundColor = "transparent";
    btn.style.borderColor = "var(--border-active-color)";
    allContents.forEach(el => el.style.color = "var(--border-active-color)");
}

// --- Initialize for both types ---
// For Like Button:
setupInteraction('.like-btn', '.like-count', 'like', '#059669');

// For Vote Button:
setupInteraction('.like-btn-vote', '.like-count-vote', 'vote', '#28a745');