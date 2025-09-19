"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3333/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const { bearer, fullName, email } = data;
        const { token } = bearer;
        localStorage.setItem("authToken", token);
        console.log("test");
        localStorage.setItem(
          "userData",
          JSON.stringify({
            email,
            fullName,
          })
        );
        setMessage("Utilisateur créé avec succès !");
        setEmail("");
        setPassword("");

        // redirection vers la page d'accueil
        router.push("/");
      } else {
        setMessage(data.message || "Erreur lors de l'inscription");
      }
    } catch (err) {
      setMessage("Erreur serveur");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h1>Inscription</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <div>
          <label htmlFor="fullName">Nom complet</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Votre nom"
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: 10, marginTop: 12, cursor: "pointer" }}
        >
          S'inscrire
        </button>
      </form>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
