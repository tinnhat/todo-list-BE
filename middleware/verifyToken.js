import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
  const token = request.header("Authorization");
  if (!token) return response.status(401).json({ message: "Access Denied" });
  try {
    const verified = jwt.verify(token, process.env.SERECT_KEY_SIGNATURE);
    next();
  } catch (err) {
    return response.status(400).json({ message: "Invalid Token" });
  }
};
