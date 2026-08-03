import type { Metadata } from "next";
import { allArticles } from "../lib/articles";
import { ControlPanel } from "./control-panel";

export const metadata: Metadata = {
  title: "Publication Control | Cybersecurity Classroom Hub",
  description: "Authorized article publishing controls.",
  robots: { index: false, follow: false },
};

export default function ControlPage() {
  return (
    <ControlPanel
      initialArticles={allArticles}
      apiUrl={process.env.NEXT_PUBLIC_CONTROL_API_URL ?? ""}
    />
  );
}
