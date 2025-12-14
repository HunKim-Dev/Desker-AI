import { auth } from "@/auth";
import { redirect } from "next/navigation";

const DashboardHub = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = (session.user as any).id;
  redirect(`/dashboard/${userId}/invoices/sessions`);
};

export default DashboardHub;
