"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

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
  <div>
    <div style={{ marginBottom: 15 }}>
      <strong>Name:</strong> {user.fullName}
    </div>
    <div style={{ marginBottom: 15 }}>
      <strong>Email:</strong> {user.email}
    </div>
    <div style={{ marginBottom: 15 }}>
      <strong>Adress:</strong> {user.address}
    </div>
    <div style={{ marginBottom: 15 }}>
      <strong>Phone number:</strong> {user.phone_number}
    </div>
    {user.id && (
      <div style={{ marginBottom: 15 }}>
        <strong>ID user:</strong> {user.id}
      </div>
    )}
  </div>
);

const ProfileForm = ({ formData, setFormData, errors, onSubmit }) => (
  <form
    onSubmit={onSubmit}
    style={{
      maxWidth: 400,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 10,
    }}
  >
    <div>
      <input
        type="text"
        placeholder="Nom complet"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        style={{ width: "100%", padding: 8 }}
      />
      {errors.fullName && (
        <p style={{ color: "red", fontSize: 12 }}>{errors.fullName}</p>
      )}
    </div>

    <div>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        style={{ width: "100%", padding: 8 }}
      />
      {errors.email && (
        <p style={{ color: "red", fontSize: 12 }}>{errors.email}</p>
      )}
    </div>

    <div>
      <input
        type="text"
        placeholder="Adresse"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        style={{ width: "100%", padding: 8 }}
      />
      {errors.address && (
        <p style={{ color: "red", fontSize: 12 }}>{errors.address}</p>
      )}
    </div>

    <div>
      <input
        type="tel"
        placeholder="Téléphone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        style={{ width: "100%", padding: 8 }}
      />
      {errors.phone && (
        <p style={{ color: "red", fontSize: 12 }}>{errors.phone}</p>
      )}
    </div>

    <button
      type="submit"
      style={{
        padding: "10px 20px",
        backgroundColor: "#2C6E49",
        color: "white",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        marginTop: 10,
      }}
    >
      Enregistrer
    </button>
  </form>
);

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
        <ToastContainer />
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

      <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
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
        )}

        <button
          onClick={logout}
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
