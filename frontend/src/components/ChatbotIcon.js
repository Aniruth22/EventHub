import React from 'react';
import { FaComments } from 'react-icons/fa';

// ✅ The component now receives the 'onToggleChat' function as a prop
const ChatbotIcon = ({ onToggleChat }) => {
  return (
    <div className="chatbot-icon-container">
      <div className="chatbot-icon" onClick={onToggleChat}> {/* Call the function on click */}
        <FaComments />
      </div>
    </div>
  );
};

export default ChatbotIcon;