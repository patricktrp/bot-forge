import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];

const EditorComponent = ({
  content,
  onNoteUpdate,
}: {
  content: JSONContent;
  onNoteUpdate: (content: JSONContent) => void;
}) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate({ editor }) {
      onNoteUpdate(editor.getJSON());
    },
  });

  return <EditorContent editor={editor} />;
};

export default EditorComponent;
