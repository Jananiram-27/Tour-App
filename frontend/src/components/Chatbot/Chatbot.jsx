import React, { useState } from 'react';
import '../../styles/chatbot.css'; 

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Travel Buddy 🤖. Ask me about trips!", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Message Anuppum Logic
  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. User Message Add panrom
    const userMsg = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // 2. Backend kitta pesurom
      const res = await fetch("https://tour-app-backend-cc7h.onrender.com/api/v1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: userMsg.text }),
      });

      const data = await res.json();

      // 3. AI Response Add panrom
      const aiMsg = { text: data.message, sender: "ai" };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg = { text: "Oops! Something went wrong.", sender: "ai" };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button className="chat-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <i className="ri-close-line"></i> : <i className="ri-robot-2-line"></i>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h5>Travel Buddy 🤖</h5>
            <span onClick={() => setIsOpen(false)} style={{cursor:'pointer'}}><i className="ri-close-line"></i></span>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === 'user' ? 'user-msg' : 'ai-msg'}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="message ai-msg">Thinking... 🤔</div>}
          </div>

          <div className="chat-footer">
            <input 
              type="text" 
              placeholder="Ask about trips..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}><i className="ri-send-plane-fill"></i></button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;