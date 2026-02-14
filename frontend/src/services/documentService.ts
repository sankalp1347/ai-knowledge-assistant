import http from "../api/http";
import { API_ENDPOINTS } from "../api/endpoints";

export interface DocumentPayload {
  title: string;
  content: string;
}

export const getDocuments = async () => {
  const res = await http.get(API_ENDPOINTS.DOCUMENTS);
  return res.data;
};

export const createDocument = async (data: DocumentPayload) => {
  return http.post(API_ENDPOINTS.DOCUMENTS, data);
};

export const deleteDocument = async (id: number) => {
  return http.delete(`${API_ENDPOINTS.DOCUMENTS}${id}/`);
};
export const updateDocument = async (id: number, data: { title: string; content: string }) => {
  return http.put(`documents/${id}/`, data);
};
