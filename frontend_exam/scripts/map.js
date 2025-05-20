
async function loadKey() {
  const resp = await fetch('/api/maps-key');
  const { key } = await resp.json();
  return key;
}


// Import the Google Maps JavaScript API
// This code snippet loads the Google Maps JavaScript API dynamically

(async () => {
  // 1. Fetch API key from backend
  const resp = await fetch('/api/maps-key');
  const { key: apiKey } = await resp.json();

  // 2. Google Maps loader snippet
  ;((g) => {
    let h, a, k;
    const p = "The Google Maps JavaScript API",
          c = "google",
          loaderFn = "importLibrary",
          cbName = "__ib__",
          doc = document,
          win = window;
    win[c] = win[c] || {};
    const mapsObj = win[c].maps = win[c].maps || {};
    const queue = new Set();
    const params = new URLSearchParams();
    const initScript = () => {
      if (h) return h;
      return h = new Promise((resolve, reject) => {
        a = doc.createElement('script');
        params.set('libraries', [...queue].join(','));
        Object.entries(g).forEach(([key, val]) => {
          const param = key.replace(/([A-Z])/g, '_$1').toLowerCase();
          params.set(param, val);
        });
        params.set('callback', `${c}.maps.${cbName}`);
        a.src = `https://maps.googleapis.com/maps/api/js?${params}`;
        mapsObj[cbName] = resolve;
        a.onerror = () => reject(new Error(p + ' could not load.'));
        doc.head.append(a);
      });
    };
    win[c][loaderFn] = (lib) => {
      queue.add(lib);
      return initScript().then(() => win[c][loaderFn](lib));
    };
  })({
    key: apiKey,
    v: 'weekly'
  });

  // 3. Farm locations for markers
  const farmLocations = [
    { name: 'Braastad Gaard',   lat: 60.6342, lng: 10.2695 },
    { name: 'Oppdalslinna 242', lat: 60.4960, lng: 10.7056 }
    // add more farms as needed
  ];

  // 4. Wait for API to bootstrap
  await new Promise(resolve => window.google.maps.__ib__ = resolve);

  // 5. Import the Maps modules
  const { Map, Marker, LatLngBounds } = await google.maps.importLibrary('maps');

  // 6. Create the map and fit markers
  const map = new Map(document.getElementById('map'), {
    center: { lat: farmLocations[0].lat, lng: farmLocations[0].lng },
    zoom: 8
  });
  const bounds = new LatLngBounds();

  farmLocations.forEach(({ name, lat, lng }) => {
    new Marker({ map, position: { lat, lng }, title: name });
    bounds.extend({ lat, lng });
  });

  map.fitBounds(bounds);

})().catch(err => console.error('Map initialization failed:', err));
