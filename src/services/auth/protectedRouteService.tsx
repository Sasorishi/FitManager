import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRouteService = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("http://localhost:3000/api/users", {
        cache: "no-store",
      });
      const users = await res.json();

      if (!users) {
        router.push("/signin");
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRouteService;
