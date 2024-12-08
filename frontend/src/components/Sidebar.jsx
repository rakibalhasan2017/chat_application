import React, { useEffect } from 'react';
import { usechatstore } from '../stores/usechatstore';
import Spinner from './Spinner';
import './sidebar.css';

const Sidebar = () => {
  const { users, selecteduser, getuser, isuserloading, setselecteduser } = usechatstore();

  // Fetch all users when the component is mounted
  useEffect(() => {
    getuser();
  }, [getuser]);

  if (isuserloading) {
    return <Spinner />;
  }

  // Handle selecting a user to start a conversation
  const handleUserClick = (user) => {
    setselecteduser(user); // Assuming selectUser is the function for setting the selected user
  };

  return (
    <div className="sidebar-container">
      <h4 className="sidebar-header">Users</h4>
      <div className="user-list">
        {users.length === 0 ? (
          <p>No users available</p>
        ) : (
          users.map((user, index) => (
            <div
              key={index} // Using index if _id is not available for now
              className={`user-item ${selecteduser?._id === user._id ? 'selected' : ''}`}
              onClick={() => handleUserClick(user)}
            >
              {/* Profile Image */}
              <div className="user-image-container">
                {user.profilepic ? (
                  <img
                    src={user.profilepic} // If it's Cloudinary URL or base64, this works
                    alt={user.fullname}
                    className="user-image"
                  />
                ) : (
                  <div className="default-avatar"> 
                  {/* If no profile picture, show default image */}
                  <img 
                    src="/avatar.png" // Path to the default image in the public folder
                    alt="Default Avatar" 
                    className="user-image"
                  />
                </div>
                )}
              </div>

              {/* User's Full Name */}
              <p className="user-name">{user.fullname}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
