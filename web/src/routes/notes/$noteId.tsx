import Editor from "@/components/features/editor/editor";
import { getNote } from "@/services/api";
import type { NoteDto } from "@/types/notes.types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/notes/$noteId")({
  loader: async ({ params }): Promise<NoteDto> => {
    return getNote(parseInt(params.noteId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const note = Route.useLoaderData();
  console.log(note);
  return (
    <div>
      <Editor content={note.content} />
    </div>
  );
}
