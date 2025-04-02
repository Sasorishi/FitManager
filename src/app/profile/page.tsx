"use client";

import LogoutButton from "@/components/ui/logoutButton";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    coach_id: "",
    client_id: "",
    start_date: "",
    end_date: "",
    session_type: "",
  });
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [exerciseForm, setExerciseForm] = useState({
    name: "",
    repetitions: "",
    sets: "",
  });
  const [exercises, setExercises] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState(null);
  const [allExercises, setAllExercises] = useState({});

  useEffect(() => {
    async function fetchSessions() {
      const response = await fetch("/api/training");
      const data = await response.json();
      setSessions(data);
    }

    fetchSessions();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const exercisesBySession = {};
        for (const session of sessions) {
          const response = await fetch(`/api/exercise?sessionId=${session.id}`);
          const data = await response.json();
          exercisesBySession[session.id] = data;
        }
        setAllExercises(exercisesBySession);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    };

    fetchAllExercises();
  }, [sessions]);

  const handleInputChange = (e) => {
    setNewSession({ ...newSession, [e.target.name]: e.target.value });
  };

  const fetchExercises = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/exercise?sessionId=${sessionId}`);
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Failed to fetch exercises:", error);
    }
  };

  const handleAddExercise = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    fetchExercises(sessionId);
  };

  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseForm({ ...exerciseForm, [e.target.name]: e.target.value });
  };

  const handleExerciseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSessionId) return;

    await fetch("/api/exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: selectedSessionId,
        ...exerciseForm,
        repetitions: Number(exerciseForm.repetitions),
        sets: Number(exerciseForm.sets),
      }),
    });

    // Reset
    setExerciseForm({ name: "", repetitions: "", sets: "" });
    setSelectedSessionId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/training", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSession),
    });
    if (response.ok) {
      const updatedSessions = await response.json();
      setSessions([...sessions, updatedSessions]);
      setIsModalOpen(false);
    }
  };

  if (!users) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center space-x-6">
        <Image
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Photo Profil"
          width={128}
          height={128}
          className="w-32 h-32 rounded-full border-4 border-gray-200"
        />
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Jean Dupont</h1>
          <p className="text-xl text-gray-600">Développeur Full Stack</p>
          <p className="text-gray-500">Paris, France</p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-blue-500 hover:underline">
              Modifier le Profil
            </a>
            <LogoutButton />
          </div>
        </div>
      </div>

      <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">
          À propos de moi
        </h2>
        <p className="text-gray-700 mt-4">
          Je suis un développeur passionné avec 5 ans d&#39;expérience dans le
          développement web et mobile. J&#39;ai travaillé avec des technologies
          comme React, Node.js, et Python. J&#39;aime résoudre des problèmes
          complexes et construire des applications scalables.
        </p>
      </section>

      <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">
          Expérience professionnelle
        </h2>
        <div className="mt-4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Développeur Full Stack
              </h3>
              <p className="text-gray-600">Entreprise X | 2020 - Présent</p>
            </div>
            <span className="text-gray-500">2 ans</span>
          </div>
          <p className="mt-2 text-gray-700">
            Développement d&#39;applications web en React et Node.js, gestion
            des bases de données et optimisation des performances.
          </p>
        </div>
        <div className="mt-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Développeur Junior
              </h3>
              <p className="text-gray-600">Entreprise Y | 2018 - 2020</p>
            </div>
            <span className="text-gray-500">2 ans</span>
          </div>
          <p className="mt-2 text-gray-700">
            Création d&#39;API RESTful en Node.js et gestion des frontends en
            Angular.
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">Éducation</h2>
        <div className="mt-4">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Master en Informatique
              </h3>
              <p className="text-gray-600">Université de Paris | 2016 - 2018</p>
            </div>
          </div>
          <p className="mt-2 text-gray-700">
            Diplôme en informatique avec une spécialisation en développement web
            et bases de données.
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">Compétences</h2>
        <ul className="mt-4 grid grid-cols-2 gap-4">
          <li className="bg-gray-100 p-3 rounded-full text-gray-700">
            JavaScript
          </li>
          <li className="bg-gray-100 p-3 rounded-full text-gray-700">React</li>
          <li className="bg-gray-100 p-3 rounded-full text-gray-700">
            Node.js
          </li>
          <li className="bg-gray-100 p-3 rounded-full text-gray-700">Python</li>
          <li className="bg-gray-100 p-3 rounded-full text-gray-700">Docker</li>
          <li className="bg-gray-100 p-3 rounded-full text-gray-700">SQL</li>
        </ul>
      </section>

      <section className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">
          Training Sessions
        </h2>
        <ul>
          {sessions.map((session) => (
            <li key={session.id} className="mb-2">
              {session.session_type} - {session.start_date}
              <ul>
                {allExercises[session.id]?.map((exercise) => (
                  <li key={exercise.id}>
                    {exercise.name} - {exercise.repetitions} reps, {exercise.sets} sets
                  </li>
                ))}
              </ul>
              <button
                className="ml-2 text-blue-500 underline"
                onClick={() => handleAddExercise(session.id)}
              >
                Ajouter des exercices
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => setIsModalOpen(true)}>Add Session</button>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
              <form onSubmit={handleSubmit}>
                <input
                  name="coach_id"
                  value={newSession.coach_id}
                  onChange={handleInputChange}
                  placeholder="Coach ID"
                  required
                />
                <input
                  name="client_id"
                  value={newSession.client_id}
                  onChange={handleInputChange}
                  placeholder="Client ID"
                  required
                />
                <input
                  name="start_date"
                  type="date"
                  value={newSession.start_date}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="end_date"
                  type="date"
                  value={newSession.end_date}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="session_type"
                  value={newSession.session_type}
                  onChange={handleInputChange}
                  placeholder="Session Type"
                  required
                />
                <button type="submit">Add Session</button>
              </form>
            </div>
          </div>
        )}
        {selectedSessionId && (
          <form
            onSubmit={handleExerciseSubmit}
            className="mt-4 bg-gray-50 p-4 rounded"
          >
            <h3 className="text-lg font-semibold mb-2">Ajouter un exercice</h3>
            <input
              name="name"
              value={exerciseForm.name}
              onChange={handleExerciseChange}
              placeholder="Nom de l'exercice"
              required
              className="block mb-2 w-full"
            />
            <input
              name="repetitions"
              value={exerciseForm.repetitions}
              onChange={handleExerciseChange}
              placeholder="Répétitions"
              required
              type="number"
              className="block mb-2 w-full"
            />
            <input
              name="sets"
              value={exerciseForm.sets}
              onChange={handleExerciseChange}
              placeholder="Séries"
              required
              type="number"
              className="block mb-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Ajouter
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
