// Initialize the flag variable
let isModalOpen = false;

// Get references to DOM elements
const modal = document.getElementById("mymodal");
const saturnImage = document.getElementById("saturn");
const openmodalbtn = document.getElementById("openmodal");
const closemodalbtn = document.getElementById("closemodal");
const subscribeform = document.getElementById("subscribeform");
const emailInput = document.getElementById("emailinput");

// Function to open the modal
function openModal() {
  if (!isModalOpen) {
    modal.showModal();
    isModalOpen = true;
    emailInput.value = ""; // Clear the form
  }
}

// Function to close the modal
function closeModal() {
  modal.close();
  isModalOpen = false; // Reset the flag to false immediately
}

// Named function for the mouseenter event
function handleMouseEnter() {
  openModal(); // open the modal
}

// Event listener for the open button
openmodalbtn.addEventListener("click", openModal);

// Event listener for the mouseenter event on the image
saturnImage.addEventListener("mouseenter", handleMouseEnter);

// Event listener for the close button
closemodalbtn.addEventListener("click", closeModal);

// Event listener for clicking outside the modal
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Event listener for the Escape key
addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Event listener for form submission
subscribeform.addEventListener("submit", (event) => {
  event.preventDefault();
  closeModal();
    setTimeout(() => {
    alert("your e-mail have been registered successfully!");
    saturnImage.removeEventListener("mouseenter", handleMouseEnter); //removes the mouseenter event after form submission//
    subscribeform.reset();
  }, 0);
});
