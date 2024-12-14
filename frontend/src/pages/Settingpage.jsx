import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, Mail, User } from 'lucide-react';
import styles from './setting.module.css';

const Settingpage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/user', { withCredentials: true });
        setImage(res.data.profilepic);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      setLoading(true);
      try {
        const res = await axios.put(
          'http://localhost:5000/api/auth/updateprofile',
          { profilepic: base64Image },
          { withCredentials: true }
        );
        setImage(res.data.profilepic);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        alert('Failed to update profile picture');
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Profile</h1>
          <p className={styles.subtitle}>Your profile information</p>
        </div>

        {/* Avatar upload section */}
        <div className={styles.avatarContainer}>
          <div className={styles.avatarWrapper}>
            <img
              src={selectedImage || image || '/avatar.png'}
              alt="Profile"
              className={styles.avatarImage}
            />
            <label htmlFor="avatar-upload" className={styles.uploadLabel}>
              <span className={styles.chooseFileText}>Choose File</span>
              <input
                type="file"
                id="avatar-upload"
                className={styles.fileInput}
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
              />
            </label>
          </div>
        </div>

        {/* Account Information */}
        <div className={styles.accountInfo}>
          <div className={styles.accountItem}>
            <div className={styles.label}>
              <User className={styles.icon} />
              Full Name
            </div>
          </div>

          <div className={styles.accountItem}>
            <div className={styles.label}>
              <Mail className={styles.icon} />
              Email Address
            </div>
          </div>
        </div>

        {/* Account Status and Member Since */}
        <div className={styles.accountStatusContainer}>
          <h2 className={styles.accountStatusTitle}>Account Information</h2>
          <div className={styles.accountStatus}>
            <div className={styles.statusItem}>
              <span>Member Since</span>
            </div>
            <div className={styles.statusItem}>
              <span>Account Status</span>
              <span className={styles.activeStatus}>Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settingpage;
