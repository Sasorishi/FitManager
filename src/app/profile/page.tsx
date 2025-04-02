import LogoutButton from "@/components/ui/logoutButton";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Profile() {
  const res = await fetch("http://localhost:3000/api/users", {
    cache: "no-store",
  });
  const users = await res.json();

  if (!users) {
    return redirect("/signin"); // 🔐 redirection si non connecté
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
    </div>
  );
}
