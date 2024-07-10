import axios from "axios";
import { API_URL } from "../configs/config";
import { ICustomer } from "../types/Customer";

export const getCustomers = async (): Promise<ICustomer[] | null> => {
  try {
    const response = await axios.get(`${API_URL}/api/rest/customers`);

    if (response.data) {
      console.log("Customers: ", response.data);
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Failed to load customers ", error);
    return null;
  }
};
