import axios from "axios";
import { HeaderAPI } from "../../headerApi";

export const getProcess = async (searchQuery) => {
  try {
    // let token = localStorage.getItem("Token")
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/api/process/title?search=${searchQuery}`,
      {
        ...HeaderAPI(localStorage.getItem("Token")), 
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const addProcess = async (data) => {
    console.log(data)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/process`,
        data,
        {
          ...HeaderAPI(localStorage.getItem("Token")),
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };