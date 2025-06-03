# FRAM - Food delivery

## Project Description

FRAM is a modern sustainable food delivery webpage for ordering fresh, locally-sourced produce directly from partnering farms. It features an intuitive user interface, a smart AI chatbot assistant for customer inquiries, and seamless integration with Google Maps to showcase farm locations. The project emphasizes responsive design, accessibility, and a smooth user experience.
This Project was developed for the exam of the Frontend essentials course in Oslo Nye Fagskole, spring 2025

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [project structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
- [AI Integration](#ai-integration)
- [Third-Party API Integration](#third-party-api-integration)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Development Process](#development-process)
- [Challenges Faced & Solutions](#challenges-faced--solutions)
- [Resources Used](#resources-used)
- [Future Improvements](#future-improvements)
- [Author](#author)

## Features

- **Frontend Webshop:**
  - Product catalag: Browse our seasonal produce selection.
  - Shopping cart: Add and manage items to a persistent shopping cart
  - Responsive design for all devices.
  - "How it works" section explaining the service.
  - Popular produce slider (landingpage.js, Swiper integration).
  - Newsletter subscription form.
- **AI Chatbot (OpenAI Integration):**
  - Integrated chatbot for user assistance (chatbot.js, server.mjs).
  - Provides information about produce, farms, and how the site works based on a predefined catalog.
  - Handles chat history for contextual conversations.
  - User-friendly interface with thinking indicators and error messages.
- **Google Maps Integration:**
  - Displays partnering farm locations on an interactive map (map.js, products.html).
  - Shows farm details in info windows, including data from Google Places API and `farms.json`.

## Technologies Used

- **Frontend:**
  - HTML5 (Semantic)
  - CSS3 (Flexbox, Grid, Custom Properties, Responsive Design)
  - JavaScript (ES6+, Async/Await, DOM Manipulation)
  - Swiper.js (for product carousel)
- **Backend (for Chatbot):**
  - Node.js
  - Express.js
  - `cors` middleware
  - `dotenv` for environment variables
- **APIs:**
  - OpenAI API (for the chatbot)
  - Google Maps JavaScript API (with Places library)
- **Development Tools:**
  - Visual Studio Code
  - Git & GitHub
  - Browser Developer Tools (Chrome DevTools)
  - Lighthouse (for testing)
- **Design:**
  - Figma (based on provided design specifications)

## Project Structure

```
├── css/                             # Contains all CSS stylesheets
│   ├── base.css                     # Base styles, variables, and resets
│   ├── layout.css                   # Global layout and structural styles
│   └── components/                  # Styles for individual UI components
│       ├── cart.css                 # Styling for the shopping cart dropdown
│       ├── chatbot.css              # Styling for the AI chatbot dialog
│       ├── checkout.css             # Styling for the checkout page
│       ├── footer.css               # Styling for the footer section
│       ├── header.css               # Styling for the header and navigation
│       ├── hero.css                 # Styling for the hero section
│       ├── how-it-works.css         # Styling for the "How it works" section
│       ├── info-window.css          # Styling for Google Maps info windows
│       ├── popular-produce.css      # Styling for the popular produce slider
│       ├── product-page.css         # Styling for the product listing page
│       └── shop-ask.css             # Styling for the "Shop & Ask" section
├── json/                            # Stores local JSON data
│   ├── farms.json                   # Data for partnering farms (used by map and chatbot)
│   └── produce.json                 # Data for available produce (used by product listings, popular produce slider, and chatbot)
├── pictures/                        # Image assets
│   ├── Images/                      # High-resolution images
│   │   └── Landing Page/
│   │   |    ├── markus-spiske-WcLzVLbUP5g-unsplash.jpg # Hero image
│   │   |    ├── nina-luong-dp06f70Eyvc-unsplash.jpg     # Shop section image
│   │   |    └── rebecca-ritchie-NWrp3FK68yE-unsplash.jpg # Ask section image
|   |   |
|   |   └── Product page/
│   |    ├── goh-rhy-yan-CCxWLAx0qmk-unsplash.jpg         # Red onions image
│   |    ├── goh-rhy-yan-wUBhu3GXIg0-unsplash.jpg         # Carrots image
│   |    ├── lukasz-rawa-HB_MVtHVMLc-unsplash.jpg         # Oats image
│   |    ├── matthew-pilachowski-w1eAFyBLhLM-unsplash.jpg # Garlic image
│   |    └── rodrigo-dos-reis-h3AkzboxK4Q-unsplash.jpg     # Potatoes image
|   |
│   └── tinified/                    # Optimized/compressed images for web (e.g., smaller sizes for mobile or lazy loading)
│       ├── goh-rhy-yan-CCxWLAx0qmk-unsplash.jpg         # Red onions image
│       ├── goh-rhy-yan-wUBhu3GXIg0-unsplash.jpg         # Carrots image
│       ├── lukasz-rawa-HB_MVtHVMLc-unsplash.jpg         # Oats image
│       ├── markus-spiske-WcLzVLbUP5g-unsplash.jpg       # Hero image (tinified)
│       ├── matthew-pilachowski-w1eAFyBLhLM-unsplash.jpg # Garlic image
│       ├── nina-luong-dp06f70Eyvc-unsplash.jpg           # Shop section image (tinified)
│       ├── rebecca-ritchie-NWrp3FK68yE-unsplash.jpg     # Ask section image (tinified)
│       └── rodrigo-dos-reis-h3AkzboxK4Q-unsplash.jpg     # Potatoes image
├── scripts/                         # Contains all JavaScript files
│   ├── cart.js                      # Manages shopping cart logic (add, remove, update quantity, localStorage)
│   ├── chatbot.js                   # Handles AI chatbot frontend logic and communication with backend
│   ├── checkout.js                  # Logic for the checkout page, displaying cart items and form handling
│   ├── landingpage.js               # JavaScript for the main landing page (e.g., Swiper slider, button actions)
│   ├── map.js                       # Google Maps integration, displaying farm locations and info windows
│   ├── produce.js                   # Logic for rendering the product listing page
│   └── test.js                      # (Optional) JavaScript for testing purposes or early development
├── .env.example                     # Example environment variables file (for backend API keys)
├── .gitignore                       # Specifies intentionally untracked files to ignore by Git
├── checkout.html                    # HTML page for the shopping cart checkout process
├── index.html                       # Main landing page of the webshop
├── package.json                     # Node.js project metadata and dependencies for the backend server
├── package-lock.json                # Records the exact dependency tree created during installation
├── products.html                    # HTML page for Browse available produce and viewing farm map
└── server.mjs                       # Node.js backend server for handling API requests (e.g., chatbot)
```

## Setup Instructions

1.  **Prerequisites:**

    - Node.js and npm (or yarn) installed.
    - Git installed.
    - An OpenAI API Key.
    - A Google Maps API Key (ensure it's configured for the Maps JavaScript API and Places API).

2.  **Clone the Repository:**

    ```bash
    git clone https://github.com/sunred93/ONF-fullstack-dev/tree/frontend-exam
    cd frontend_exam
    ```

3.  **Install Dependencies:**

    - The frontend doesn't have its own `package.json` for direct npm install of frontend-only libraries like Swiper (it's loaded via CDN). The `package.json` is for the Node.js server.
    - For the server (chatbot backend):
      ```bash
      # Navigate to the frontend_exam directory if not already there
      npm install
      ```

4.  **Environment Variables:**

    - Create a `.env` file in the `frontend_exam` directory (where `server.mjs` is located).
    - Add your OpenAI API key to the `.env` file:
      ```env
      OPENAI_API_KEY=your_openai_api_key_here
      PORT=3000
      ```
    - In `frontend_exam/scripts/map.js`, replace the placeholder for `Maps_API_KEY` with your actual Google Maps API Key:
      ```javascript
      // In map.js
      const Maps_API_KEY = "YOUR_Maps_API_KEY_HERE";
      ```

5.  **Running the Application:**
    - **Start the Backend Server (for Chatbot):**
      Open a terminal in the `frontend_exam` directory and run:
      ```bash
      npm start
      ```
      This should start the Node.js/Express server `http://localhost:3000` .
    - **Open the Frontend:**
      Open the `index.html` file (or `products.html`, etc.) from the `frontend_exam` folder directly in your web browser (e.g., by double-clicking or using a live server extension if you use one in VS Code). The frontend is configured to talk to the backend at `http://localhost:3000`.

## AI Integration (OpenAI Chatbot)

- **Purpose:** The chatbot, named FRAM, serves as a friendly assistant to help users navigate the site, learn about products and farms, and understand how the service works.
- **Implementation:**
  - The frontend (`scripts/chatbot.js`) captures user messages and sends them to a backend API endpoint (`/api/chat`).
  - The backend (`server.mjs`) receives the message and chat history, constructs a prompt for the OpenAI API (model `gpt-4`), including a detailed system message with a catalog of produce, farm information, and operational guidelines.
  - The system prompt restricts the AI to use only the provided information, enhancing accuracy and safety.
- **Limitations:**
  - The chatbot's knowledge is limited to the information provided in its system prompt (produce list, farm list, site operation details from `produce.json` and `farms.json`).
  - It cannot access real-time data or browse the internet.
  - Its memory is based on the chat history sent with each request.
- **Potential Biases:**
  - The information about produce and farms is provided locally and assumed to be accurate. The AI's responses are shaped by this curated data.
- **Safety and Ethical Considerations:**
  - The system prompt is designed to keep the AI focused on its role as a site assistant and to prevent it from generating off-topic or inappropriate content.
  - Users are informed it's an AI assistant.

## Third-Party API Integration (Google Maps)

- **API Used:** Google Maps JavaScript API & Places Library.
- **Purpose:** To visually display the locations of partnering farms on the `products.html` page, enhancing user understanding of where produce is sourced.
- **Implementation:**
  - `scripts/map.js` initializes the map, fetches farm coordinates and details from `json/farms.json`.
  - It creates markers for each farm.
  - On marker click, an InfoWindow displays initial farm details. If a `place_id` is available, it fetches additional details (like photos, updated ratings, website) from the Google Places service to enrich the InfoWindow content.
  - Asynchronous calls (`async/await`) are used for fetching farm data and for the Google Maps API loading. Error handling is included for the farm data fetch and PlacesService calls.

## Accessibility (WCAG 2.1 Level AA)

- Semantic HTML structure is used throughout the site.
- ARIA attributes (`aria-label`, `aria-modal`, etc.) are used for elements like icon buttons and dialogs to improve screen reader compatibility (e.g., in `index.html`, `chatbot.js`).
- Interactive elements are designed to be keyboard navigable (e.g., using native `<button>` and `<a>` elements).
- Images include descriptive `alt` attributes (e.g., in `index.html`, `produce.js`).
- Form inputs in the newsletter have placeholder text.
- Focus indicators are managed by browser defaults, but custom focus styles could be an enhancement.
- Color contrast considerations are guided by the provided figma design.

## Performance

- Images on the landing page use `loading="lazy"` to improve initial load time.
- External libraries like Swiper are loaded via CDN.
- JavaScript files are linked at the end of the `<body>`.

## Development Process

The project was developed iteratively, with an early phase focused on establishing a solid foundational structure and UI, followed by the implementation of core functionality and integrations, and then continuous improvements and refactoring.

Initial Setup and Basic UI Implementation (Early April 2025):

The process began with a "skeleton" for the project, focusing on fundamental HTML and CSS structure. This included early attempts at section-based work and experimenting with CSS classes for better readability and reusability.
Core UI and Navigation (May 2025 – Early May):

Development progressed with modularizing CSS stylesheets, implementing core sections like "Popular Produce" and "Footer" with their respective behaviors, and enhancing the navigation menu with a dropdown function.
Emphasis was placed on a mobile-first architecture and organizing CSS to ensure responsive design from the outset.
Dynamic Content and External Integrations (Mid-May 2025):

Key features such as dynamic product rendering and shopping cart synchronization were implemented, along with general UI improvements.
Google Maps was integrated to display farm locations, and handling of environment variables for API keys was set up.
Work on responsive design and image handling, including .env file tracking, was also addressed.
A server setup for backend functionality was introduced.
Chatbot Integration and Carousel Functionality (Late May 2025):

Chatbot functionality was implemented, including a chat widget, styling, and removal of old chat page links. Server functionality with OpenAI integration was added to power the chatbot.
Popular products were implemented with Swiper.js for carousel display, with adjustments to adhere to design specifications.
Further CSS refactoring and polishing of the footer were carried out.
Improvements and Features (June 2025):

The checkout page structure and styling were implemented.
Shopping cart implementation was improved with a focus on layout and interaction controls, including dynamic updates and history management in localStorage.
The chatbot's UI and functionality were enhanced with better history management and simplification of static file serving.
Partnering farms data was added to chat responses.
The checkout layout was refactored and unused utilities were removed.
Finally, configuration and source files for the project were removed.
This process demonstrates clear progress from initial setup and design to the implementation of complex features such as the shopping cart, map, and AI chatbot, with a continuous focus on responsiveness and user experience.

## Challenges Faced & Solutions

A big challenge for me was the chatbot dialog styling, I could not make the messages scrollable and it took alot of time, effort, guidance and help to figure it out. I tried solutions given by teacher and friends working with web development, tried chatgpt, google gemini and so on. In the end I stumbled on the solution:

```
"/* “Spacer” that sits above every real message and grows,
forcing the real messages against the bottom of #chatBox */
#chatBox::before {
content: "";
flex: 1 1 auto;
}"
```

the solution was given by chatgpt, but with several different prompts.

## Resources Used

- MDN Web Docs (for HTML, CSS, JavaScript reference)
- OpenAI API Documentation
- Google Maps Platform Documentation
- Stack Overflow (for specific troubleshooting)
- Swiper.js Documentation
- figma file : AI Integrated Web Development (students)
- chatgpt
- gemini

## Future Improvements

- Implement a full checkout process with payment integration.
- Add user accounts and order history.
- More sophisticated client-side form validation with custom error styling.

## Author

- Lars Jørgen Solerød

---

```

```
