import { create } from "zustand";
import axios from "axios";

export const useauthstore = create((set, get) => ({
  issigningup: false,
  isloggingin: false,
//   loggedinuser:null,
  loggedinuser: JSON.parse(localStorage.getItem("loggedinuser")) || null,
  login: async (data) => {
    set({ isloggingin: true });
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/login`,
        data,
        { withCredentials: true }
      );
      set({ isloggingin: false });
      return response.data;
    } catch (error) {
      console.log(error.message);
      set({ isloggingin: false });
      alert("Login error happened, check console");
    }
  },

  signup: async (data) => {
    set({ issigningup: true });
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/signup`,
        data,
        { withCredentials: true }
      );
      set({ issigningup: false });
      return response.data;
    } catch (error) {
      console.log(error.message);
      set({ issigningup: false });
      alert("Registration error happened, check console");
    }
  },

  logout: async () => {
    return await axios.post(`http://localhost:5000/api/auth/logout`, {}, {
      withCredentials: true,
    });
  },

  setloggedinuser: (user) => {
    console.log("from the setloggedinuser", user);
    localStorage.setItem("loggedinuser", JSON.stringify(user)); // Save to localStorage
    set({ loggedinuser: user });
  },

  clearloggedinuser: () => {
    localStorage.removeItem("loggedinuser"); // Remove from localStorage
    set({ loggedinuser: null });
  },
}));
