import axios from "axios";
import conf from "../conf/conf";

const baseUrl = `${conf.apiBaseUrl}/api/calendar`;

export const createEvent = (event) =>
  axios.post(`${base}/event`, { event }, { withCredentials: true });

export const connectGoogle = () => {
  window.location.href = `${baseUrl}/auth`;
};