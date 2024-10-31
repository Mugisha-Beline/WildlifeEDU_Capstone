// src/pages/Settings.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth'; // Firebase Authentication
import { auth, db } from './Firebase'; // Import db instead of firestore
import { doc, updateDoc } from 'firebase/firestore'; // Firestore methods
import './Home.css';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [profilePicture, setProfilePicture] = useState('/profile.jpg');
  const [name, setName] = useState('John Doe');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState(''); // To display success message

  const user = auth.currentUser; // Get the current logged-in user

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Reference to the Firestore user document
      const userDoc = doc(db, 'users', user.uid);

      // Update Firestore with name and notification preferences
      await updateDoc(userDoc, {
        name: name,
        emailNotifications: emailNotifications,
        profilePicture: profilePicture,
      });

      // Show success message after saving
      setMessage('Your changes have been saved successfully.');
    } catch (error) {
      alert('Error saving changes: ' + error.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match!');
      return;
    }

    try {
      // Re-authenticate the user before changing password
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      // Update the password in Firebase Authentication
      await updatePassword(user, newPassword);
      setMessage('Your password has been changed successfully.');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="settingspage">
      <div className="settings-page">
        {/* Sidebar / Toggle menu for small screens */}
        <aside className="sidebar">
          <ul className="profile-info">
            <div className="profile-image-container">
              <img src={profilePicture} alt="profile" className="profile-image" />
            </div>
          </ul>
          <ul className="menu-options">
            <li onClick={() => setActiveTab('account')} className={activeTab === 'account' ? 'active' : ''}>
              Account Settings
            </li>
            <li onClick={() => setActiveTab('notifications')} className={activeTab === 'notifications' ? 'active' : ''}>
              Notifications
            </li>
            <li onClick={() => setActiveTab('password')} className={activeTab === 'password' ? 'active' : ''}>
              Change Password
            </li>
          </ul>  
          <Link to="/courses" className="cta-button">Courses</Link>
        </aside>

        {/* Main content for settings */}
        <main className="settings-content">
          {activeTab === 'account' && (
            <div className="account-settings">
              <h1>Account Settings</h1>
              <div className="setting-item">
                <label htmlFor="profilePicture">Profile Picture</label>
                <input type="file" id="profilePicture" accept="image/*" onChange={handleProfilePictureChange} />
                <img src={profilePicture} alt="profile" className="profile-image-preview" />
              </div>
              <div className="setting-item">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="notification-settings">
              <h1>Email Notifications</h1>
              <div className="setting-item">
                <label>
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                  Receive notifications via email
                </label>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="password-settings">
              <h1>Change Password</h1>
              <form onSubmit={handlePasswordChange}>
                <div className="setting-item">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter old password"
                    required
                  />
                </div>
                <div className="setting-item">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div className="setting-item">
                  <label htmlFor="confirmNewPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                  />
                </div>
              </form>
            </div>
          )}

          <div className="settings-actions">
            <button className="save-button" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
          {message && <div className="notification-message">{message}</div>}
        </main>
      </div>
    </div>
  );
};

export default Settings;
