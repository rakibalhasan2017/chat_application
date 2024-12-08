import React from 'react';
import { MessageSquare } from 'lucide-react'; // Optional icon for visual appeal

const nochatselected = () => {
  return (
    <div className="no-chat-selected-container">
      <div className="no-chat-selected-content">
        <div className="no-chat-icon">
          <MessageSquare className="no-chat-icon-svg" />
        </div>
        <h2 className="no-chat-title">Welcome to Chatty!</h2>
        <p className="no-chat-subtitle">
          Select a user from the sidebar to start chatting.
        </p>
      </div>
    </div>
  );
};

export default nochatselected;
