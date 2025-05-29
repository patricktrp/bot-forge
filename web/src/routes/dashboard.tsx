import Editor from "@/components/features/editor/editor";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Index,
});

function Index() {
  return (
    <div className="m-6">
      <Editor />
    </div>
  );
}
