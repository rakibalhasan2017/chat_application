import { create } from "zustand";
import axios from "axios";
import { io } from "socket.io-client";

export const useauthstore = create((set, get) => ({
  issigningup: false,
  isloggingin: false,
  loggedinuser: null,
  socket:null,

  // loggedinuser: JSON.parse(localStorage.getItem("loggedinuser")) || null,
  login: async (data) => {
    set({ isloggingin: true });
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/login`,
        data,
        { withCredentials: true }
      );
      set({ isloggingin: false });
      get().connectsocket(response.data);
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
    const response = await axios.post(`http://localhost:5000/api/auth/logout`, {}, {
      withCredentials: true,
    }); 
    get().disconnectsocket();
    return response;
  },

  setloggedinuser: (user) => {
    // console.log("from the setloggedinuser", user);
    localStorage.setItem("loggedinuser", JSON.stringify(user)); // Save to localStorage
    set({ loggedinuser: user });
  },

  clearloggedinuser: () => {
    localStorage.removeItem("loggedinuser"); // Remove from localStorage
    set({ loggedinuser: null });
  },
  
  connectsocket: (user) => {
    const { socket } = get();
    if (socket?.connected) return;  // Prevent reconnecting if already connected
    const socketInstance = io("http://localhost:5000", {
      query: { userId: user.id }, // Pass user data to server if needed
    });
    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);  // Check if connected
      set({ socket: socketInstance });
      console.log(socketInstance);
    });
  },

  disconnectsocket: () => {
    console.log("Disconnecting from socket");
    if (get().socket?.connected) get().socket.disconnect();
  },

  // disconnectsocket: () => {
  //   const { socket } = get();
  //   if (socket?.connected) {
  //     socket.disconnect();
  //     set({ socket: null });
  //     console.log("Disconnected from socket");
  //   }
  // }

}));
