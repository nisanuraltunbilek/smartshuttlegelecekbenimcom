import { useState } from "react";
import type { Route } from "./+types/home";
import { useRouteLoaderData } from "react-router";
import { Welcome } from "../welcome/welcome";
import { Splash } from "../components/splash";

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

  const [showSplash, setShowSplash] = useState(!rootData?.user);

  if (showSplash && !rootData?.user) {
    return <Splash onComplete={() => setShowSplash(false)} />;
  }

  return <Welcome user={rootData?.user ?? null} />;
}
