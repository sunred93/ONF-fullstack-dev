// --- Global Variables ---
let viewCount = 0; // Initialize view count

// --- DOM Elements (Get them once) ---
const duckImageElement = document.getElementById("duck-image");
const duckMessageElement = document.getElementById("duck-message");
const generateButton = document.getElementById("generate-button");
const viewCountElement = document.getElementById("view-count");

// --- Helper Functions ---

function getSelectedDuckFormat() {
    const selectedInput = document.querySelector('input[name="duckFormat"]:checked');
    return selectedInput?.value || 'jpg'; // Default to 'jpg'
}

// Updated to handle view count display
function updateDuckDisplay(imageUrl, message, altText) {
    if (duckImageElement) {
        duckImageElement.src = imageUrl || "";
        duckImageElement.alt = altText || "Random Duck";
        duckImageElement.style.opacity = '1'; // Ensure opacity is reset
    } else {
        console.error("Duck image element not found!");
    }

    if (duckMessageElement) {
        duckMessageElement.textContent = message || "";
    } else {
        console.error("Duck message element not found!");
    }

    // Update the view count display
    if (viewCountElement) {
        viewCountElement.textContent = viewCount;
    } else {
        // Log error only once if the element is missing
        if (!window.viewCountElementMissingLogged) {
             console.error("View count element (#view-count) not found in HTML!");
             window.viewCountElementMissingLogged = true;
        }
    }
}

// Function to save data to localStorage
function saveLastDuck(data) {
    if (!data || !data.url || !data.message) return;
    try {
        const dataToSave = {
            url: data.url,
            message: data.message,
        };
        localStorage.setItem('lastDuckData', JSON.stringify(dataToSave));
        // Optional: Persist view count
        // localStorage.setItem('duckViewCount', viewCount.toString());
    } catch (e) {
        console.error("Error saving duck data to localStorage:", e);
    }
}

// Function to load data from localStorage
function loadLastDuck() {
    const savedData = localStorage.getItem('lastDuckData');
    // Optional: Load persisted view count
    // const savedCount = localStorage.getItem('duckViewCount');
    // if (savedCount) {
    //     viewCount = parseInt(savedCount, 10) || 0;
    // }

    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            if (parsedData && typeof parsedData.url === 'string' && typeof parsedData.message === 'string') {
                // Display loaded data - DO NOT increment view count here
                updateDuckDisplay(parsedData.url, parsedData.message, 'Last viewed duck');
                console.log("Loaded last viewed duck from storage.");
                return true; // Indicate success
            } else {
                 console.warn("Invalid data structure found in localStorage. Clearing.");
                 localStorage.removeItem('lastDuckData');
            }
        } catch (e) {
            console.error("Error parsing saved duck data:", e);
            localStorage.removeItem('lastDuckData');
        }
    }
    return false; // Indicate nothing valid was loaded
}


// --- Main Fetch Logic (Async/Await) ---
async function fetchAndDisplayDuck() {
    const selectedFormat = getSelectedDuckFormat();
    const apiBaseUrl = "https://random-d.uk/api/random";
    // Construct the target API endpoint
    const apiEndpoint = `${apiBaseUrl}?${selectedFormat}`;
    // Construct the full URL using the proxy, encoding the target URL
    const proxyUrl = `https://api.cors.lol/?url=${encodeURIComponent(apiEndpoint)}`;

    console.log(`Fetching from: ${proxyUrl}`);

    // Show loading state - keep current image/alt temporarily if available
    const currentAlt = duckImageElement ? duckImageElement.alt : "Loading...";
    const currentMessage = `Loading ${selectedFormat.toUpperCase()} duck...`;
    updateDuckDisplay(duckImageElement?.src || "", currentMessage, currentAlt);
    // Visual loading indicator
    if(duckImageElement) duckImageElement.style.opacity = '0.5';


    try {
        const response = await fetch(proxyUrl); // Use the proxy URL

        if (!response.ok) {
            let errorBody = '';
            try {
                errorBody = await response.text();
                errorBody = errorBody.substring(0, 200);
            } catch (_) { /* Ignore */ }
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText || ''} ${errorBody}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            const errorDetail = text ? `. Body: ${text.substring(0, 100)}...` : '';
            throw new Error(`Received non-JSON response: ${response.status} ${response.statusText || ''}${errorDetail}`);
        }

        const data = await response.json();
        console.log("Received data:", data);

        if (data && typeof data.url === 'string' && typeof data.message === 'string') {
            console.log("API Message:", data.message);

            
            // Increment only after successfully getting and validating data
            viewCount++;

            // Update display with the new duck and the incremented count
            updateDuckDisplay(data.url, data.message, `Random Duck (${selectedFormat.toUpperCase()})`);
            saveLastDuck(data); // Save the newly fetched duck data

        } else {
            console.error("Unexpected data structure received:", data);
            // Don't increment count on structural error
            updateDuckDisplay("", "Received unexpected data from API.", "Error loading image");
        }

    } catch (error) {
        console.error("Error fetching duck:", error);
        // Don't increment count on fetch error
        updateDuckDisplay("", `Failed to load duck. Error: ${error.message}. Please try again.`, "Error loading image");
    } finally {
         // Reset visual loading indicator (opacity) regardless of success/failure
         if(duckImageElement) duckImageElement.style.opacity = '1';
    }
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {

    // loading the last viewed duck from localStorage first
    const loadedFromStorage = loadLastDuck();

    // If nothing was loaded from storage, fetch a new duck immediately
    if (!loadedFromStorage) {
        fetchAndDisplayDuck(); // Fetch the initial duck
    }
    // If loaded from storage, loadLastDuck already updated the display

    // Attach the event listener to the button 
    if (generateButton) {
        generateButton.addEventListener("click", fetchAndDisplayDuck);
    } else {
        console.error("Generate button (#generate-button) not found!");
    }

    //  listeners for radio buttons to fetch a new duck when format changes
    const radioButtons = document.querySelectorAll('input[name="duckFormat"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', fetchAndDisplayDuck);
    });
});
