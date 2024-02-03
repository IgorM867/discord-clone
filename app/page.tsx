import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions";

export default async function Home() {
  const session = await getCurrentUser();
  if (!session) return redirect("/auth/signin");

  redirect("/channels/direct-messages");
}
