
function getRandomDuck() {
    fetch("https://api.cors.lol/?url=https://random-d.uk/api/random")
    .then(response => {
        // Add error handling for bad HTTP responses
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Received data:", data); // Log the whole object
        // Correctly log the message property from the data object
        console.log("API Message:", data.message);
        document.getElementById("duck-image").src = data.url;
        document.getElementById("duck-message").textContent = data.message;
    })
    .catch(error => {
        // Use console.error for errors, it's more standard
        console.error("Error fetching duck:", error);
        // Optionally display an error message to the user
        document.getElementById("duck-message").textContent = "Failed to load duck. Please try again.";
        // Clear the image source on error
        document.getElementById("duck-image").src = "";
    });
}

document.getElementById("generate-button").addEventListener("click", getRandomDuck)
getRandomDuck()

