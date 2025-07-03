'use client'
import httpClient from "@/app/utils/httpClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Usuarios() {
  const [listaUsuario, setListaUsuarios] = useState([]);

  async function carregarUsuarios() {
    try {
      const data = await httpClient.get('/usuario/listar');
      setListaUsuarios(data);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
    }
  }

  async function excluirUsuario(id) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        const data = await httpClient.delete(`/usuario/excluir/${id}`);
        alert(data.msg || "Usuário excluído com sucesso!");
        carregarUsuarios();
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
        alert("Erro ao excluir usuário, tente novamente.");
      }
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <>
      <div className="usuarios-container">
        <div className="usuarios-header">
          <h1>Usuários cadastrados</h1>
          <Link href="/admin/usuarios/criar" className="btn btn-primary btn-cadastrar">
            <i className="fas fa-user-plus"></i> Cadastrar usuário
          </Link>
        </div>

        <div className="table-responsive">
          {listaUsuario.length > 0 ? (
            <table className="table table-hover usuarios-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Perfil</th>
                  <th>Ativo</th>
                  <th className="acoes-coluna">Ações</th>
                </tr>
              </thead>
              <tbody>
                {listaUsuario.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.perfilId}</td>
                    <td>
                      <span className={`status-badge ${usuario.ativo === "S" ? "ativo" : "inativo"}`}>
                        {usuario.ativo === "S" ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="acoes-coluna">
                      <Link
                        href={`/admin/usuarios/alterar/${usuario.id}`}
                        className="btn btn-edit"
                        title="Editar usuário"
                        aria-label={`Editar usuário ${usuario.nome}`}
                      >
                        <i className="fas fa-pen"></i>
                      </Link>
                      <button
                        onClick={() => excluirUsuario(usuario.id)}
                        className="btn btn-delete"
                        title="Excluir usuário"
                        aria-label={`Excluir usuário ${usuario.nome}`}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="sem-usuarios-msg">Nenhum usuário encontrado.</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .usuarios-container {
          padding: 2rem 1.5rem;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgb(198 40 40 / 0.1);
          max-width: 1000px;
          margin: 0 auto;
        }

        .usuarios-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        h1 {
          font-weight: 700;
          font-size: 1.8rem;
          color: #c62828;
          margin: 0;
        }

        .btn-cadastrar {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #c62828;
          border: none;
          color: white;
          padding: 0.6rem 1.2rem;
          font-weight: 600;
          border-radius: 6px;
          text-decoration: none;
          transition: background-color 0.3s ease;
          cursor: pointer;
          user-select: none;
        }
        .btn-cadastrar:hover {
          background-color: #a32020;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .usuarios-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 12px;
          font-size: 0.95rem;
          color: #444;
          min-width: 600px;
        }

        thead tr {
          background-color: #f8bbd0;
          color: #6a1b1b;
          text-transform: uppercase;
          font-weight: 700;
          border-radius: 12px;
          box-shadow: 0 3px 8px rgb(198 40 40 / 0.2);
        }

        thead th {
          padding: 12px 15px;
          text-align: left;
          user-select: none;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }

        tbody tr {
          background-color: #fff;
          box-shadow: 0 2px 5px rgb(0 0 0 / 0.05);
          border-radius: 10px;
          transition: box-shadow 0.3s ease;
        }
        tbody tr:hover {
          box-shadow: 0 5px 15px rgb(198 40 40 / 0.15);
        }

        tbody td {
          padding: 12px 15px;
          vertical-align: middle;
        }

        .acoes-coluna {
          white-space: nowrap;
          width: 130px;
        }

        .btn-edit,
        .btn-delete {
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          padding: 6px 10px;
          border-radius: 6px;
          margin-right: 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.25s ease;
          user-select: none;
        }

        .btn-edit {
          background-color: #4caf50;
          color: white;
        }
        .btn-edit:hover {
          background-color: #388e3c;
        }

        .btn-delete {
          background-color: #e53935;
          color: white;
        }
        .btn-delete:hover {
          background-color: #ab000d;
        }

        /* Ícones */
        .btn-edit i,
        .btn-delete i,
        .btn-cadastrar i {
          pointer-events: none;
        }

        /* Status badges */
        .status-badge {
          padding: 0.3rem 0.7rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.85rem;
          color: white;
          user-select: none;
          display: inline-block;
          min-width: 60px;
          text-align: center;
        }

        .status-badge.ativo {
          background-color: #4caf50;
          box-shadow: 0 0 6px #4caf5077;
        }

        .status-badge.inativo {
          background-color: #bdbdbd;
          color: #555;
        }

        .sem-usuarios-msg {
          font-size: 1.1rem;
          color: #999;
          margin-top: 2rem;
          text-align: center;
          font-style: italic;
          user-select: none;
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .usuarios-container {
            padding: 1rem;
          }

          .usuarios-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .acoes-coluna {
            width: auto;
          }

          .usuarios-table {
            min-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
