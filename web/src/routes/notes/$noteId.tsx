import Editor from "@/components/features/editor/editor";
import useDebouncedCallback from "@/hooks/use-debounced-callback";
import { useUpdateNote } from "@/hooks/use-note";
import { getNote } from "@/services/api";
import type { NoteDto } from "@/types/notes.types";
import { createFileRoute } from "@tanstack/react-router";
import type { JSONContent } from "@tiptap/react";
import { ClipLoader } from "react-spinners";

export const Route = createFileRoute("/notes/$noteId")({
  loader: async ({ params }): Promise<NoteDto> => {
    return getNote(parseInt(params.noteId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const note = Route.useLoaderData();

  const { mutate, isPending, isError, isSuccess } = useUpdateNote(note.id);

  const handleNoteUpdate = (content: JSONContent) => {
    mutate({
      title: note.title,
      content: content,
      rawContent: "",
    });
  };

  const debouncedHandleNoteUpdate = useDebouncedCallback(
    handleNoteUpdate,
    1000
  );

  return (
    <div>
      {isPending && <ClipLoader />}
      <h1>{note.title}</h1>
      <Editor content={note.content} onNoteUpdate={debouncedHandleNoteUpdate} />
    </div>
  );
}
