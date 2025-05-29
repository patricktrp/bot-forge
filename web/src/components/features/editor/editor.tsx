import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];
const content = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Hello World!",
        },
      ],
    },
  ],
};

const Editor = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  const log = () => {
    const contentJSON = editor.getJSON();
    const contentRaw = editor.getText();
    console.log(contentJSON);
    console.log(contentRaw);
  };

  return (
    <>
      <EditorContent editor={editor} />
      <Button onClick={log}>Log</Button>
    </>
  );
};

export default Editor;
