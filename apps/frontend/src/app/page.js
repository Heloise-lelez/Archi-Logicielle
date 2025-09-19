"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Vérifier si l'utilisateur est connecté au chargement de la page
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
    console.log(userData, token);
  }, []);

  const helloWorld = async () => {
    try {
      const res = await fetch("/api");
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <h1 style={{ fontSize: 32, color: "#2C6E49" }}>Cactoo 🌵</h1>
        <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
          {isLoggedIn ? (
            <>
              <span style={{ color: "#2C6E49" }}>
                Bonjour {user?.fullName || user?.email} 👋
              </span>
              <Link href="/profil">Profil</Link>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      {/* Hero section */}
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 40,
        }}
      >
        <div style={{ maxWidth: 500 }}>
          <h2 style={{ fontSize: 28, marginBottom: 16 }}>
            Les plus beaux cactus pour votre intérieur
          </h2>
          <p style={{ marginBottom: 20 }}>
            Découvrez notre sélection unique de cactus et plantes succulentes,
            livrés directement chez vous.
          </p>
          <Link
            href="/shop"
            style={{
              padding: "10px 20px",
              backgroundColor: "#2C6E49",
              color: "white",
              textDecoration: "none",
              borderRadius: 6,
            }}
          >
            Découvrir la boutique
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 60,
          borderTop: "1px solid #ddd",
          paddingTop: 20,
          textAlign: "center",
          color: "#555",
        }}
      >
        <p>© 2025 Cactoo. Tous droits réservés 🌵</p>
      </footer>

      {/* Debug / Test API */}
      <button
        onClick={helloWorld}
        style={{ marginTop: 20, padding: "8px 12px" }}
      >
        Test API
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
