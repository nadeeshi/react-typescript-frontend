import axios from "axios";

export const getRandomUsers = async (): Promise<any> => {
  try {
    const response = await axios.get("https://randomuser.me/api/?results=10");
    console.log("Random users: ", response);

    return response;
  } catch (error) {
    console.log("Failed to generate random users ", error);
  }
};
