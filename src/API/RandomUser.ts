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

// axios with then
export const getRandomUsersWithThen = () => {
  axios
    .get("https://randomuser.me/api/?results=10")
    .then((response) => {
      console.log("Random users: ", response);

      return response;
    })
    .catch((error) => {
      console.log("Failed to generate random users ", error);
    });
};

// using fetch
export const getRandomUsersWithFetch = () => {
  fetch("https://randomuser.me/api/?results=10")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Server response is not success");
      }
      console.log("Random users: ", response);

      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log("Error fetching random users ", error);
    });
};
