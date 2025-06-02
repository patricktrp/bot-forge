import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { NoteDto, NoteUpdateDto } from "@/types/notes.types";
import { getNote, updateNote } from "@/services/api";

export function useNote(noteId: number): UseQueryResult<NoteDto, Error> {
  return useQuery<NoteDto, Error>({
    queryKey: ["notes", noteId],
    queryFn: () => getNote(noteId),
    enabled: noteId > 0,
  });
}

export function useUpdateNote(
  noteId: number
): UseMutationResult<NoteDto, Error, NoteUpdateDto, unknown> {
  const queryClient = useQueryClient();

  return useMutation<NoteDto, Error, NoteUpdateDto>({
    mutationFn: (noteUpdateDto) => updateNote(noteId, noteUpdateDto),
    onSuccess: (updatedNote) => {
      queryClient.setQueryData<NoteDto>(["notes", noteId], () => updatedNote);
    },
    retry: 10,
  });
}
