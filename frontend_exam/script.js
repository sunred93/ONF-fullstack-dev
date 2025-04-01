const menuBtn = document.querySelector('.menu-btn');
const closeMenuBtn = document.querySelector('.close-menu-btn');
const menuPanel = document.querySelector('.menu-panel');

// Function to open the menu
function openMenu() {
    menuPanel.classList.add('open');
}

// Function to close the menu
function closeMenu() {
    menuPanel.classList.remove('open');
}

// Event listeners
menuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);

// Close menu when clicking outside (optional)
window.addEventListener('click', (event) => {
    if (event.target == menuPanel) {
        closeMenu();
    }
});