
import axios from "axios"; 
import type { AxiosResponse } from "axios"; 
import type { Note, NoteTag } from "../types/note.ts";

const axiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async ({ page = 1, search = "" }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    perPage: "12",
  });
  if (search) {
    params.append("search", search);
  }

  const response: AxiosResponse<FetchNotesResponse> = await axiosInstance.get(
    `/notes?${params.toString()}`
  );
  return response.data;
};

export const createNote = async (note: CreateNotePayload): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.post("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.delete(`/notes/${id}`);
  return response.data;
};