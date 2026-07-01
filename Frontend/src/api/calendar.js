import axios from "axios";
import conf from "../conf/conf";

const baseUrl = `${conf.apiBaseUrl}/api/calendar`;



export const connectGoogle = async () => {
  try {
    const res = await axios.get(`${baseUrl}/auth`, { withCredentials: true });
    window.location.href = res.data.url;
  } catch (err) {
    console.error("Google connect failed:", err);
    alert("Failed to connect Google. Please login again.");
  }
};