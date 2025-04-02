"use client";

import { useState } from "react";

export default function FakerPage() {
  const [status, setStatus] = useState("");

  const handleCreateFakeUser = async () => {
    setStatus("Création en cours...");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: 1 }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erreur lors de la création : ${errorText}`);
      }

      const users = await res.json();

      if (users?.length > 0) {
        const user = users[0];
        setStatus(
          `✅ Utilisateur créé : ${user.email}${user.password ? " / " + user.password : ""}`,
        );
      } else {
        setStatus("❌ Aucun utilisateur créé");
      }
    } catch (error: any) {
      console.error(error);
      setStatus(`❌ Erreur lors de la création : ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">Créer un utilisateur fictif</h1>

      <button
        onClick={handleCreateFakeUser}
        className="bg-purple-600 text-white w-full py-2 rounded mb-4"
      >
        Générer un compte
      </button>

      {status && <p className="text-sm text-gray-700">{status}</p>}
    </div>
  );
}
