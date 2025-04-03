"use client";

import { useState } from "react";

export default function AddTrainingPage() {
  const [form, setForm] = useState({
    coach_id: "", // à remplir avec un select si besoin
    client_id: "",
    start_date: "",
    end_date: "",
    session_type: "",
  });

  const [success, setSuccess] = useState<boolean | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/training", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setSuccess(data.success);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ajouter une séance</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="client_id"
          type="text"
          placeholder="ID du client"
          value={form.client_id}
          onChange={handleChange}
          required
        />
        <input
          name="coach_id"
          type="text"
          placeholder="ID du coach"
          value={form.coach_id}
          onChange={handleChange}
        />
        <input
          name="start_date"
          type="date"
          value={form.start_date}
          onChange={handleChange}
          required
        />
        <input
          name="end_date"
          type="date"
          value={form.end_date}
          onChange={handleChange}
          required
        />
        <select
          name="session_type"
          value={form.session_type}
          onChange={handleChange}
          required
        >
          <option value="">Type de séance</option>
          <option value="FullBody">FullBody</option>
          <option value="Haut du corps">Haut du corps</option>
          <option value="Jambes">Jambes</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ajouter la séance
        </button>

        {success === true && (
          <p className="text-green-600">✅ Séance ajoutée !</p>
        )}
        {success === false && (
          <p className="text-red-600">❌ Erreur lors de l’ajout</p>
        )}
      </form>
    </div>
  );
}
