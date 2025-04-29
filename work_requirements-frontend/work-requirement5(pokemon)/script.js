// Get references to HTML elements
const pokemonContainer = document.querySelector('.pokemon-container');
const pokemonNameElement = document.getElementById('pokemon-name');
const pokemonImageElement = document.getElementById('pokemon-image');
const pokemonTypesElement = document.getElementById('pokemon-types');
const generateButton = document.getElementById('generate-button');
const pokemonHeightElement = document.getElementById('pokemon-height');
const pokemonWeightElement = document.getElementById('pokemon-weight');
const pokemonBaseExpElement = document.getElementById('pokemon-base-exp');
const pokemonAbilitiesElement = document.getElementById('pokemon-abilities');
const pokemonStatsListElement = document.getElementById('pokemon-stats');
const viewCounterElement = document.getElementById('view-counter');
const defaultSpriteBtn = document.getElementById('sprite-default-btn');
const shinySpriteBtn = document.getElementById('sprite-shiny-btn');

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/';
const LOCAL_STORAGE_KEY = 'lastPokemonId'; // Key for local storage

// --- State Variables ---
let pokemonViewCount = 0;
let currentPokemonData = null; // Store currently displayed Pokémon data for sprite switching

// --- CORS Explanation Comment ---
/*
 * Why does CORS (Cross-Origin Resource Sharing) exist?
 * Browsers have a security feature called the Same-Origin Policy. By default,
 * a web page served from one origin (e.g., http://127.0.0.1:5500) cannot make
 * requests (like fetch) to a different origin (e.g., https://random-d.uk).
 * This prevents malicious scripts on one site from reading sensitive data from another site
 * where the user might be logged in.
 *
 * CORS is a mechanism that allows servers (like an API) to explicitly tell the browser
 * which *other* origins are permitted to make requests to it. The server does this
 * by sending specific HTTP headers (like `Access-Control-Allow-Origin`).
 *
 * If the required CORS headers are missing from the server's response, the browser
 * blocks the request, resulting in a CORS error in the console. This is why
 * CORS proxies (like api.cors.lol) are sometimes used – they add the necessary
 * headers to allow requests from any origin, bypassing the browser's restriction.
 *
 * Thankfully, the PokéAPI (https://pokeapi.co) includes the necessary CORS headers
 * (Access-Control-Allow-Origin: *), so we don't need a proxy for it.
 */


// --- UI Update Functions ---

/**
 * Updates the UI to reflect the loading state.
 * @param {boolean} isLoading - True if loading, false otherwise.
 */
function displayLoadingState(isLoading) {
    const elementsToClear = [
        pokemonNameElement, pokemonTypesElement, pokemonHeightElement,
        pokemonWeightElement, pokemonBaseExpElement, pokemonAbilitiesElement
    ];

    if (isLoading) {
        generateButton.disabled = true;
        defaultSpriteBtn.disabled = true; 
        shinySpriteBtn.disabled = true;   
        pokemonContainer.setAttribute('aria-busy', 'true');

        // Clear text content and set placeholders/loading text
        elementsToClear.forEach(el => { if (el) el.textContent = '...'; });
        // Specifically set name to Loading...
        if (pokemonNameElement) pokemonNameElement.textContent = 'Loading...';
        pokemonImageElement.src = '';
        pokemonImageElement.alt = 'Loading Pokémon image...';
        pokemonStatsListElement.innerHTML = '<li>Loading...</li>';

        pokemonContainer.classList.add('loading');
    } else {
        // This helps prevent issues if called multiple times or after an error reset
        if (pokemonContainer.classList.contains('loading')) {
            pokemonContainer.classList.remove('loading');
            generateButton.disabled = false;
            pokemonContainer.setAttribute('aria-busy', 'false');
        }
    }
}

/**
 * Updates the Pokémon card UI with fetched data.
 * @param {object} pokemonData - The data object fetched from the PokéAPI.
 * @param {boolean} isNewView - Whether this counts as a new Pokémon view for the counter.
 */
