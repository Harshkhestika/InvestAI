import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import API from '../services/api';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchHistory = async () => {
    try {
      const { data } = await API.get('/ai/chat-history');
      setMessages(data);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { question: userMessage, answer: '' }]); // optimistic update
    setInput('');
    setLoading(true);

    try {
      const { data } = await API.post('/ai/chat', { question: userMessage });
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].answer = data.answer;
        return newMsgs;
      });
    } catch (error) {
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].answer = "Sorry, I couldn't process that request.";
        return newMsgs;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="AI Investment Assistant">
      <div className="chat-container glass-panel">
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="flex-center" style={{ height: '100%', color: 'var(--text-secondary)' }}>
              Ask me anything about stocks, companies, or your portfolio!
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className="chat-pair">
              <div className="message user-message">
                <div className="message-bubble">{msg.question}</div>
              </div>
              {msg.answer && (
                <div className="message ai-message">
                  <div className="message-bubble text-gradient-bg">
                    {msg.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="message ai-message">
              <div className="message-bubble loading-dots">Thinking...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        <form onSubmit={handleSend} className="chat-input-area border-t">
          <input 
            type="text" 
            className="input-field" 
            placeholder="E.g. Should I invest in Infosys?" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="btn-primary" disabled={loading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default ChatAssistant;
