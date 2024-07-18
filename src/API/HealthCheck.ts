import axios from "axios";
import { API_URL } from "../configs/config";

export const checkHealth = async (): Promise<unknown> => {
  try {
    const response = await axios.get(`${API_URL}/api/rest/healthCheck`);

    if (response) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Failed to check health ", error);
    return null;
  }
};
