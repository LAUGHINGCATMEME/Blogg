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
        const imageFiles = data.match(/href="([^"]*\.(jpg|jpeg|png))"/g) || [];
        imageFiles.forEach(img => {
          const imgPath = img.match(/"([^"]*)"/)[1];
          const imgElement = document.createElement('img');
          imgElement.src = `gallery/${category}/${imgPath}`;
          imgElement.alt = `${category} image`;
          categoryDiv.appendChild(imgElement);
        });
      })
      .catch(error => console.error(`Error loading ${category} images`, error));

    galleryContainer.appendChild(categoryDiv);
  });
}

document.addEventListener('DOMContentLoaded', loadImages);
