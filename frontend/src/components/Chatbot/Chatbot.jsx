import React, { useState } from 'react';
import '../../styles/chatbot.css'; 

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Travel Buddy 🤖. Ask me about trips!", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // ✅ FIX: Added "/chat" to the endpoint
      const res = await fetch("https://tour-app-backend-cc7h.onrender.com/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }), 
      });

      // 404 check panna easy-ah irukkum
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      const aiMsg = { text: data.message, sender: "ai" };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg = { text: "Oops! I'm having trouble connecting to my brain. Check the URL path!", sender: "ai" };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="chat-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <i className="ri-close-line"></i> : <i className="ri-robot-2-line"></i>}
      </button>

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