import jwt from "jsonwebtoken";

/**
 * Signs a JWT containing the user id. Token expires in 30 days.
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
