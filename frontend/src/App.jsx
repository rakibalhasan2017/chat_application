import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Signuppage from "./pages/Signuppage.jsx";
import Loginpage from "./pages/Loginpage.jsx";
import Settingpage from "./pages/Settingpage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<PrivateRoute element={Homepage} />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<Loginpage />}/>
        {/* <Route path="/setting" element={<Settingpage />}/> */}
        <Route path="/setting" element={<PrivateRoute element={Settingpage} />} />
      </Routes>
    </div>
  );
};

export default App;
