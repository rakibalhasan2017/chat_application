import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '20d' });

  res.cookie('jwt', token, {
    // httpOnly: true, // The cookie can only be accessed by the server (not via JavaScript in the browser)
    secure: process.env.NODE_ENV !== 'development', // Set to true in production to ensure it's sent over HTTPS
    expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // Set expiration for the cookie (7 days)
    sameSite: 'strict', // Helps to prevent cross-site request forgery (CSRF) attacks
    path: '/',
  });

 return token;
};
