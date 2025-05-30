import Editor from "@/components/features/editor/editor";
import { getNote } from "@/services/api";
import type { NoteDto } from "@/types/notes.types";
import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/notes/$noteId")({
  loader: async ({ params }): Promise<NoteDto> => {
    return getNote(parseInt(params.noteId));
  },
  pendingComponent: () => {
    <div className="animate-pulse space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <Skeleton className="h-8 w-1/3" />

      <Skeleton className="h-4 w-1/4" />

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const note = Route.useLoaderData();

  return (
    <div>
      <h1>{note.title}</h1>
      <Editor content={note.content} />
    </div>
  );
}
