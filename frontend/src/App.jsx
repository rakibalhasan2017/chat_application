import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from './pages/Homepage.jsx'
import Signuppage from './pages/Signuppage.jsx'
import Loginpage from './pages/Loginpage.jsx'
import Settingpage from './pages/Settingpage.jsx'
import Profilepage from './pages/Profilepage.jsx'

const App = () => {
  return (
    <div>
      <h1>hello</h1>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/setting" element={<Settingpage />} />
        <Route path="/profile" element={<Profilepage/>} />
      </Routes>
    </div>
  );
};

export default App;
