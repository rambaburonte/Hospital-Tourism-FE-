import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant.' },
  ]);
  const [input, setInput] = useState('');
  const apiKey = '8c96a5633emsh81f9eb3ccc9ee4bp101f55jsnb578364fefb5';
  const apiUrl = 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions';

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setInput('');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': apiKey,
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: input }],
          model: 'gpt-4o',
          max_tokens: 100,
          temperature: 0.9,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('API Response Error:', errorBody);
        throw new Error('Failed to fetch response from the chatbot API');
      }

      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        const botMessage = { role: 'assistant', content: data.choices[0].message.content };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'system', content: 'Error: Unable to fetch a response.' },
      ]);
    }
  };

  return (
    
    <div className="chatbot-container p-6 sm:p-8 rounded-xl shadow-sm bg-gray-50 max-w-2xl mx-auto font-inter">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#3a7e10] mb-4 text-center">
      🩺 HealthCare Virtual Assistant
    </h2>
      <div
        className="chatbot-messages overflow-y-auto h-96 sm:h-[500px] mb-4 border border-gray-200 p-4 rounded-xl bg-gray-50 scroll-smooth"
        aria-live="polite"
      >
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className={`message flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            } mb-2`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <span
              className={`px-4 py-2 rounded-xl border max-w-md transition-colors duration-200 hover:bg-opacity-80 ${
                message.role === 'user'
                  ? 'bg-[#f0f8e8] text-[#3a7e10] border-[#a3e635]'
                  : 'bg-gray-100 text-gray-900 border-gray-200'
              }`}
            >
              {message.content}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="chatbot-input flex items-center gap-4">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-200 rounded-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a3e635] transition-shadow duration-200"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          aria-label="Type your message"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-2 bg-[#499E14] text-white rounded-full hover:bg-[#3a7e10] hover:brightness-105 shadow-sm active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;