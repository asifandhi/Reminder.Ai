import axios from "axios";
import conf from "../conf/conf.js";

const baseUrl = `${conf.apiBaseUrl}/api/sync`;

export const addReminder = (text) =>
  axios.post(`${baseUrl}/addreminder`, { text }, { withCredentials: true });
