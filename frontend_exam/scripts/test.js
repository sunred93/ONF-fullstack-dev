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
  const originalSendButtonHTML = sendButton.innerHTML;
  const chatHistory = [];
  const backendApiConfig = {
    chatEndpoint: "http://localhost:3000/api/chat",
  };

  function scrollToChatBottom() {
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
  // creates message elements
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

    messageContainer.appendChild(label);
    messageContainer.appendChild(bubble);

    bubble.textContent = text;

    chatBox.appendChild(messageContainer);
    scrollToChatBottom();
    return messageContainer;
  }

  function openChatDialogWithGreeting() {
    if (dialog && !dialog.open) {
      dialog.showModal();
      if (chatBox && chatBox.children.length === 0) {
        const thinkingBubble = chatMessageElement("bot", "●●●", true);
        setTimeout(() => {
          if (thinkingBubble) thinkingBubble.remove();
          chatMessageElement(
            "bot",
            "Welcome to Fram, I am your chat-bot assistant. How may I help you?",
            false
          );
        }, 1000);
      }
    }
  }

  function closeChatDialogWindow() {
    if (dialog && dialog.open) {
      dialog.close();
    }
  }

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
        } catch (e) {}
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

  async function userMessageSubmission() {
    const userMessageText = userInput.value.trim();
    if (!userMessageText) return;
    chatMessageElement("user", userMessageText);
    userInput.value = "";
    const thinkingBubble = chatMessageElement("chat-bot", "●●●", true);
    try {
      const botReplyText = await fetchReplyFromBackend(
        userMessageText,
        chatHistory
      );
      chatHistory.push({ role: "user", content: userMessageText });
      chatHistory.push({ role: "assistant", content: botReplyText });
      if (thinkingBubble) thinkingBubble.remove();
      chatMessageElement("bot", botReplyText, false);
    } catch (error) {
      if (thinkingBubble) thinkingBubble.remove();
      chatMessageElement(
        "bot",
        `Sorry, an error occurred: ${error.message}. Please try again.`,
        false
      );
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
