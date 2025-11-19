import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save both user id and role (admin or user)
    req.user = { id: decoded.id || null, role: decoded.role || "user", email: decoded.email || null };

    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
