import { create } from 'zustand';
import axios from 'axios';

export const usechatstore = create((set) => ({
  messages: [],
  users: [{}],  // Array of user objects
  selecteduser: null, // Initially null, will store the selected user
  isuserloading: false,
  ismesageloading: false,

  getuser: async () => {
    set({ isuserloading: true });
    try {
      const res = await axios.get('http://localhost:5000/api/message/users', { withCredentials: true });
      set({ users: res.data });
    } catch (error) {
      console.log('Error happened to get all the users in the sidebar');
      console.log(error.message);
    } finally {
      set({ isuserloading: false });
    }
  },

  setselecteduser: (user) => {
    set({ selecteduser: user });
  },
}));
