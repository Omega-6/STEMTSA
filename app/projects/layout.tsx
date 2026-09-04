import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Projects",
  description: "Archive of what previous Downingtown STEM TSA teams designed, built and learned.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
