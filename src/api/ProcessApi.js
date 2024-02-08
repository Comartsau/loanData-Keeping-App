import axios from "axios";
import { HeaderAPI } from "../../headerApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getProcess = async (searchQuery) => {
  console.log(searchQuery)
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
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProcessId = async (searchUserId) => {
  try {
    // let token = localStorage.getItem("Token")
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/api/process/title?search=${searchUserId}`,
      {
        ...HeaderAPI(localStorage.getItem("Token")), 
      }
    );
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
      return response.data 
    } catch (error) {
      console.error(error);
    }
  };

  export const getProcessUser = async (searchQuery) => {
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
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };