const fetchBtn = document.getElementById("fetch-btn");
const imgEl = document.getElementById("pokemon-image");
const messageEl = document.getElementById("message");
const errorEl = document.getElementById("error");
const loaderEl = document.getElementById("loader");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchRandomPokemon() {
  loaderEl.style.display = "block";
  fetchBtn.disabled = true;
  imgEl.hidden = true;
  messageEl.textContent = "";
  errorEl.textContent = "";

  // Wait 1 second before doing the network request
  await sleep(1000);

  const id = Math.floor(Math.random() * 151) + 1;
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Could not fetch Pokémon.");
    const data = await res.json();

    const artwork =
      data.sprites.other["official-artwork"].front_default ||
      data.sprites.front_default;

    imgEl.src = artwork;
    imgEl.alt = data.name;
    messageEl.textContent = `You caught a ${data.name.toUpperCase()}!`;
    imgEl.hidden = false;
  } catch (err) {
    errorEl.textContent = err.message;
  } finally {
    loaderEl.style.display = "none";
    fetchBtn.disabled = false;
  }
}

fetchBtn.addEventListener("click", fetchRandomPokemon);

fetchRandomPokemon(); // Fetch a random Pokémon on page load
