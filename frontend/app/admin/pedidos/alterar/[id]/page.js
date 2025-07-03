'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import httpClient from "@/app/utils/httpClient";

export default function AlterarPedido({ params: { id } }) {
  const router = useRouter();

  // Estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [pao, setPao] = useState("");
  const [hamburguer, setHamburguer] = useState("");
  const [queijo, setQueijo] = useState("");
  const [acompanhamento, setAcompanhamento] = useState("");

  // Listas para os selects
  const [paes, setPaes] = useState([]);
  const [hamburgueres, setHamburgueres] = useState([]);
  const [queijos, setQueijos] = useState([]);
  const [acompanhamentos, setAcompanhamentos] = useState([]);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [paesData, hamburgueresData, queijosData, acompanhamentosData, pedidoData] = await Promise.all([
          httpClient.get("/pao/listar"),
          httpClient.get("/hamburguer/listar"),
          httpClient.get("/queijo/listar"),
          httpClient.get("/acompanhamento/listar"),
          httpClient.get(`/pedido/obter/${id}`),
        ]);

        setPaes(paesData || []);
        setHamburgueres(hamburgueresData || []);
        setQueijos(queijosData || []);
        setAcompanhamentos(acompanhamentosData || []);

        if (!pedidoData) {
          alert("Pedido não encontrado.");
          router.push("/admin/pedidos");
          return;
        }

        setNome(pedidoData.nome || "");
        if (pedidoData.data) {
          setData(pedidoData.data.slice(0, 10));
        }
        setPao(pedidoData.pao?.paoId?.toString() || "");
        setHamburguer(pedidoData.hamburguer?.hamburguerId?.toString() || "");
        setQueijo(pedidoData.queijo?.queijoId?.toString() || "");
        setAcompanhamento(pedidoData.acompanhamento?.id?.toString() || "");

        setCarregando(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar dados. Veja o console.");
        router.push("/admin/pedidos");
      }
    }

    carregarDados();
  }, [id, router]);

  async function alterarPedido(e) {
    e.preventDefault();

    if (!nome || !data || !pao || !hamburguer || !queijo || !acompanhamento) {
      alert("Preencha todos os campos antes de enviar!");
      return;
    }

    const payload = {
      id: Number(id),
      nome,
      data: data + " 00:00:00",
      pao: Number(pao),
      hamburguer: Number(hamburguer),
      queijo: Number(queijo),
      acompanhamento: Number(acompanhamento),
    };

    try {
      const response = await httpClient.put("/pedido/alterar", payload);
      alert(response.msg);
      router.push("/admin/pedidos");
    } catch (error) {
      console.error("Erro ao alterar pedido:", error);
      alert("Erro ao alterar pedido. Veja o console.");
    }
  }

  if (carregando) return <h3>Carregando...</h3>;

  return (
    <main className="alterar-pedido-container">
      <h1>Alterar Pedido</h1>
      <form onSubmit={alterarPedido}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={e => setData(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Pão:</label>
          <select
            value={pao}
            onChange={e => setPao(e.target.value)}
            className="form-control"
          >
            <option value="">--Selecione o Pão--</option>
            {paes.map(p => (
              <option key={p.paoId} value={p.paoId}>
                {p.paoDescricao}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Hambúrguer:</label>
          <select
            value={hamburguer}
            onChange={e => setHamburguer(e.target.value)}
            className="form-control"
          >
            <option value="">--Selecione o Hambúrguer--</option>
            {hamburgueres.map(h => (
              <option key={h.hamburguerId} value={h.hamburguerId}>
                {h.hamburguerDescricao}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Queijo:</label>
          <select
            value={queijo}
            onChange={e => setQueijo(e.target.value)}
            className="form-control"
          >
            <option value="">--Selecione o Queijo--</option>
            {queijos.map(q => (
              <option key={q.queijoId} value={q.queijoId}>
                {q.queijoDescricao}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Acompanhamento:</label>
          <select
            value={acompanhamento}
            onChange={e => setAcompanhamento(e.target.value)}
            className="form-control"
          >
            <option value="">--Selecione o Acompanhamento--</option>
            {acompanhamentos.map(a => (
              <option key={a.id} value={a.id}>
                {a.descricao}
              </option>
            ))}
          </select>
        </div>

        <div className="botoes-container">
          <button type="submit" className="btn btn-primary">
            Alterar Pedido
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => router.push("/admin/pedidos")}
          >
            Voltar
          </button>
        </div>
      </form>

      <style jsx>{`
        .alterar-pedido-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem 1.5rem;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(198, 40, 40, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: #333;
        }

        h1 {
          font-weight: 700;
          font-size: 2rem;
          color: #c62828;
          margin-bottom: 1.5rem;
          text-align: center;
          user-select: none;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        label {
          font-weight: 600;
          margin-bottom: 0.4rem;
          color: #6a1b1b;
          user-select: none;
        }

        .form-control {
          padding: 0.5rem 0.75rem;
          font-size: 1rem;
          border: 2px solid #c62828;
          border-radius: 8px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          outline-offset: 2px;
          outline-color: transparent;
        }

        .form-control::placeholder {
          color: #bca5a5;
        }

        .form-control:focus {
          border-color: #a32020;
          box-shadow: 0 0 6px rgba(198, 40, 40, 0.5);
          outline-color: #a32020;
        }

        select.form-control {
          background-color: #fff;
          appearance: none;
          background-image:
            url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8"><path fill="none" stroke="%23a32020" stroke-width="2" d="M1 1l5 5 5-5"/></svg>');
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 12px 8px;
          cursor: pointer;
        }

        .botoes-container {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }

        .btn-primary {
          background-color: #c62828;
          border: none;
          color: white;
          padding: 0.7rem 1.2rem;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          user-select: none;
          min-width: 160px;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .btn-primary:hover {
          background-color: #a32020;
          box-shadow: 0 4px 12px rgba(163, 32, 32, 0.6);
        }

        .btn-secondary {
          background-color: #6c757d;
          border: none;
          color: white;
          padding: 0.7rem 1.2rem;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          user-select: none;
          min-width: 160px;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .btn-secondary:hover {
          background-color: #5a6268;
          box-shadow: 0 4px 12px rgba(90, 98, 104, 0.6);
        }

        @media (max-width: 480px) {
          .alterar-pedido-container {
            margin: 1rem;
            padding: 1.5rem 1rem;
          }
          h1 {
            font-size: 1.5rem;
          }
          .botoes-container {
            flex-direction: column;
          }
          .btn-primary,
          .btn-secondary {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </main>
  );
}
