'use client'
import { useEffect, useRef, useState } from "react";
import httpClient from "../utils/httpClient";

export default function UsuarioForm(props) {
  const nome = useRef("");
  const email = useRef("");
  const perfil = useRef(0);
  const senha = useRef("");
  const ativo = useRef(false);

  const [usuario, setUsuario] = props.usuario
    ? useState(props.usuario)
    : useState({ id: 0, nome: "", email: "", perfilId: 0, ativo: "N", senha: "" });

  const [listaPerfil, setListaPerfil] = useState([]);

  function carregarPerfil() {
    httpClient.get('/perfil/listar')
      .then(data => {
        setListaPerfil(data);
      })
      .catch(err => {
        console.error("Erro ao carregar perfis:", err);
      });
  }

  function alterarUsuario() {
    if (
      nome.current.value !== "" &&
      email.current.value !== "" &&
      perfil.current.value != 0 &&
      senha.current.value !== ""
    ) {
      httpClient.put('/usuario/alterar', {
        id: usuario.id,
        nome: nome.current.value,
        email: email.current.value,
        perfilId: perfil.current.value,
        senha: senha.current.value,
        ativo: ativo.current.checked ? "S" : "N"
      })
      .then(data => {
        alert(data.msg);
        window.location.href = "/admin/usuarios";
      })
      .catch(err => {
        console.error("Erro ao alterar usuário:", err);
      });
    } else {
      alert("Preencha os campos corretamente!");
    }
  }

  function cadastrarUsuario() {
    if (
      nome.current.value !== "" &&
      email.current.value !== "" &&
      perfil.current.value != 0 &&
      senha.current.value !== ""
    ) {
      httpClient.post('/usuario/criar', {
        nome: nome.current.value,
        email: email.current.value,
        perfilId: perfil.current.value,
        senha: senha.current.value,
        ativo: ativo.current.checked ? "S" : "N"
      })
      .then(data => {
        alert(data.msg);
        nome.current.value = "";
        email.current.value = "";
        perfil.current.value = 0;
        senha.current.value = "";
        ativo.current.checked = false;
      })
      .catch(err => {
        console.error("Erro ao cadastrar usuário:", err);
      });
    } else {
      alert("Preencha os campos corretamente!");
    }
  }

  useEffect(() => {
    carregarPerfil();
  }, []);

  return (
    <>
      <div className="usuario-form-container">
        <h1>{usuario.id !== 0 ? "Alterar usuário" : "Cadastrar usuário"}</h1>

        <form
          onSubmit={e => {
            e.preventDefault();
            usuario.id !== 0 ? alterarUsuario() : cadastrarUsuario();
          }}
          className="usuario-form"
          noValidate
        >
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              id="nome"
              defaultValue={usuario.nome}
              ref={nome}
              type="text"
              className="form-control"
              placeholder="Digite o nome"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              defaultValue={usuario.email}
              ref={email}
              type="email"
              className="form-control"
              placeholder="Digite o email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="perfil">Perfil:</label>
            <select
              id="perfil"
              defaultValue={usuario.perfilId}
              ref={perfil}
              className="form-control"
              required
            >
              <option value={0} disabled>--Selecione--</option>
              {listaPerfil.map((value, index) => (
                <option key={index} value={value.perfilId}>
                  {value.perfilDescricao}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              id="senha"
              defaultValue={usuario.senha}
              ref={senha}
              type="password"
              className="form-control"
              placeholder="Digite a senha"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              id="ativo"
              defaultChecked={usuario.ativo === "S"}
              ref={ativo}
              type="checkbox"
            />
            <label htmlFor="ativo" className="checkbox-label">Ativo</label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {usuario.id !== 0 ? "Alterar" : "Cadastrar"}
            </button>
            <a href="/admin/usuarios" className="btn btn-secondary">
              Voltar
            </a>
          </div>
        </form>
      </div>

      <style jsx>{`
        .usuario-form-container {
          max-width: 600px;
          margin: 2rem auto;
          background: #fff;
          padding: 2.5rem 3rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(198, 40, 40, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #444;
        }

        h1 {
          color: #c62828;
          font-weight: 700;
          margin-bottom: 2rem;
          user-select: none;
          text-align: center;
        }

        .usuario-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #6a1b1b;
          user-select: none;
        }

        .form-control {
          padding: 0.5rem 0.75rem;
          font-size: 1rem;
          border: 1.8px solid #ccc;
          border-radius: 8px;
          transition: border-color 0.3s ease;
          outline-offset: 2px;
        }
        .form-control:focus {
          border-color: #c62828;
          box-shadow: 0 0 5px #f48fb1aa;
        }

        .checkbox-group {
          flex-direction: row;
          align-items: center;
          gap: 0.6rem;
          margin-top: 0.3rem;
        }
        .checkbox-label {
          font-weight: 600;
          color: #6a1b1b;
          user-select: none;
          cursor: pointer;
        }
        input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #c62828;
        }

        .form-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .btn {
          padding: 0.55rem 1.6rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          user-select: none;
          transition: background-color 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: white;
          font-size: 1rem;
        }

        .btn-primary {
          background-color: #c62828;
        }
        .btn-primary:hover {
          background-color: #a32020;
        }

        .btn-secondary {
          background-color: #777;
          color: #eee;
          text-align: center;
          padding: 0.55rem 1.6rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          user-select: none;
        }
        .btn-secondary:hover {
          background-color: #555;
          color: #fff;
        }

        @media (max-width: 480px) {
          .usuario-form-container {
            padding: 2rem 1.5rem;
          }
          .form-actions {
            flex-direction: column;
          }
          .btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
