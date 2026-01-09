// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import Cookies from "js-cookie"; // For reading cookies
// import * as jwtDecode from "jwt-decode"; // Named import


// const PrivateRoute = ({ element: Element, ...rest }) => {
//   // Retrieve the token from cookies
//   const token = Cookies.get("jwt");
//   // Check if the token exists and is valid
//   const isAuthenticated = token ? isTokenValid(token) : false;

//   // Check if the token is valid (optional - decode JWT and check expiration)
//   const isTokenValid = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       const currentTime = Date.now() / 1000; // Get current time in seconds
//       return decoded.exp > currentTime; // Check if the token has expired
//     } catch (error) {
//       return false; // If token decoding fails, return false
//     }
//   };

//   // If the user is authenticated, render the element, else redirect to login
//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
//     />
//   );
// };

// export default PrivateRoute;





// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import * as jwtDecode from "jwt-decode";

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const token = Cookies.get("jwt");
//   console.log(token);
//   console.log("ami private router e");
  
//   const isAuthenticated = token ? isTokenValid(token) : false;

//   const isTokenValid = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       const currentTime = Date.now() / 1000;
//       return decoded.exp > currentTime;
//     } catch (error) {
//       return false;
//     }
//   };

//   return isAuthenticated ? (
//     <Element {...rest} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default PrivateRoute;



// import React from "react";
// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import * as jwtDecode from "jwt-decode";
//  // or use `import { decode as jwtDecode } from "jwt-decode";` if named import is required

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const token = Cookies.get("jwt");
//   console.log(token);
  
//   const isAuthenticated = token ? isTokenValid(token) : false;

//   const isTokenValid = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       const currentTime = Date.now() / 1000;
//       return decoded.exp > currentTime;
//     } catch (error) {
//       return false;
//     }
//   };

//   return isAuthenticated ? (
//     <Element {...rest} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// export default PrivateRoute;






import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";

const PrivateRoute = ({ element: Element, ...rest }) => {
  // Define the token validation function first


  const decodeJWT = (token) => {
    const base64Url = token.split('.')[1];  // Get the payload (second part of the token)
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');  // Fix URL encoding
    const decodedPayload = JSON.parse(atob(base64));  // Decode the payload
    return decodedPayload;
  }

  const isTokenValid = (token) => {
    try {
      const decoded = decodeJWT(token);
      const currentTime = Date.now() / 1000;  // Current time in seconds
      return decoded.exp > currentTime;  // Check if the token is expired
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  };
  const token = Cookies.get("jwt");  
  const isAuthenticated = token ? isTokenValid(token) : false;  
  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};
export default PrivateRoute;

