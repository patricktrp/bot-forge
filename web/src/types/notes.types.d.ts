import { type JSONContent } from "@tiptap/react";

export interface NoteDto {
  id: number;
  title: string;
  content: JSONContent;
  createdAt: string;
  updatedAt: string;
}

export interface NoteCreationDto {
  title: string;
  content: JSONContent;
  rawContent: string;
}

export interface NoteUpdateDto {
  title: string;
  content: JSONContent;
  rawContent: string;
}
