"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginResponse {
  success: boolean;
  nombreCompleto?: string;
  boleto?: string;
  mensaje?: string;
}

export default function Home() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contraseña }),
      });

      const data: LoginResponse = await response.json();

      if (data.success) {
        // Redirige automáticamente a /bienvenida
        router.push("/bienvenida");
      } else {
        setMensaje(data.mensaje || "Datos incorrectos, intenta de nuevo.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Hubo un error al conectarse al servidor.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Registro de Visitantes - GreenPark</h1>
      <form onSubmit={handleLogin} style={{ display: "inline-block", marginTop: "30px" }}>
        <div>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            style={{ padding: "8px", marginBottom: "10px", width: "250px" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            style={{ padding: "8px", marginBottom: "20px", width: "250px" }}
          />
        </div>
        <button
          type="submit"
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Iniciar Sesión
        </button>
      </form>

      {mensaje && (
        <div style={{ marginTop: "20px", fontSize: "18px", color: "red" }}>
          {mensaje}
        </div>
      )}
    </div>
  );
}