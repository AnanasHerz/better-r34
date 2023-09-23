document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const imageContainer = document.getElementById("imageContainer");
    const pageContainer = document.getElementById("readContainer");
    var checkbox = document.getElementById("demoCheckbox");
    var limit = 1000;
    let imageIndex = 0;
    let postarray = [];
    let idarray = [];

    // Function to get the 'search' query parameter from the URL
    function getQueryParameter() {
        const params = new URLSearchParams(window.location.search);
        return params.get("search");
    }

    // Function to fetch API data based on the search term
    function fetchApiData(searchTerm) {
        // Construct the API URL with the query parameter
        const apiUrl = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=${limit}&tags=${encodeURIComponent(searchTerm)}`;
        function displayPageImage(index) {
            if (index >= 0 && index < postarray.length) {
                imageContainer.innerHTML = "";
                pageContainer.innerHTML = ""; // Clear previous images
                var href = `https://rule34.xxx/index.php?page=post&s=view&id=${idarray[index]}`
                var hrefContainer = document.createElement('a');
                hrefContainer.href = href;
                hrefContainer.target = '_blank';
                var pageElement = document.createElement('img');
                pageElement.src = postarray[index];
                //pageElement.loading = "lazy";
                pageElement.classList.add("page-image");
                pageContainer.appendChild(hrefContainer);
                hrefContainer.appendChild(pageElement);
            }
        }
        function nextImage() {
            imageIndex++;
            displayPageImage(imageIndex);
        }
    
        function previousImage() {
            if (imageIndex > 0) {
                imageIndex--;
            }
            displayPageImage(imageIndex);
        }
        if (checkbox.checked) {
            fetch(apiUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                pageContainer.innerHTML = "";
                imageContainer.innerHTML = "";
                postarray = [];
                for (var i = 0; i < data.length; i++) {
                    const ext = data[i].sample_url.split(".")[3];
                    const valid_ext = ["png", "jpg", "jpeg", "gif"];
                    if (valid_ext.includes(ext)) {
                        postarray.push(data[i].sample_url);
                        idarray.push(data[i].id);
                    }
                }
                console.log(postarray);
                imageIndex = 0;
                displayPageImage(imageIndex);
            })
            .catch(function(error) {
                console.error(error);
            });
            alert('Use the arrow keys to switch between images.');
        }
        else {
            fetch(apiUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                // Clear previous images
                imageContainer.innerHTML = "";
                pageContainer.innerHTML = "";
                // Loop through the data and create img elements
                for (var i = 0; i < data.length; i++) {
                    const ext = data[i].sample_url.split(".")[3];
                    const valid_ext = ["png", "jpg", "jpeg", "gif"];
                    if (valid_ext.includes(ext)) {
                        var imgElement = document.createElement("img");
                        imgElement.src = data[i].sample_url;
                        imgElement.loading = "lazy";
                        var href = `https://rule34.xxx/index.php?page=post&s=view&id=${data[i].id}`
                        var hrefContainer = document.createElement('a');
                        hrefContainer.href = href;
                        hrefContainer.target = '_blank';
                        imgElement.classList.add("custom-image");
                        pageContainer.appendChild(hrefContainer);
                        hrefContainer.appendChild(imgElement);
                    }
                }
            })
            .catch(function(error) {
                console.error("Error fetching images:", error);
                alert(`There are no results for ${encodeURIComponent(searchTerm)}.`);
            });
        }    
        // Event listener for keyboard arrow keys
        document.addEventListener("keydown", (event) => {
            if (checkbox.checked) {
                if (event.key === "ArrowLeft") {
                    previousImage();
                } else if (event.key === "ArrowRight") {
                    nextImage();
                }
            }
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