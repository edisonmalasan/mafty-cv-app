import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "SAMPLE_SECRET_KEY";

interface tokenPayload {
  userId: number;
  email: string;
}

export function generateToken(payload: tokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "4h" });
}

export function generateRefreshToken(payload: tokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
