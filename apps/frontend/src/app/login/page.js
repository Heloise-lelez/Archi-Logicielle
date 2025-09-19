"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const { bearer, fullName, email } = data;
        const { token } = bearer;
        localStorage.setItem("authToken", token);
        console.log("test");
        console.log(data);

        localStorage.setItem(
          "userData",
          JSON.stringify({
            email,
            fullName,
          })
        );
        setMessage("Connexion réussie !");
        setEmail("");
        setPassword("");

        // Redirection vers la page d'accueil
        router.push("/");
      }
      setMessage(data.message || "Email ou mot de passe incorrect");
    } catch (err) {
      setMessage("Erreur serveur");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h1>Connexion</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
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
          Se connecter
        </button>
      </form>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
