import type { Route } from "./+types/home";
import { useRouteLoaderData } from "react-router";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SmartShuttle" },
    { name: "description", content: "Welcome to SmartShuttle!" },
  ];
}

export default function Home() {
  const rootData = useRouteLoaderData("root") as
    | { user: { userId: string; name: string; role: string } | null }
    | undefined;
  return <Welcome user={rootData?.user ?? null} />;
}
