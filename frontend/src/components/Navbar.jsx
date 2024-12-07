import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import axios from "axios";

const Navbar =  () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true } );

      if (response.status === 200) {
        Cookies.remove("jwt");
        navigate("/login");
      }else {
        console.log("Logout failed:", await response.json());
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
      alert("Logout error happened, check console");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        {/* You can add a logo or other content here if needed */}
      </div>
      <div style={styles.menuContainer}>
        <ul style={styles.menu}>
          <li style={styles.menuItem}>
            <Link to="/setting" style={styles.link}>Settings</Link>
          </li>
          <li style={styles.menuItem}>
            <Link to="#" onClick={handleLogout} style={styles.logoutLink}>Logout</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Simple CSS for the navbar (optional)
const styles = {
  navbar: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  navContent: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  menuContainer: {
    display: "flex",
    justifyContent: "flex-end", // Align items to the right
    alignItems: "center",
  },
  menu: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    marginRight: "20px",
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
  },
  logoutLink: {
    color: "#fff", // same color as settings
    textDecoration: "none", // remove underline
    fontSize: "16px", // same font size as settings
    cursor: "pointer", // pointer cursor for interaction
    padding: "8px 16px", // padding to make it look like a button
    backgroundColor: "#f44336", // red background to indicate logout
    borderRadius: "4px", // rounded corners
    transition: "background-color 0.3s ease", // smooth hover transition
  },
};

export default Navbar;