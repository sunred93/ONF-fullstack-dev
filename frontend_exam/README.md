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

## Setup Instructions

1.  **Prerequisites:**

    - Node.js and npm (or yarn) installed.
    - Git installed.
    - An OpenAI API Key.
    - A Google Maps API Key (ensure it's configured for the Maps JavaScript API and Places API).

2.  **Clone the Repository:**

    ```bash
    git clone https://github.com/sunred93/ONF-fullstack-dev/tree/frontend-exam
    cd <your-project-directory>/frontend_exam
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
      This should start the Node.js/Express server (typically on `http://localhost:3000` as per your `server.mjs`).
    - **Open the Frontend:**
      Open the `index.html` file (or `products.html`, etc.) from the `frontend_exam` folder directly in your web browser (e.g., by double-clicking or using a live server extension if you use one in VS Code). The frontend is configured to talk to the backend at `http://localhost:3000`.

## Usage Guide

(Explain how to use the main features of your website.)

- **Navigating the Site:** Explain the header, navigation menu, and footer.
- **Browse Products:** How to find products on the landing page and product page.
- **Using the Shopping Cart:** How to add items, view the cart dropdown, adjust quantities, remove items, and proceed to checkout.
- **Interacting with the Chatbot:** How to open the chat, ask questions about produce, farms, or how the site works.
- **Using the Map:** How to view farm locations and details on the product page.
- **Newsletter Subscription:** How to subscribe.

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
  - (Consider if any information source for the AI could have biases. For this project, it's mainly factual data you provide, so direct bias might be low, but it's good to mention you've considered it.) Example: "The information about produce and farms is provided locally and assumed to be accurate. The AI's responses are shaped by this curated data."
- **Safety and Ethical Considerations:**
  - The system prompt is designed to keep the AI focused on its role as a site assistant and to prevent it from generating off-topic or inappropriate content.
  - Users are informed it's an AI assistant.
  - No sensitive personal information is explicitly requested or stored beyond the chat history for the session (if you implement session history beyond what's sent per request).

## Third-Party API Integration (Google Maps)

- **API Used:** Google Maps JavaScript API & Places Library.
- **Purpose:** To visually display the locations of partnering farms on the `products.html` page, enhancing user understanding of where produce is sourced.
- **Implementation:**
  - `scripts/map.js` initializes the map, fetches farm coordinates and details from `json/farms.json`.
  - It creates markers for each farm.
  - On marker click, an InfoWindow displays initial farm details. If a `place_id` is available, it fetches additional details (like photos, updated ratings, website) from the Google Places service to enrich the InfoWindow content.
  - Asynchronous calls (`async/await`) are used for fetching farm data and for the Google Maps API loading. Error handling is included for the farm data fetch and PlacesService calls.

## Accessibility (WCAG 2.1 Level AA)

(Briefly mention key accessibility features implemented. You've already been working on this.)

- Semantic HTML structure is used throughout the site.
- ARIA attributes (`aria-label`, `aria-modal`, etc.) are used for elements like icon buttons and dialogs to improve screen reader compatibility (e.g., in `index.html`, `chatbot.js`).
- Interactive elements are designed to be keyboard navigable (e.g., using native `<button>` and `<a>` elements).
- Images include descriptive `alt` attributes (e.g., in `index.html`, `produce.js`).
- Form inputs in the newsletter have placeholder text, and efforts are made to ensure they are understandable (consider adding explicit `<label>` tags or `aria-label` where placeholders are the only visual cue).
- Focus indicators are managed by browser defaults, but custom focus styles could be an enhancement.
- Color contrast considerations are guided by the provided design tokens in `css/base.css`.

## Performance

- Images on the landing page use `loading="lazy"` to improve initial load time.
- External libraries like Swiper are loaded via CDN.
- JavaScript files are linked at the end of the `<body>`.
- (Mention any other specific optimizations you've made or plan to make. Note that Lighthouse testing is recommended by the requirements.)

## Development Process

(Write a short narrative about your development journey. This is personal to your experience.)

- Example: "The project was developed iteratively, starting with the main page structure and styling, followed by JavaScript functionality for the menu, cart, and dynamic content like the produce slider. The chatbot integration involved setting up a Node.js/Express backend and then connecting the frontend. The Google Maps API was added to enhance the product/farm information..."
- Mention your branching strategy if you used one (e.g., feature branches).

## Challenges Faced & Solutions

(Describe 1-2 significant challenges and how you overcame them.)

- Example Challenge 1: "Ensuring the chatbot dialog was fully responsive and correctly positioned below the sticky header on mobile required careful CSS adjustments, particularly with `position: fixed`, `height: calc(100vh - headerHeight)`, and managing padding between the dialog and its inner content container."
- Example Challenge 2: "Integrating Google Maps with dynamic data from `farms.json` and then enriching it with the Places API involved handling asynchronous operations carefully and managing API key security considerations."

## Resources Used

(List any significant external resources, tutorials, documentation, or tools that helped you learn or solve problems.)

- MDN Web Docs (for HTML, CSS, JavaScript reference)
- OpenAI API Documentation
- Google Maps Platform Documentation
- Stack Overflow (for specific troubleshooting)
- Swiper.js Documentation
- (Any specific articles, tutorials, or tools like Figma, Lighthouse)
- (Your course materials/teacher for guidance)

## Future Improvements (Optional)

(If you have ideas for what you'd do next if you had more time.)

- Example: Implement a full checkout process with payment integration.
- Example: Add user accounts and order history.
- Example: More sophisticated client-side form validation with custom error styling.
- Example: Unit/integration tests for JavaScript modules.

## Author

- Your Name

---
