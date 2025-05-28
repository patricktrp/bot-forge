import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getBots } from "@/services/api";

export const Route = createFileRoute("/dashboard")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <Button onClick={getBots}>SEND</Button>
    </div>
  );
}
