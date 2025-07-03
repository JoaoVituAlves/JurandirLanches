'use client'
import UsuarioForm from "@/app/components/usuarioForm";
import httpClient from "@/app/utils/httpClient";
import { useEffect, useState } from "react";

export default function AlterarUsuario({ params: { id } }) {
  const [usuario, setUsuario] = useState(null);

  function carregarUsuario() {
    httpClient.get(`/usuario/obter/${id}`)
      .then(data => {
        setUsuario(data); // data já é o JSON
      })
      .catch(err => {
        console.error("Erro ao carregar usuário:", err);
      });
  }

  useEffect(() => {
    carregarUsuario();
  }, []);

  return (
    <>
      <div className="alterar-usuario-container">
        {usuario != null ? (
          <UsuarioForm usuario={usuario} />
        ) : (
          <div className="loading">
            <div className="spinner"></div>
            <h3>Carregando...</h3>
          </div>
        )}
      </div>

      <style jsx>{`
        .alterar-usuario-container {
          max-width: 700px;
          margin: 2rem auto;
          background: #fff;
          padding: 2rem 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(198, 40, 40, 0.1);
          color: #444;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 3rem 0;
          color: #c62828;
        }

        .spinner {
          width: 48px;
          height: 48px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #c62828;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        h3 {
          font-weight: 600;
          font-size: 1.2rem;
          user-select: none;
        }
      `}</style>
    </>
  );
}
