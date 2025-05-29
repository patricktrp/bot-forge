import axios from "axios";
import keycloak from "@/services/keycloak";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = keycloak.token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getNotes = async () => {
  const res = await api.get("/notes");
  console.log(res.data);
};

export { getNotes };
