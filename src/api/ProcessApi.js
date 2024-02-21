import axios from "axios";
import { HeaderAPI } from "../../headerApi";


export const getProcess = async (searchQuery) => {
  console.log(searchQuery);
  try {
    // let token = localStorage.getItem("Token")
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/api/process/title?search=${searchQuery}`,
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
  console.log(data);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/api/process`,
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

export const getUpdateAll = async (processId) => {
  try {
    // let token = localStorage.getItem("Token")
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/api/process/update?id=${processId}`,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getProcessUser = async (id, status) => {
  try {
    // let token = localStorage.getItem("Token")
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/api/process/user?process_id=${id}&status=${status}`,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    return response;
  } catch (error) {
    return error
  }
};


export const getProcessUser1 = async (id) => {
  try {
    // let token = localStorage.getItem("Token")
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/api/process/user?process_id=${id}`,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    return response;
  } catch (error) {
    return error
  }
};

export const getProcessUserList = async (id) => {
  try {
    // let token = localStorage.getItem("Token")
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API
      }/api/process/user/list?process_user_id=${id}`,
      // }/api/process/user/list?process_user_id=60`,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    console.log(response)
    return response;
  } catch (error) {
    return error
  }
};

export const getProcessUserListSum = async (id) => {
  try {
    // let token = localStorage.getItem("Token")
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API}/api/process/update/user?id=${id}`,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const userUpdate = async (data) => {

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API}/api/process/user`,
      data,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const changeStatus = async (data) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API}/api/process/user/list`,
      data,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    // console.log(response)
    return response;
  } catch (error) {
    return error
  }
};

export const sendUpdate = async (data) => {

  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API}/api/process/user`,
      data,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    return response;
  } catch (error) {
    return error
  }
};

export const sendReload = async (data) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_API}/api/process/user/list/reload`,
      data,
      {
        ...HeaderAPI(localStorage.getItem("Token")),
      }
    );
    return response;
  } catch (error) {
    return error
  }
};
