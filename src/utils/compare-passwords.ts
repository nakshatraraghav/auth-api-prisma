import argon from "argon2";

export default function verifyPasswords(hashed: string, candidate: string) {
  return argon.verify(hashed, candidate);
}
