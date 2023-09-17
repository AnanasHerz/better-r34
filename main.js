document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const img = document.querySelector("img");
    var limit = 1000;
    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value;
    
        // Replace this URL with your API endpoint
        const apiUrl = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=${limit}&tags=${encodeURIComponent(searchTerm)}`;
    
        fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            function displayImages() {
                var imageContainer = document.getElementById("imageContainer");
              
                imageContainer.innerHTML = "";
                // Loop through the data and create img elements
                for (var i = 0; i < data.length; i++) {
                  var imgElement = document.createElement("img");
                  imgElement.src = data[i].file_url;
                  imgElement.alt = "Image " + (i + 1); // Optional: Set alt text
              
                  imgElement.classList.add("custom-image");
                  // Append the img element to the container
                  imageContainer.appendChild(imgElement);
                }
              }
              
              // Call the displayImages function to display the images
              displayImages()
        })
        .catch(function(error) {
            console.error('Error fetching images:', error);
        });
    });
});