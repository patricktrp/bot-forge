import {
  useQuery,
  type UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { NoteDto } from "@/types/notes.types";
import { getNote } from "@/services/api";

export function useNote(
  noteId: number,
  options?: UseQueryOptions<NoteDto, Error, NoteDto>
): UseQueryResult<NoteDto, Error> {
  return useQuery<NoteDto, Error>({
    queryKey: ["notes", noteId],
    queryFn: () => getNote(noteId),
    enabled: noteId > 0,
    ...options,
  });
}
