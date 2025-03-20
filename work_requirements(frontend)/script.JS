// Get the dialog element
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

// Close the dialog when clicking outside of it
loginDialog.addEventListener("click", (event) => {
    if (event.target === loginDialog) {
      loginDialog.close();
    }
  });