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