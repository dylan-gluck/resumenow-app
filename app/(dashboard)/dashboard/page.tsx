import { redirect } from "next/navigation";
import { getUser } from "@/lib/db/queries";
import { FileUpload } from "./file-upload";

export default async function SettingsPage() {
  const user = await getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main>
      <article className="dashboard max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        <div className="py-10 flex flex-col space-y-4">
          <FileUpload />
        </div>
      </article>
    </main>
  );
}
