import { ProjectForm } from "@/components/project-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publish Project - Server Actions Wizard",
  description: "Deploy and publish a new MERN or Next.js repository to the ecosystem.",
};

export default function NewProjectPage() {
  return (
    <div className="w-full">
      <ProjectForm />
    </div>
  );
}
