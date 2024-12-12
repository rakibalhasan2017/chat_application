import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';
import './Chatinput.css';
import { usechatstore } from '../stores/usechatstore';

const Chatinput = () => {
   
 const {selecteduser,sendmessage, messages} = usechatstore();
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      sendmessage({ text: message, image });
    }
    catch (error) {
      console.log("Error happened to send the message from frontend");
      console.log(error.message);
    }
    setMessage('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
        <FaPaperclip />
      </form>
    </div>
  );
};

export default Chatinput;
