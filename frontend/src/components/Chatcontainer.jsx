import React, { useEffect } from "react";
import { usechatstore } from "../stores/usechatstore";
import Spinner from "./Spinner";
import Chatheader from "./Chatheader.jsx";
import Chatinput from "./Chatinput.jsx";
import { useauthstore } from "../stores/useauthstore.jsx";

const Chatcontainer = () => {
  const {socket} = useauthstore();
  const { messages, getmessage, selecteduser, ismesageloading, subscribeToMessages, unsubscribefrommessage } = usechatstore();
  const {loggedinuser} = useauthstore();
  //  console.log("loggined user from chat container", loggedinuser);
  useEffect(() => {
    if (selecteduser) {
      getmessage(selecteduser._id);
      console.log(socket?.connected);
      if (socket?.connected) {
        console.log("vitore dhuksii tow");
        subscribeToMessages();
      }
      return () => unsubscribefrommessage();
    }
  }, [selecteduser, getmessage, subscribeToMessages, unsubscribefrommessage]);

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
       flexDirection: message.sender === loggedinuser.id ? "row-reverse" : "row",
      marginBottom: "15px",
      alignItems: "flex-start",
    }}
  >
    {/* User Avatar */}
    <div style={{ marginLeft: message.sender === loggedinuser.id ? "10px" : "0", marginRight: message.senderId !== loggedinuser._id ? "10px" : "0" }}>
      <img
        src={
          message.sender === loggedinuser.id
            ? loggedinuser.profilepic || "/avatar.png"
            : selecteduser.profilepic || "/avatar.png"
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
        backgroundColor: message.sender === loggedinuser.id ? "#0066cc" : "#e5e5e5",
        color: message.sender === loggedinuser.id ? "#fff" : "#000",
        borderRadius: "20px",
        padding: "10px 15px",
        maxWidth: "70%",
        wordWrap: "break-word",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: message.sender === loggedinuser.id ? "flex-end" : "flex-start",
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
