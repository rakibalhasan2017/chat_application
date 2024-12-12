import React from 'react';
import Navbar from '../components/Navbar';
import { usechatstore } from '../stores/usechatstore';
import Sidebar from '../components/Sidebar';
import Nochatselected from '../components/Nochatselected';
import Chatcontainer from '../components/Chatcontainer'; // Import your ChatContainer component
import './Homepage.css';

const Homepage = () => {
  const { selecteduser } = usechatstore();
  return (
    <div className="homepage-container">
      <Navbar />
      <div className="main-content">
        {/* Sidebar on the left */}
        <div className="sidebar">
          <Sidebar />
        </div>

        {/* Chat or NoChatSelected component on the right */}
        <div className="chat-container">
          {selecteduser ? <Chatcontainer /> : <Nochatselected />}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
