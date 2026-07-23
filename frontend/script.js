const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

chatBox.innerHTML = "";

addMessage("👋 Hello! I'm StudyBuddy AI. Ask me anything!", "ai");

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    addMessage(text, "user");

    input.value = "";

    addMessage("🤖 Thinking...", "ai");

    try {

        const response = await fetch("https://study-buddy-ai-q2oe.onrender.com/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                prompt: text
            })

        });

        const data = await response.json();

        chatBox.lastChild.remove();

        addMessage(data.answer, "ai");

    }

    catch (error) {

        chatBox.lastChild.remove();

        addMessage("❌ Error connecting to server.", "ai");

        console.error(error);

    }

}

function addMessage(text, sender) {

    const div = document.createElement("div");

    div.className = `message ${sender}`;

    if (sender === "ai") {
        div.innerHTML = marked.parse(text);
    } else {
        div.textContent = text;
    }

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

}