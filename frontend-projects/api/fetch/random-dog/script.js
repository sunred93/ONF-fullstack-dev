// --- 1. Load initial data from localStorage ---
// Get saved count, default to 0 if not found
let ViewCount = parseInt(localStorage.getItem('viewCount')) || 0;
// Get saved image URL, default to null or an empty string if not found
let lastDogImageUrl = localStorage.getItem('lastDogImageUrl') || "";

const viewCounterElement = document.getElementById("view-count");
const dogImageElement = document.getElementById("dog-image");
const dogMessageElement = document.getElementById("dog-message");
const generateButton = document.getElementById("generate-button");

// --- 2. Update initial display with loaded data ---
if (viewCounterElement) {
    viewCounterElement.textContent = ViewCount;
}
if (lastDogImageUrl && dogImageElement && dogMessageElement) {
    dogImageElement.src = lastDogImageUrl;
    dogMessageElement.textContent = lastDogImageUrl;
}

function getRandomDog() {
    // Optional: Show a loading state while fetching
    if (dogMessageElement) dogMessageElement.textContent = "Loading new dog...";
    if (dogImageElement) dogImageElement.src = ""; // Clear old image

    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Received data:", data);
        console.log("API Message:", data.message);

        const imageUrl = data.message; // Store URL in a variable

        // Update the page elements
        if (dogImageElement) dogImageElement.src = imageUrl;
        if (dogMessageElement) dogMessageElement.textContent = imageUrl;

        // Increment the counter
        ViewCount++;

        // Update the counter display
        if (viewCounterElement) {
            viewCounterElement.textContent = ViewCount;
        } else {
           console.warn("Element with ID 'view-count' not found.");
        }

        // --- 3. Save updated data to localStorage ---
        localStorage.setItem('viewCount', ViewCount);
        localStorage.setItem('lastDogImageUrl', imageUrl);

    })
    .catch(error => {
        console.error("Error fetching dog:", error);
        if (dogMessageElement) {
            dogMessageElement.textContent = "Failed to load dog. Please try again.";
        }
        // Keep the last successfully loaded image from storage, or clear if preferred
        // if (dogImageElement) dogImageElement.src = ""; // Uncomment to clear image on error
    });
}

// Add event listener
if (generateButton) {
    generateButton.addEventListener("click", getRandomDog);
} else {
    console.error("Generate button not found!");
}

// --- 4. Decide on initial fetch ---
// If no image was loaded from localStorage, fetch one immediately.
// Otherwise, the user sees the stored image and can click the button for a new one.
if (!lastDogImageUrl) {
    getRandomDog();
}


