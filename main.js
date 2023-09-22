document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    var limit = 1000;

    searchInput.addEventListener("keyup", function(event) {
        // Check if the Enter key (key code 13) is pressed
        if (event.key === "Enter") {
            // Trigger a click event on the search button
            searchButton.click();
        }
    });

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value;

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
                    imgElement.classList.add("custom-image");
                    // Append the img element to the container
                    imageContainer.appendChild(imgElement);
                }
            }
            displayImages()
        })
        .catch(function(error) {
            console.error('Error fetching images:', error);
            alert(`There are no results for ${encodeURIComponent(searchTerm)}.`)
        });
    });
});