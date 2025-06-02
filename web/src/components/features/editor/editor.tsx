import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];

const EditorComponent = ({
  content,
  onNoteUpdate,
}: {
  content: JSONContent;
  onNoteUpdate: (content: JSONContent, rawContent: string) => void;
}) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      onNoteUpdate(editor.getJSON(), editor.getText());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none  h-[50vh]",
      },
    },
  });

  return <EditorContent editor={editor} />;
};

export default EditorComponent;
