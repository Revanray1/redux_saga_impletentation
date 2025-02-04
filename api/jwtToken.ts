import { SignJWT, jwtVerify } from "jose";
import lodash from "lodash";
import { IDENTIFIER } from "./commons";

export const createJWTToken = async (data: any) => {
  const secretKey = localStorage.getItem(IDENTIFIER) ?? "invalid key";
  const key = new TextEncoder().encode(secretKey);
  const header = {
    alg: "HS256",
  };
  const jwttoken = await new SignJWT(data) // details to  encode in the token
    .setProtectedHeader(header) // algorithm
    // .setIssuedAt()
    // .setIssuer(process.env.JWT_ISSUER) // issuer
    // .setAudience(process.env.JWT_AUDIENCE) // audience
    // .setExpirationTime(process.env.JWT_EXPIRATION_TIME) // token expiration time, e.g., "1 day"
    .sign(key); // secretKey generated from previous step

  return jwttoken;
};

export const verifyJWTToken = async (token: string) => {
  const secretKey = localStorage.getItem(IDENTIFIER) ?? "invalid key";
  const key = new TextEncoder().encode(secretKey);
  try {
    // verify token
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (e) {
    // token verification failed
    throw new Error("Bad Request");
  }
};

export const verifyResponse = async (result: any) => {
  const verifySignature = result.signature ? await verifyJWTToken(result.signature) : false;
  verifySignature && delete result.signature;
  if (verifySignature && lodash.isEqual(verifySignature, result)) return result;
  else throw new Error("Bad Request");
  // return result;
};
