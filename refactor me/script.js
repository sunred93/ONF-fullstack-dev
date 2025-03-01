const modal = document.getElementById("mymodal");
const openmodalbtn = document.getElementById("openmodal");
const closemodalbtn = document.getElementById("closemodal");

openmodalbtn.addEventListener("click", () => {
  modal.showModal();
});

closemodalbtn.addEventListener("click", () => {
  modal.close();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.close();
  }
})






