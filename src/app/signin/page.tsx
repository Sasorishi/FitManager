"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Erreur de connexion");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError("Erreur réseau");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">Connexion</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white w-full py-2 rounded"
      >
        Se connecter
      </button>

      <p className="text-center text-sm mt-4">
        Pas encore de compte ?{" "}
        <a href="/signup" className="text-blue-600 underline">
          Créer un compte
        </a>
      </p>
    </div>
  );
}
