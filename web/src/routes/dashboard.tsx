import Editor from "@/components/features/editor/editor";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  component: Index,
});

function Index() {
  return (
    <div className="m-6">
      <Link to="/notes/58">
        <Button>ad</Button>
      </Link>
    </div>
  );
}
