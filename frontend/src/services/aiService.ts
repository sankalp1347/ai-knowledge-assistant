import http from "../api/http";
import { API_ENDPOINTS } from "../api/endpoints";

export const askAI = async (documentId: number, question: string) => {
  const res = await http.post(API_ENDPOINTS.ASK_AI, {
    document_id: documentId,
    question,
  });
  return res.data;
};
