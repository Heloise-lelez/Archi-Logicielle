"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      // Redirection vers la page de connexion si pas connecté
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    router.push("/");
  };

  if (!isLoggedIn || !user) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: 20,
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <header style={{ marginBottom: 40 }}>
        <Link href="/" style={{ textDecoration: "none", color: "#2C6E49" }}>
          Retour à l'accueil
        </Link>
      </header>
      <div
        style={{
          backgroundColor: "#131a16ff",
          padding: 30,
          borderRadius: 10,
          marginBottom: 30,
        }}
      >
        <h1 style={{ color: "#2C6E49", marginBottom: 20 }}>Mon Profil 👤</h1>

        <div style={{ marginBottom: 15 }}>
          <strong>Nom complet :</strong> {user.fullName}
        </div>

        <div style={{ marginBottom: 15 }}>
          <strong>Email :</strong> {user.email}
        </div>

        {user.id && (
          <div style={{ marginBottom: 15 }}>
            <strong>ID utilisateur :</strong> {user.id}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#2C6E49",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Modifier le profil
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
