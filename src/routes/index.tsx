import { createFileRoute } from "@tanstack/react-router";
import { SaveEditor } from "../components/SaveEditor";

export const Route = createFileRoute("/")({
	component: SaveEditor,
});

