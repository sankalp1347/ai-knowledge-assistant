import http from "../api/http";
import { API_ENDPOINTS } from "../api/endpoints";

export interface LoginPayload {
  username: string;
  password: string;
}

export const login = async (data: LoginPayload) => {
  const response = await http.post(API_ENDPOINTS.LOGIN, data);
  localStorage.setItem("token", response.data.access);
  return response.data;
};

export const register = async (data: LoginPayload) => {
  return http.post(API_ENDPOINTS.REGISTER, data);
};

export const logout = () => {
  localStorage.removeItem("token");
};
