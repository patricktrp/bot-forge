import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Index,
});

function Index() {
  return <div className="p-2">hi</div>;
}
