import axios from "axios";
import { HeaderAPI } from "../../headerApi";

export const getLocation = async (searchQuery) => {
  try {
    // let token = localStorage.getItem("Token")
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/api/house?search=${searchQuery}`,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addLocation = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/api/house`,
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

export const editLocation = async (data) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API}/api/house`,
      data,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteLocation = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API}/api/house/${id}`,
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
