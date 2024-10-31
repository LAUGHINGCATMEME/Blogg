const categories = ['butterflies', 'nature', 'astrophotography'];

function loadImages() {
  const galleryContainer = document.getElementById('gallery-container');

  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryDiv.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
    categoryDiv.setAttribute('id', category);

    fetch(`gallery/${category}/`)
      .then(response => response.text())
      .then(data => {
        // Regex to find image files
        const imageFiles = data.match(/href="([^"]*\.(jpg|jpeg|png|heic))"/gi) || [];
        
        imageFiles.forEach(img => {
          const imgPath = img.match(/"([^"]*)"/)[1];
          
          // Use the compressed image path for display
          const compressedPath = `gallery/${category}/${imgPath}`;
          const fullImagePath = `gallery/${category}/${imgPath}`;

          // Create img element for compressed image
          const imgElement = document.createElement('img');
          imgElement.src = compressedPath;
          imgElement.alt = `${category} image`;

          // Set click event to open full-size image
          imgElement.addEventListener('click', () => {
            window.open(fullImagePath, '_blank');
          });

          categoryDiv.appendChild(imgElement);
        });
      })
      .catch(error => console.error(`Error loading ${category} images`, error));

    galleryContainer.appendChild(categoryDiv);
  });
}

document.addEventListener('DOMContentLoaded', loadImages);
