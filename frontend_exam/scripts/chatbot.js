document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chat-toggle");
  const dialog = document.getElementById("chatbot");
  const input = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");
  const chatBox = document.getElementById("chatBox");
  const originalHTML = sendBtn.innerHTML;
  const history = []; // each item is { role: 'user' | 'assistant', content: string }

  // Chat bubble generator
  function appendMessage(sender, text, thinking = false) {
    const msgContainer = document.createElement("div");
    const label = document.createElement("div");
    const bubble = document.createElement("div");

    label.className = "chat-label";
    bubble.className = "chat-bubble";
    msgContainer.className = "msg-container";

    if (sender === "user") {
      label.textContent = ""; // No name for user
      bubble.classList.add("chat-user");
      msgContainer.classList.add("chat-user");
    } else {
      label.textContent = "FRAM";
      bubble.classList.add("chat-bot");
      msgContainer.classList.add("chat-bot");
      if (thinking) {
        bubble.classList.add("thinking");
        sendBtn.innerHTML = "✕";
      } else {
        sendBtn.innerHTML = originalHTML;
      }
    }

    bubble.textContent = text;
    msgContainer.appendChild(label);
    msgContainer.appendChild(bubble);
    chatBox.appendChild(msgContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Toggle dialog
  toggleBtn.addEventListener("click", () => {
    if (dialog.open) {
      dialog.close();
    } else {
      dialog.show();

      //check if the chatbox is empty
      if (chatBox.children.length === 0) {
        //if empty - introduce a greeting from the bot.
        appendMessage("bot", "●●●", true);
        const typingBubble = chatBox.lastChild;

        setTimeout(function () {
          typingBubble.remove();
          appendMessage("bot", "Hello! What can I help you with today?");
        }, 2500);
      }
    }
  });

  // Handle send
  sendBtn.addEventListener("click", async () => {
    const message = input.value.trim();
    if (!message) return;

    appendMessage("user", message);
    history.push({ role: "user", content: message });
    input.value = "";

    // Typing indicator
    const typingId = "typing";
    appendMessage("bot", "●●●", true);
    const typingBubble = chatBox.lastChild;

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      // Replace typing indicator
      typingBubble.remove();
      appendMessage("bot", data.reply);
      history.push({ role: "assistant", content: data.reply });
    } catch (err) {
      typingBubble.remove();
      appendMessage("bot", "Sorry, something went wrong.");
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });
  // Close dialog on outside click
  document.addEventListener("click", (e) => {
    // if dialog is open, and the click is neither inside the dialog nor on the toggle button…
    if (
      dialog.open &&
      !dialog.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      dialog.close();
    }
  });
});
