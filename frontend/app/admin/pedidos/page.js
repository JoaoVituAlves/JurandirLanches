'use client'
import httpClient from "@/app/utils/httpClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Pedidos() {
  const [listaPedido, setListaPedido] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");

  async function carregarPedidos() {
    try {
      const data = await httpClient.get('/pedido/listar');
      setListaPedido(data);
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
      alert("Erro ao listar pedidos. Veja o console.");
    }
  }

  async function excluirPedido(id) {
    if (confirm("Tem certeza que deseja excluir o pedido?")) {
      try {
        const data = await httpClient.post('/pedido/excluir', { pedidoId: id });
        alert(data.msg || "Pedido excluído com sucesso!");
        carregarPedidos();
      } catch (error) {
        console.error("Erro ao excluir pedido:", error);
        alert("Erro ao excluir pedido. Veja o console.");
      }
    }
  }

  useEffect(() => {
    carregarPedidos();
  }, []);

  const pedidosFiltrados = listaPedido.filter(p =>
    p.nome.toLowerCase().includes(filtroNome.toLowerCase())
  );

  return (
    <>
      <div className="pedidos-container">
        <div className="pedidos-header">
          <h1>Pedidos cadastrados</h1>
        </div>

        <div className="filtro-nome">
          <input
            type="text"
            placeholder="Filtrar por nome..."
            value={filtroNome}
            onChange={e => setFiltroNome(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          {pedidosFiltrados.length > 0 ? (
            <table className="table table-hover pedidos-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Nome</th>
                  <th>Data</th>
                  <th>Pão</th>
                  <th>Hambúrguer</th>
                  <th>Queijo</th>
                  <th>Acompanhamento</th>
                  <th className="acoes-coluna">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{pedido.nome}</td>
                    <td>{new Date(pedido.data).toLocaleString()}</td>
                    <td>{pedido.pao?.descricao || '-'}</td>
                    <td>{pedido.hamburguer?.descricao || '-'}</td>
                    <td>{pedido.queijo?.descricao || '-'}</td>
                    <td>{pedido.acompanhamento?.descricao || '-'}</td>
                    <td className="acoes-coluna">
                      <Link
                        href={`/admin/pedidos/alterar/${pedido.id}`}
                        className="btn btn-edit"
                        title="Editar pedido"
                        aria-label={`Editar pedido ${pedido.id}`}
                      >
                        <i className="fas fa-pen"></i>
                      </Link>
                      <button
                        onClick={() => excluirPedido(pedido.id)}
                        className="btn btn-delete"
                        title="Excluir pedido"
                        aria-label={`Excluir pedido ${pedido.id}`}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="sem-pedidos-msg">Nenhum pedido encontrado.</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .pedidos-container {
          padding: 2rem 1.5rem;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgb(198 40 40 / 0.1);
          max-width: 1000px;
          margin: 0 auto;
        }

        .pedidos-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .filtro-nome {
          margin-bottom: 1rem;
        }

        .filtro-nome input {
          width: 100%;
          max-width: 300px;
          padding: 0.5rem 0.75rem;
          font-size: 1rem;
          border: 2px solid #c62828;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .filtro-nome input:focus {
          border-color: #a32020;
          box-shadow: 0 0 6px rgba(198, 40, 40, 0.5);
        }

        h1 {
          font-weight: 700;
          font-size: 1.8rem;
          color: #c62828;
          margin: 0;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .pedidos-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 12px;
          font-size: 0.95rem;
          color: #444;
          min-width: 700px;
        }

        thead tr {
          background-color: #f8bbd0;
          color: #6a1b1b;
          text-transform: uppercase;
          font-weight: 700;
        }

        thead th {
          padding: 12px 15px;
          text-align: left;
        }

        tbody tr {
          background-color: #fff;
          box-shadow: 0 2px 5px rgb(0 0 0 / 0.05);
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

        .sem-pedidos-msg {
          font-size: 1.1rem;
          color: #999;
          margin-top: 2rem;
          text-align: center;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .pedidos-container {
            padding: 1rem;
          }

          .pedidos-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .acoes-coluna {
            width: auto;
          }

          .pedidos-table {
            min-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
