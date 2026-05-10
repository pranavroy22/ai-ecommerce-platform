import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi 👋 I'm your AI shopping assistant!",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // 🔥 AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await API.post("/ai/chat", {
        message,
      });

      const data = res.data;

      const aiMessage = {
        sender: "ai",
        text: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong ❌",
        },
      ]);
    }

    setLoading(false);

    setMessage("");
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <button className="chatbot-toggle" onClick={() => setOpen(!open)}>
        🤖
      </button>

      {/* CHATBOX */}
      {open && (
        <div className="chatbot-container">
          <div className="chatbot-header">AI Shopping Assistant</div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user" ? "message user" : "message ai"
                }
              >
                {msg.text}
              </div>
            ))}

            {loading && <div className="message ai">Typing...</div>}

            {/* 🔥 AUTO SCROLL TARGET */}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              // 🔥 ENTER SUPPORT
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
