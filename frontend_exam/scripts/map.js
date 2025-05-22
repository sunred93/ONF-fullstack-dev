// REPLACE WITH YOUR ACTUAL API KEY!
const Maps_API_KEY = "";

// Function to initialize the map
async function initMap() {
  // We use importLibrary for 'maps' and 'marker' to get the latest map and Advanced Markers
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  let placesService; // Declare here, initialize after map is created

  const mapCenter = { lat: 59.45, lng: 10.3 };

  // Create a new Google Map instance
  const map = new Map(document.getElementById("map"), {
    zoom: 9, // Adjusted zoom level
    center: mapCenter,
    mapId: "2ded080a41f51bcd557a9fbf",
  });

  // Initialize PlacesService, which needs the map object.
  // This must be done after the map object has been created.
  placesService = new google.maps.places.PlacesService(map);

  // Fetch farm data from your JSON file
  try {
    const response = await fetch("json/farms.json"); // Ensure this path is correct
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const farms = await response.json();

    // Iterate over each farm to create markers and info windows
    for (const farm of farms) {
      // Create an Advanced Marker for each farm
      // Uses the AdvancedMarkerElement imported from the 'marker' library
      const marker = new AdvancedMarkerElement({
        position: { lat: farm.lat, lng: farm.lng },
        map: map,
        title: farm.name, // Text displayed on marker hover
      });

      // Prepare initial info window content using data from farms.json
      // This will be shown instantly when marker is clicked.
      let infoWindowContentHtml = `
        <div class="info-window-content">
          <h3>${farm.name}</h3>
          <p class="description">${farm.description}</p>
      `;

      if (farm.address) {
        infoWindowContentHtml += `<p><strong>Address:</strong> ${farm.address}</p>`;
      }
      if (farm.produce_focus && farm.produce_focus.length > 0) {
        infoWindowContentHtml += `<p><strong>Focus:</strong> ${farm.produce_focus.join(
          ", "
        )}</p>`;
      }
      if (farm.rating) {
        infoWindowContentHtml += `<p><strong>Rating:</strong> ${farm.rating} / 5.0</p>`;
      }
      if (farm.website) {
        infoWindowContentHtml += `<p><a href="${farm.website}" target="_blank">Visit Website</a></p>`;
      }
      infoWindowContentHtml += `</div>`; // Close info window content div

      // Create a Google Maps InfoWindow instance
      const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContentHtml, // Set initial content
      });

      // Add a click listener to the marker
      marker.addListener("click", () => {
        // Open the info window with initial content immediately
        infoWindow.open(map, marker);

        // If a place_id exists, fetch more details from PlacesService
        if (farm.place_id) {
          placesService.getDetails(
            {
              placeId: farm.place_id,
              // Request specific fields from the OLD Places API.

              fields: [
                "photos",
                "name",
                "formatted_address",
                "website",
                "rating",
              ],
            },
            (place, status) => {
              // Check if the PlacesService request was successful and place data exists
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                place
              ) {
                let photoUrl = "";
                // Check if photos are available and get the URL for the first one
                if (place.photos && place.photos.length > 0) {
                  photoUrl = place.photos[0].getUrl({
                    maxWidth: 400,
                    maxHeight: 250,
                  });
                }

                // Rebuild the HTML content for the info window with updated Place API data
                let updatedInfoWindowContent = `
                  <div class="info-window-content">
                    <h3>${place.name || farm.name}</h3>
                `;

                if (photoUrl) {
                  updatedInfoWindowContent += `<img src="${photoUrl}" alt="${
                    place.name || farm.name
                  }">`;
                }

                updatedInfoWindowContent += `
                    <p><strong>Address:</strong> ${
                      place.formatted_address || farm.address
                    }</p>
                    <p class="description">${farm.description}</p>
                `;

                if (farm.produce_focus && farm.produce_focus.length > 0) {
                  updatedInfoWindowContent += `<p><strong>Focus:</strong> ${farm.produce_focus.join(
                    ", "
                  )}</p>`;
                }

                // Prefer rating from JSON, fallback to Places API rating
                if (farm.rating) {
                  updatedInfoWindowContent += `<p><strong>Rating:</strong> ${farm.rating} / 5.0</p>`;
                } else if (place.rating) {
                  updatedInfoWindowContent += `<p><strong>Rating:</strong> ${place.rating} / 5.0</p>`;
                }

                // Prefer website from Places API, fallback to JSON website
                if (place.website) {
                  // For old API, the field is simply 'website'
                  updatedInfoWindowContent += `<p><a href="${place.website}" target="_blank">Visit Website</a></p>`;
                } else if (farm.website) {
                  updatedInfoWindowContent += `<p><a href="${farm.website}" target="_blank">Visit Website</a></p>`;
                }

                updatedInfoWindowContent += `</div>`; // Close updated content div

                // Update the info window's content (it might already be open)
                infoWindow.setContent(updatedInfoWindowContent);
              } else {
                // Log a warning if Place details couldn't be fetched
                console.warn(
                  `Could not fetch full details for ${farm.name} (Place ID: ${farm.place_id}). Status: ${status}`
                );
                // The info window will retain its initial content from farms.json
              }
            }
          );
        }
      });
    }
  } catch (error) {
    console.error("Error loading farm data:", error);
  }
}

// Ensure initMap is globally accessible as Google Maps API will call it
window.initMap = initMap;

// Dynamically load the Google Maps JavaScript API
// 'callback=initMap' ensures that the initMap function is called once the API is loaded
// 'v=beta' is used for Advanced Markers and potentially other new features.
// 'libraries=places' is crucial for including the OLD PlacesService functionality.
const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${Maps_API_KEY}&callback=initMap&v=beta&libraries=places`;
script.async = true; // Load script asynchronously
document.head.appendChild(script);