function updatePokemonCard(pokemonData, isNewView = true) {
    currentPokemonData = pokemonData; // Store data for sprite switching

    // Extract and format data
    const name = pokemonData.name;
    // --- Sprite URLs ---
    const defaultSprite = pokemonData.sprites.other['official-artwork']?.front_default || pokemonData.sprites.front_default;
    const shinySprite = pokemonData.sprites.other['official-artwork']?.front_shiny || pokemonData.sprites.front_shiny;
    // --- End Sprite URLs ---
    const types = pokemonData.types.map(typeInfo => typeInfo.type.name).join(', ');
    const height = pokemonData.height / 10;
    const weight = pokemonData.weight / 10;
    const baseExperience = pokemonData.base_experience ?? 'N/A';
    const abilities = pokemonData.abilities.map(abilityInfo =>
        abilityInfo.is_hidden ? `${abilityInfo.ability.name} (Hidden)` : abilityInfo.ability.name
    ).join(', ') || 'None';
    const stats = pokemonData.stats;

    // Update DOM elements
    pokemonNameElement.textContent = name;
    // --- Set initial image (default) and store URLs in data attributes ---
    pokemonImageElement.src = defaultSprite || ''; // Default to default sprite
    pokemonImageElement.alt = `Image of ${name} (Default)`;
    pokemonImageElement.dataset.defaultSrc = defaultSprite || '';
    pokemonImageElement.dataset.shinySrc = shinySprite || '';
    // --- End Image Update ---
    pokemonTypesElement.textContent = `Types: ${types}`;
    pokemonHeightElement.textContent = `${height} m`;
    pokemonWeightElement.textContent = `${weight} kg`;
    pokemonBaseExpElement.textContent = baseExperience;
    pokemonAbilitiesElement.textContent = abilities;

    // Populate stats list
    pokemonStatsListElement.innerHTML = '';
    if (stats && stats.length > 0) {
        stats.forEach(statInfo => {
            const li = document.createElement('li');
            const statName = statInfo.stat.name.replace('-', ' ');
            const statValue = statInfo.base_stat;
            li.innerHTML = `<span class="stat-name">${statName}:</span> <span class="stat-value">${statValue}</span>`;
            pokemonStatsListElement.appendChild(li);
        });
    } else {
        pokemonStatsListElement.innerHTML = '<li>No stats available</li>';
    }

    // --- Enable Sprite Buttons ---
    defaultSpriteBtn.disabled = !defaultSprite; // Disable if no default sprite
    shinySpriteBtn.disabled = !shinySprite;   // Disable if no shiny sprite

    // --- Update Counter ---
    if (isNewView) {
        pokemonViewCount++;
        viewCounterElement.textContent = pokemonViewCount;
    }

    // --- Save to Local Storage ---
    localStorage.setItem(LOCAL_STORAGE_KEY, pokemonData.id);
}

/**
 * Updates the UI to display an error message.
 * @param {string} errorMessage - The error message to display.
 */
function displayErrorState(errorMessage) {
    pokemonNameElement.textContent = 'Failed to Fetch';
    pokemonImageElement.src = '';
    pokemonImageElement.alt = 'Failed to load image';
    pokemonTypesElement.textContent = errorMessage; // Display specific error
    pokemonHeightElement.textContent = 'N/A';
    pokemonWeightElement.textContent = 'N/A';
    pokemonBaseExpElement.textContent = 'N/A';
    pokemonAbilitiesElement.textContent = 'N/A';
    pokemonStatsListElement.innerHTML = '<li>Error loading stats</li>';
    defaultSpriteBtn.disabled = true; 
    shinySpriteBtn.disabled = true;

    // Ensure loading visuals are turned off if an error occurs
    displayLoadingState(false);
}


// --- Data Fetching Functions ---

/**
 * Fetches the total count of Pokémon species.
 * Throws an error if the fetch fails.
 * @returns {Promise<number>} The total count of Pokémon.
 */
