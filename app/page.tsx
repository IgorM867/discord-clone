import { getCurrentUser } from "@/lib/userActions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getCurrentUser();
  if (!session) return redirect("/auth/signin");

  redirect("/channels/me");
}
