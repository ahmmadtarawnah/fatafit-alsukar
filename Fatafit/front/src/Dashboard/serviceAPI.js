// serviceAPI.js
import axios from "axios";

// Set base URL for API requests
// For Vite, use import.meta.env instead of process.env
// For standard browser usage, fall back to a hardcoded value if env variables aren't available
const API_URL =
  import.meta.env?.VITE_API_URL ||
  window.env?.REACT_APP_API_URL ||
  "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Services API functions
export const getServices = async () => {
  try {
    const response = await api.get("/services");
    return response.data; // ✅ يجب ترجيع البيانات مباشرة
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const getServiceById = async (id) => {
  try {
    const response = await api.get(`/services/${id}`);
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await api.post("/services", serviceData);
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateService = async (id, serviceData) => {
  try {
    const response = await api.put(`/services/${id}`, serviceData);
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await api.delete(`/services/${id}`);
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const requestService = async (id, userId) => {
  try {
    const response = await api.post(`/services/${id}/request`, { userId });
    return response;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/all`, {
      withCredentials: true, // مهم لإرسال الكوكيز مع الطلب
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};





export default {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  requestService,
  getAllUsers,
  // getAllEvents,
};