async function getPokemonCount() {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}pokemon-species/?limit=1`);
        if (!response.ok) {
            // Throw a more specific error
            throw new Error(`Failed to fetch Pokémon count (Status: ${response.status})`);
        }
        const data = await response.json();
        if (typeof data?.count !== 'number') {
            throw new Error("Invalid count data received from API.");
        }
        return data.count;
    } catch (error) {
        console.error("Error in getPokemonCount:", error);
        // Re-throw the error to be caught by the caller
        throw error;
    }
}

/**
 * Fetches detailed data for a specific Pokémon by ID.
 * Throws an error if the fetch fails. Adds status code to error.
 * @param {number} id - The ID of the Pokémon to fetch.
 * @returns {Promise<object>} The Pokémon data object.
 */
async function fetchPokemonDataById(id) {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}pokemon/${id}`);
        if (!response.ok) {
            const error = new Error(`Failed to fetch Pokémon data (Status: ${response.status})`);
            error.status = response.status; // Attach status for specific handling (like 404)
            throw error;
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching Pokémon ID ${id}:`, error);
        // Re-throw the error
        throw error;
    }
}


// --- Main Application Logic ---

/**
 * Fetches a random Pokémon's data and updates the display.
 * Handles loading states and errors.
 */
async function fetchAndDisplayPokemon() {
    displayLoadingState(true); // Set loading UI

    try {
        const pokemonCount = await getPokemonCount(); // Fetch count first

        const randomId = Math.floor(Math.random() * pokemonCount) + 1;
        console.log(`Fetching Pokémon with ID: ${randomId}`);

        const pokemonData = await fetchPokemonDataById(randomId); // Fetch specific data
        console.log("Fetched Pokémon data:", pokemonData);

        updatePokemonCard(pokemonData); // Update UI with fetched data

    } catch (error) {
        // Handle specific errors (like 404) or display general error
        if (error.status === 404) {
            console.warn(`Pokémon with ID not found. Trying again...`);
            // Recursive call - loading state remains true until success or different error
            fetchAndDisplayPokemon();
            return; // Exit this attempt
        } else {
            // Display a general error message using the UI function
            displayErrorState(error.message || "An unknown error occurred.");
        }
    } finally {
        // Ensure the loading state is removed, unless a 404 error
        // triggered an automatic retry (in which case the loading state stays active).
        if (pokemonContainer.classList.contains('loading')) {
            // The check for '.loading' implicitly handles the 404 retry case,
            // as the class wouldn't be removed if the catch block returned early.
            displayLoadingState(false);
        }
    }
    
}

/**
 * Fetches a specific Pokémon by ID and updates the display.
 * Used for loading from local storage. Does not increment view counter.
 * @param {number} id - The ID of the Pokémon to fetch.
 */
async function fetchAndDisplayPokemonById(id) {
    displayLoadingState(true);

    try {
        console.log(`Fetching specific Pokémon with ID: ${id}`);
        const pokemonData = await fetchPokemonDataById(id); // Fetch specific data
        console.log("Fetched Pokémon data:", pokemonData);

        updatePokemonCard(pokemonData, false); // Update UI, isNewView = false

    } catch (error) {
        // If fetching the specific ID fails (e.g., 404 or network error),
        // display the error and clear local storage so we don't retry next time.
        console.error(`Failed to fetch Pokémon with stored ID ${id}:`, error);
        displayErrorState(`Failed to load last Pokémon (ID: ${id}). ${error.message || ''}`);
        localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear bad ID from storage
    } finally {
         if (pokemonContainer.classList.contains('loading')) {
             displayLoadingState(false);
        }
    }
}


// --- Event Listeners ---
generateButton.addEventListener('click', fetchAndDisplayPokemon);

// --- Sprite Button Listeners ---
defaultSpriteBtn.addEventListener('click', () => {
    if (pokemonImageElement.dataset.defaultSrc && currentPokemonData) {
        pokemonImageElement.src = pokemonImageElement.dataset.defaultSrc;
        pokemonImageElement.alt = `Image of ${currentPokemonData.name} (Default)`;
    }
});

shinySpriteBtn.addEventListener('click', () => {
    if (pokemonImageElement.dataset.shinySrc && currentPokemonData) {
        pokemonImageElement.src = pokemonImageElement.dataset.shinySrc;
        pokemonImageElement.alt = `Image of ${currentPokemonData.name} (Shiny)`;
    }
});


// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize counter display (optional, if you want to load count from somewhere else later)
    viewCounterElement.textContent = pokemonViewCount;

    // Check local storage for the last viewed Pokémon
    const lastPokemonId = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (lastPokemonId) {
        console.log(`Loading last viewed Pokémon (ID: ${lastPokemonId}) from localStorage.`);
        // Fetch the specific Pokémon from storage, don't count as new view
        fetchAndDisplayPokemonById(parseInt(lastPokemonId, 10));
    } else {
        // Fetch a random one if nothing in storage, count as new view
        fetchAndDisplayPokemon();
    }
});
