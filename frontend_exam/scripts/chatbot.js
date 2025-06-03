// Initalizes the chatbot functionality, sets up all necessary variables, -
// DOM element references, helper functions and event listeners.
function initChat() {
  const dialog = document.getElementById("chatbot");

  if (!dialog) {
    console.log(
      "Chatbot dialog not found on this page. Chat will not initialize."
    );
    return;
  }

  console.log("Chatbot dialog found, initializing...");

  const chatToggle = document.getElementById("chat-toggle");
  const chatbutton = document.getElementById("chat");
  const chatMenuItem = document.getElementById("chatMenuItem");
  const chatBox = document.getElementById("chatBox");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");
  const closeChatDialogBtn = document.getElementById("closeChatDialogBtn");
  const originalSendButtonHTML = sendButton.innerHTML;

  let chatHistory = getChatHistoryFromLocalStorage();

  const backendApiConfig = {
    chatEndpoint: "http://localhost:3000/api/chat",
  };

  function getChatHistoryFromLocalStorage() {
    const history = localStorage.getItem("chatHistory");
    return history ? JSON.parse(history) : [];
  }

  function saveChatHistoryToLocalStorage() {
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }

  function scrollToChatBottom() {
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
  //creates and appends a new chat message element to the chat box
  //styles the messages based on the sender, (user or bot)
  //displays a thinkinstate for bot messages and disables the send button
  function chatMessageElement(sender, text, thinking = false) {
    if (!chatBox) return null;
    const messageContainer = document.createElement("div");
    const bubble = document.createElement("div");
    const label = document.createElement("div");
    label.classList.add("chat-label");
    messageContainer.classList.add("msg-container");
    bubble.classList.add("chat-bubble");

    if (sender === "user") {
      messageContainer.classList.add("chat-user");
      bubble.classList.add("user");
    } else {
      messageContainer.classList.add("chat-bot");
      bubble.classList.add("chat-bot");
      label.textContent = "FRAM";

      if (sendButton) {
        if (thinking) {
          bubble.classList.add("thinking");
          sendButton.innerHTML = "✕";
          sendButton.disabled = true;
        } else {
          sendButton.innerHTML = originalSendButtonHTML;
          sendButton.disabled = false;
        }
      }
    }
    // assembles the message
    messageContainer.appendChild(label);
    messageContainer.appendChild(bubble);
    bubble.textContent = text;
    //displays the message
    chatBox.appendChild(messageContainer);
    scrollToChatBottom();
    return messageContainer;
  }

  function loadAndDisplayChatHistory() {
    if (chatBox.children.length === 0 && chatHistory.length > 0) {
      chatHistory.forEach((message) => {
        const role = message.role === "assistant" ? "bot" : message.role;
        chatMessageElement(role, message.content, false);
      });
    }
  }

  function openChatDialogWithGreeting() {
    if (dialog && !dialog.open) {
      dialog.showModal();

      if (chatBox.children.length === 0) {
        loadAndDisplayChatHistory();
      }

      if (chatBox.children.length === 0) {
        const thinkingBubble = chatMessageElement("bot", "●●●", true);
        setTimeout(() => {
          if (thinkingBubble) thinkingBubble.remove();
          const welcomeMessage =
            "Welcome to Fram, I am your chat-bot assistant. How may I help you?";
          chatMessageElement("bot", welcomeMessage, false);

          //push to local storage the "welcome message" if empty
          if (
            // checking if "some" element meets the criteria
            !chatHistory.some(
              (m) => m.content === welcomeMessage && m.role === "assistant"
            )
          ) {
            chatHistory.push({ role: "assistant", content: welcomeMessage });
            saveChatHistoryToLocalStorage();
          }
        }, 1000);
      }
    }
  }

  function closeChatDialogWindow() {
    if (dialog && dialog.open) {
      dialog.close();
    }
  }
  // Sends the user's current message and chat history to the backend API,
  // and fetches a response from the AI service.
  async function fetchReplyFromBackend(currentMessage, historyContext) {
    const payload = {
      message: currentMessage,
      chatHistory: historyContext,
    };
    try {
      const response = await fetch(backendApiConfig.chatEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        let errorMsg = `Backend Error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorData.message || errorMsg;
        } catch (e) {
          /* Silently ignore error from parsing the error response; main HTTP error is already captured. */
        }
        throw new Error(errorMsg);
      }
      const data = await response.json();
      if (data.reply) return data.reply.trim();
      throw new Error("Invalid response from backend.");
    } catch (error) {
      console.error("Error fetching from backend:", error);
      throw error;
    }
  }
  // Handles the submission of a user's message.
  //It displays the user's message, sends it to the backend (along with chat history),-
  // - displays the bot's reply, and manages chat history including saving to local storage.
  async function userMessageSubmission() {
    const userMessageText = userInput.value.trim();
    if (!userMessageText) return;

    chatMessageElement("user", userMessageText);
    chatHistory.push({ role: "user", content: userMessageText });
    saveChatHistoryToLocalStorage();

    userInput.value = "";
    const thinkingBubble = chatMessageElement("chat-bot", "●●●", true);
    try {
      const botReplyText = await fetchReplyFromBackend(
        userMessageText,
        chatHistory.slice(0, -1) // userMessageText already an argument, therefore slice newest message.
      );
      chatHistory.push({ role: "assistant", content: botReplyText });
      saveChatHistoryToLocalStorage();

      if (thinkingBubble) thinkingBubble.remove();
      chatMessageElement("bot", botReplyText, false);
    } catch (error) {
      if (thinkingBubble) thinkingBubble.remove();
      chatMessageElement(
        "bot",
        `Sorry, an error occurred: ${error.message}. Please try again.`,
        false
      );

      chatHistory.pop(); // if backend fails, removes new message
      saveChatHistoryToLocalStorage();
    }
  }

  function onChatToggleClick() {
    if (dialog.open) {
      closeChatDialogWindow();
    } else {
      openChatDialogWithGreeting();
    }
  }

  function onSendButtonClick() {
    userMessageSubmission();
  }

  function onUserInputKeydown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      userMessageSubmission();
    }
  }

  function onDocumentClickToCloseDialog(event) {
    if (dialog.open && event.target === dialog) {
      closeChatDialogWindow();
    }
  }

  function attachChatEventListeners() {
    if (chatToggle) {
      chatToggle.addEventListener("click", onChatToggleClick);
    }
    if (chatbutton) {
      chatbutton.addEventListener("click", onChatToggleClick);
    }
    if (chatMenuItem) {
      chatMenuItem.addEventListener("click", onChatToggleClick);
    }
    if (closeChatDialogBtn) {
      closeChatDialogBtn.addEventListener("click", closeChatDialogWindow);
    }

    if (sendButton && userInput) {
      sendButton.addEventListener("click", onSendButtonClick);
      userInput.addEventListener("keydown", onUserInputKeydown);
    }
    document.addEventListener("click", onDocumentClickToCloseDialog);
  }

  attachChatEventListeners();
} // End of initChat

// --- Start the application ---
document.addEventListener("DOMContentLoaded", initChat);
