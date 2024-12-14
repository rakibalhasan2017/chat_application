import React, { useEffect } from "react";
import { usechatstore } from "../stores/usechatstore";
import Spinner from "./Spinner";
import Chatheader from "./Chatheader.jsx";
import Chatinput from "./Chatinput.jsx";


const Chatcontainer = () => {
  const { messages, getmessage, selecteduser, ismesageloading, loggedinuser } = usechatstore();
  console.log("logged in user in the chatcontainer", loggedinuser);
  useEffect(() => {
    if (selecteduser) {
      getmessage(selecteduser._id);
    }
  }, [selecteduser]);

  if (ismesageloading) {
    return <Spinner />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Chat Header */}
      <Chatheader />

      {/* Chat Messages Section */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "scroll",
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Render the messages */}
        {messages.map((message) => (
          <div
            key={message._id}
            style={{
              display: "flex",
              flexDirection: message.senderId === selecteduser._id ? "row" : "row-reverse",
              marginBottom: "15px",
            }}
          >
            {/* User Avatar */}
            <div style={{ marginRight: "10px" }}>
              <img
                src={
                  message.senderId === selecteduser._id
                    ? selecteduser.profilepic || "/avatar.png"
                    : loggedinuser.profilepic || "/avatar.png"
                }
                alt="Profile Pic"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Message Bubble */}
            <div
              style={{
                backgroundColor: message.senderId === selecteduser._id ? "#0066cc" : "#e5e5e5",
                color: message.senderId === selecteduser._id ? "#fff" : "#000",
                borderRadius: "20px",
                padding: "10px 15px",
                maxWidth: "70%",
                wordWrap: "break-word",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {/* Message Text */}
              {message.text && <p style={{ margin: 0 }}>{message.text}</p>}

              {/* Message Image (if any) */}
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                />
              )}

              {/* Timestamp */}
              <span
                style={{
                  marginTop: "5px",
                  fontSize: "12px",
                  color: "rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* {formatMessageTime(message.createdAt)} */}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div style={{ borderTop: "1px solid #ccc", padding: "10px" }}>
        <Chatinput />
      </div>
    </div>
  );
};

export default Chatcontainer;
