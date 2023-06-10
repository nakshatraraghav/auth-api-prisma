import jwt from "jsonwebtoken";

const private_key = process.env.PRIVATE_KEY as string;

export default function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, private_key);
    return {
      user: decoded,
      expired: false,
    };
  } catch (error: any) {
    return {
      user: null,
      expired: error.message === "jwt expired",
    };
  }
}
