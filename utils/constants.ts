// import { env } from "../env";

export const storageKeys = {
  userDetails : "User_Details",
  // userDetails: import.meta.env.VITE_REACT_APP_USERDETAILS_KEY, // OR import from ENV file
};

export const networkErrorCode = [406, 501, 502, 503, 504];
export const FAILED_TO_CONNECT_NETWORK = "You have reached rate limit,try after 2 mins"
// "The server is temporarily unable to handle your request due to a gateway timeout. Please try again later.";
