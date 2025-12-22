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