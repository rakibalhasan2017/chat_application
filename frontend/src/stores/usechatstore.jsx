import { create } from "zustand";
import axios from "axios";

export const usechatstore = create((set, get) => ({
  messages: [],
  users: [{}], // Array of user objects
  selecteduser: null, // Initially null, will store the selected user
  isuserloading: false,
  ismesageloading: false,
  loggedinuser: JSON.parse(localStorage.getItem("loggedinuser")) || null,

  getuser: async () => {
    set({ isuserloading: true });
    try {
      const res = await axios.get("http://localhost:5000/api/message/users", {
        withCredentials: true,
      });
      set({ users: res.data });
    } catch (error) {
      console.log("Error happened to get all the users in the sidebar");
      console.log(error.message);
    } finally {
      set({ isuserloading: false });
    }
  },

  getmessage: async (id) => {
    set({ ismesageloading: true });
    try {
      const res = await axios.get(`http://localhost:5000/api/message/${id}`, {
        withCredentials: true,
      });
      set({ messages: res.data });
    } catch (error) {
      console.log("Error happened to get all the messages from frontend");
      console.log(error.message);
    } finally {
      set({ ismesageloading: false });
    }
  },

  sendmessage: async (messagedata) => {
    try {
      const { selecteduser, messages } = get();
      //  console.log(messagedata);
      const res = await axios.post(
        `http://localhost:5000/api/message/send/${selecteduser._id}`,
        messagedata,
        { withCredentials: true }
      );
      const currentMessages = get().messages;
     console.log("sended message", res.data);
      set({
        messages: [...currentMessages, res.data], 
      });
      // console.log("ekhn message gula", messages);
      
    } catch (error) {
      console.log("Error happened to send the message from frontend");
      console.log(error.message);
    }
  },

  setselecteduser: (user) => {
    set({ selecteduser: user });
  },
  setloggedinuser: (user) => {
    localStorage.setItem("loggedinuser", JSON.stringify(user)); // Save to localStorage
    set({ loggedinuser: user });
  },
  clearloggedinuser: () => {
    localStorage.removeItem("loggedinuser"); // Remove from localStorage
    set({ loggedinuser: null });
  },
}));
