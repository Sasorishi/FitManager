"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/signin");
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Déconnexion
    </Button>
  );
}
