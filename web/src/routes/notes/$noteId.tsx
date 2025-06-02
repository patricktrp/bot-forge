import Editor from "@/components/features/editor/editor";
import useDebouncedCallback from "@/hooks/use-debounced-callback";
import { useUpdateNote } from "@/hooks/use-note";
import { getNote } from "@/services/api";
import type { NoteDto } from "@/types/notes.types";
import { createFileRoute } from "@tanstack/react-router";
import type { JSONContent } from "@tiptap/react";
import { ClipLoader } from "react-spinners";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Route = createFileRoute("/notes/$noteId")({
  loader: async ({ params }): Promise<NoteDto> => {
    return getNote(parseInt(params.noteId));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const note = Route.useLoaderData();

  const { mutate, isPending } = useUpdateNote(note.id);

  const handleNoteUpdate = (content: JSONContent, rawContent: string) => {
    mutate({
      title: note.title,
      content,
      rawContent,
    });
  };

  const debouncedHandleNoteUpdate = useDebouncedCallback(
    handleNoteUpdate,
    1000
  );

  return (
    <>
      <header className="flex justify-between px-4 border-b items-center h-16">
        <div className="flex  shrink-0 items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Notes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{note.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ClipLoader size="20" loading={isPending} />
      </header>
      <div className="p-4">
        <Editor
          content={note.content}
          onNoteUpdate={debouncedHandleNoteUpdate}
        />
      </div>
    </>
  );
}
