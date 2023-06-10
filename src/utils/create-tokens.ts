import jwt from "jsonwebtoken";

const privateKey = process.env.PRIVATE_KEY as string;
const accessTokenTtl = process.env.ACCESS_TOKEN_TTL as string;
const refreshTokenTtl = process.env.REFRESH_TOKEN_TTL as string;

export function createTokens(payload: Object) {
  const accessToken = jwt.sign(payload, privateKey, {
    expiresIn: accessTokenTtl,
  });

  const refreshToken = jwt.sign(payload, privateKey, {
    expiresIn: refreshTokenTtl,
  });

  return {
    accessToken,
    refreshToken,
  };
}
