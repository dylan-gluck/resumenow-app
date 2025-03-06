import { redirect } from "next/navigation";
import { getUser } from "@/lib/db/queries";
import { ResumeUpload } from "./resume-upload";

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col flex-1">
      <h1 className="text-3xl font-bold my-2">Onboarding</h1>
      <p>Upload your resume, and we'll get started.</p>
      <div className="py-10 flex flex-col flex-1">
        <ResumeUpload />
      </div>
    </main>
  );
}
