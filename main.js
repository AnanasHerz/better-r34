document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const imageContainer = document.getElementById("imageContainer");
    var limit = 1000;

    // Function to get the 'search' query parameter from the URL
    function getQueryParameter() {
        const params = new URLSearchParams(window.location.search);
        return params.get("search");
    }

    // Function to fetch API data based on the search term
    function fetchApiData(searchTerm) {
        // Construct the API URL with the query parameter
        const apiUrl = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=${limit}&tags=${encodeURIComponent(searchTerm)}`;

        fetch(apiUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                // Clear previous images
                imageContainer.innerHTML = "";
                // Loop through the data and create img elements
                for (var i = 0; i < data.length; i++) {
                    ext = data[i].file_url.split(".")[3];
                    valid_ext = ["png", "jpg", "jpeg", "gif"]
                    if (valid_ext.includes(ext)) {
                        var imgElement = document.createElement("img");
                        imgElement.src = data[i].file_url;
                        imgElement.loading = "lazy";
                        imgElement.classList.add("custom-image");
                        // Append the img element to the container
                        imageContainer.appendChild(imgElement);   
                    }
                }
            })
            .catch(function(error) {
                console.error("Error fetching images:", error);
                alert(`There are no results for ${encodeURIComponent(searchTerm)}.`);
            });
    }

    // Function to handle URL changes
    function handleUrlChange() {
        const searchTerm = getQueryParameter();
        if (searchTerm) {
            // Update the search input value
            searchInput.value = decodeURIComponent(searchTerm);
            // Fetch API data based on the search term
            fetchApiData(searchTerm);
        }
    }

    // Call the function to handle initial URL state
    handleUrlChange();

    // Listen for URL changes (e.g., when users manually modify the URL)
    window.addEventListener("popstate", handleUrlChange);

    searchInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            // Update the URL with the new query parameter
            history.pushState({}, "", `?search=${encodeURIComponent(searchInput.value)}`);
            // Fetch API data based on the new search term
            fetchApiData(searchInput.value);
        }
    });

    searchButton.addEventListener("click", () => {
        // Update the URL with the new query parameter
        history.pushState({}, "", `?search=${encodeURIComponent(searchInput.value)}`);
        // Fetch API data based on the new search term
        fetchApiData(searchInput.value);
    });
});
