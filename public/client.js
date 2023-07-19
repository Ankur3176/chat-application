document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    sendButton.addEventListener("click", () => {
        const message = messageInput.value;
        if (message.trim() !== "") {
            socket.emit("chatMessage", message);
            messageInput.value = "";
        }
    });

    socket.on("chatMessage", (data) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");

        const senderElement = document.createElement("span");
        senderElement.classList.add("sender");
        senderElement.innerText = data.sender;

        const messageContentElement = document.createElement("span");
        messageContentElement.classList.add("message-content");
        messageContentElement.innerText = data.message;

        messageElement.appendChild(senderElement);
        messageElement.appendChild(messageContentElement);

        chatMessages.appendChild(messageElement);

        // Scroll to the bottom of the chat messages
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
});
