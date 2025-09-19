"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "../styles/profil.css";

// Custom hooks
const useAuth = () => {
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
      router.push("/login");
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    router.push("/");
  };

  return { user, setUser, isLoggedIn, logout };
};

const useNotification = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("default");

  const notify = (msg, type = "default") => {
    setMessage(msg);
    setMessageType(type);
    toast(msg, { type, theme: "dark" });
  };

  return { notify };
};

// Form validation
const validateForm = (formData) => {
  const errors = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "Le nom est obligatoire.";
  }

  if (!formData.email.trim()) {
    errors.email = "L'email est obligatoire.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Format d'email invalide.";
  }

  if (formData.phone && !/^[0-9+\s-]{8,15}$/.test(formData.phone)) {
    errors.phone = "Format du téléphone invalide.";
  }

  if (formData.address && formData.address.length < 5) {
    errors.address = "Adresse trop courte.";
  }

  return errors;
};

// API service
const updateProfile = async (formData, token) => {
  const response = await fetch("http://localhost:3333/editProfil", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fullName: formData.fullName,
      email: formData.email,
      address: formData.address,
      phone_number: formData.phone,
    }),
  });

  return { response, data: await response.json() };
};

// Components
const ProfileDisplay = ({ user }) => (
  <div className="profile-infos">
    <div className="profile-info">
      <strong>Name:</strong> {user.fullName}
    </div>
    <div className="profile-info">
      <strong>Email:</strong> {user.email}
    </div>
    <div className="profile-info">
      <strong>Adress:</strong> {user.address}
    </div>
    <div className="profile-info">
      <strong>Phone number:</strong> {user.phone_number}
    </div>
    {user.id && (
      <div className="profile-info">
        <strong>ID user:</strong> {user.id}
      </div>
    )}
  </div>
);

const ProfileForm = ({ formData, setFormData, errors, onSubmit }) => (
  <form onSubmit={onSubmit} className="form-container">
    <div>
      <input
        type="text"
        placeholder="Nom complet"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        className="input-field"
      />
      {errors.fullName && <p className="error-text">{errors.fullName}</p>}
    </div>

    <div>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="input-field"
      />
      {errors.email && <p className="error-text">{errors.email}</p>}
    </div>

    <div>
      <input
        type="text"
        placeholder="Adresse"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        className="input-field"
      />
      {errors.address && <p className="error-text">{errors.address}</p>}
    </div>

    <div>
      <input
        type="tel"
        placeholder="Téléphone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="input-field"
      />
      {errors.phone && <p className="error-text">{errors.phone}</p>}
    </div>

    <button type="submit" className="btn-primary input-field margin-top">
      Enregistrer
    </button>
  </form>
);

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Récupérer le thème depuis localStorage
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setIsDark(shouldBeDark);

    // Appliquer le thème
    document.documentElement.setAttribute(
      "data-theme",
      shouldBeDark ? "dark" : "light"
    );
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    const themeValue = newTheme ? "dark" : "light";
    localStorage.setItem("theme", themeValue);
    document.documentElement.setAttribute("data-theme", themeValue);
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Basculer vers le thème ${isDark ? "clair" : "sombre"}`}
      title={`Basculer vers le thème ${isDark ? "clair" : "sombre"}`}
    >
      {isDark ? "🌞" : "🌙"}
    </button>
  );
};

// Main component
export default function ProfilPage() {
  const { user, setUser, isLoggedIn, logout } = useAuth();
  const { notify } = useNotification();
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone_number || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      notify("Veuillez corriger les erreurs dans le formulaire", "error");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const { response, data } = await updateProfile(formData, token);

      if (response.ok) {
        const updatedUser = {
          ...user,
          fullName: formData.fullName,
          email: formData.email,
          address: formData.address,
          phone_number: formData.phone,
        };

        setUser(updatedUser);
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        setEditMode(false);
        notify("Profil mis à jour avec succès !", "success");
      } else {
        notify(
          data.message || "Erreur lors de la modification du profil",
          "error"
        );
      }
    } catch (err) {
      console.error("Erreur:", err);
      notify("Une erreur est survenue", "error");
    }
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="loading-container">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <Link href="/" className="back-link">
            Retour à l'accueil
          </Link>
          <ThemeToggle />
        </div>
        <ToastContainer />
      </header>

      <div className="profile-card">
        <h1 className="title">My profil</h1>

        {editMode ? (
          <ProfileForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onSubmit={handleSubmit}
          />
        ) : (
          <ProfileDisplay user={user} />
        )}
      </div>

      <div className="button-group">
        {!editMode && (
          <button onClick={() => setEditMode(true)} className="btn-primary">
            Modifier le profil
          </button>
        )}

        <button onClick={logout} className="btn-danger">
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
