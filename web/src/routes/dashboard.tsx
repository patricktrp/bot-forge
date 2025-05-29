import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getNotes } from "@/services/api";

export const Route = createFileRoute("/dashboard")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <Button onClick={getNotes}>SEND</Button>
    </div>
  );
}
