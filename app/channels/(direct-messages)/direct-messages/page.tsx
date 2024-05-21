import { getCurrentUser } from "@/lib/actions/userActions";
import { redirect } from "next/navigation";

export default async function DirectMessagesPage() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  redirect("/channels/friends");
}
