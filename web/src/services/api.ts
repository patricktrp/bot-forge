import axios from "axios";
import keycloak from "@/services/keycloak";
import type {
  NoteDto,
  NoteUpdateDto,
  NoteCreationDto,
} from "@/types/notes.types";
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

const getNotes = async (): Promise<NoteDto[]> => {
  const { data } = await api.get("/notes");
  return data;
};

const createNote = async (
  noteCreationDto: NoteCreationDto
): Promise<NoteDto> => {
  const { data } = await api.post("/notes", noteCreationDto);
  return data;
};

const getNote = async (noteId: number): Promise<NoteDto> => {
  const { data } = await api.get(`/notes/${noteId}`);
  return data;
};

const updateNote = async (
  noteId: number,
  noteUpdateDto: NoteUpdateDto
): Promise<NoteDto> => {
  console.log(noteUpdateDto);
  const { data } = await api.patch(`/notes/${noteId}`, noteUpdateDto);
  return data;
};

const deleteNote = async (noteId: number) => {
  await api.delete(`/notes/${noteId}`);
};

export { getNotes, createNote, getNote, updateNote, deleteNote };
