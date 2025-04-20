// Get the logindialog element
const loginDialog = document.getElementById("loginDialog");

// Get the close button
const closeLoginDialog = document.getElementById("closeLoginDialog");

// Get the login button
const openLoginDialog = document.getElementById("openLoginDialog");

// Open the dialog when the login button is clicked
openLoginDialog.addEventListener("click", () => {
  loginDialog.showModal();
});

// Close the dialog when the close button is clicked
closeLoginDialog.addEventListener("click", () => {
  loginDialog.close();
});

// Event listener for form submission
loginDialog.addEventListener("submit", (event) => {
  event.preventDefault();
  loginDialog.close();

  // Get the form inside the dialog
  const formInsideDialog = loginDialog.querySelector("form");

  // Show the alert
  alert("Login form submitted!");

  // Reset the form
  if (formInsideDialog) {
    formInsideDialog.reset();
  }
});

// Close the dialog when clicking outside of it
loginDialog.addEventListener("click", (event) => {
  const dialogDimensions = loginDialog.getBoundingClientRect();
  if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
  ) {
    loginDialog.close();
  }
});

const emailContactRadio = document.getElementById("emailContact");
const phoneContactRadio = document.getElementById("phoneContact");
const emailField = document.getElementById("contactEmail");
const phoneField = document.getElementById("phoneNumber");
const contactForm = document.getElementById("contactForm"); // Get the form element
const emailLabel = document.getElementById("emailLabel");
const phoneLabel = document.getElementById("phoneLabel");

// Function to toggle fields
function toggleContactFields() {
  if (phoneContactRadio.checked) {
    emailField.required = false;
    phoneField.required = true;
    emailField.style.display = "none";
    emailLabel.style.display = "none";
    phoneField.style.display = "block";
    phoneLabel.style.display = "block";
    emailField.value = ""; // Clear the email field
    phoneField.value = "";
  } else {
    emailField.required = true;
    phoneField.required = false;
    emailField.style.display = "block";
    emailLabel.style.display = "block";
    phoneField.style.display = "none";
    phoneLabel.style.display = "none";
    emailField.value = "";
    phoneField.value = "";
  }
}

// Initial setup
toggleContactFields();

// Event listeners for radio buttons
emailContactRadio.addEventListener("change", toggleContactFields);
phoneContactRadio.addEventListener("change", toggleContactFields);

// Prevent default form submission
contactForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default submission

  // Manually check form validity
  if (contactForm.checkValidity()) {
    // Form is valid, proceed with submission
    alert("thank you for submitting! :) ");
    contactForm.reset();
    toggleContactFields(); // Reset the fields after submission
  } else {
    // Form is invalid, show error messages (if any)
    contactForm.reportValidity();
  }
});
