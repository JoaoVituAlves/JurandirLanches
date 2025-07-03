'use client'
import { useEffect, useState } from 'react';
import httpClient from './utils/httpClient';

export default function Home() {
  // States para armazenar listas
  const [paes, setPaes] = useState([]);
  const [hamburgueres, setHamburgueres] = useState([]);
  const [queijos, setQueijos] = useState([]);
  const [acompanhamentos, setAcompanhamentos] = useState([]);

  // States para o formulário
  const [nome, setNome] = useState('');
  const [pao, setPao] = useState('');
  const [hamburguer, setHamburguer] = useState('');
  const [queijo, setQueijo] = useState('');
  const [acompanhamento, setAcompanhamento] = useState('');

  // Carregar dados das listas ao montar o componente
  useEffect(() => {
    async function carregarListas() {
      try {
        const [resPao, resHam, resQueijo, resAcomp] = await Promise.all([
          httpClient.get('/pao/listar'),
          httpClient.get('/hamburguer/listar'),
          httpClient.get('/queijo/listar'),
          httpClient.get('/acompanhamento/listar'),
        ]);

        console.log('pães:', resPao);
        console.log('hamburgueres:', resHam);
        console.log('queijos:', resQueijo);
        console.log('acompanhamentos:', resAcomp);

        setPaes(resPao || []);
        setHamburgueres(resHam || []);
        setQueijos(resQueijo || []);
        setAcompanhamentos(resAcomp || []);

      } catch (error) {
        console.error('Erro ao carregar listas:', error);
      }
    }
    carregarListas();
  }, []);

  // Função para enviar o pedido
  async function enviarPedido(e) {
    e.preventDefault();

    if (!nome || !pao || !hamburguer || !queijo || !acompanhamento) {
      alert('Preencha todos os campos antes de enviar!');
      return;
    }

    try {
      const payload = {
        nome,
        data: new Date().toISOString().slice(0, 19).replace('T', ' '), // YYYY-MM-DD HH:mm:ss
        pao: Number(pao),
        hamburguer: Number(hamburguer),
        queijo: Number(queijo),
        acompanhamento: Number(acompanhamento),
      };

      const response = await httpClient.post('/pedido/cadastrar', payload);

      if (response.ok || response.success) {
        alert('Pedido cadastrado com sucesso!');

        // Salva no localStorage
        salvarPedidoLocal(payload);

        // Limpa os campos
        setNome('');
        setPao('');
        setHamburguer('');
        setQueijo('');
        setAcompanhamento('');
      } else {
        alert('Erro ao cadastrar pedido: ' + (response.msg || 'Erro desconhecido'));
      }
    } catch (error) {
      alert('Erro na requisição: ' + error.message);
    }
  }

  // Função para salvar o pedido no localStorage
  function salvarPedidoLocal(pedido) {
    const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidosSalvos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidosSalvos));
  }

  return (
    <>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand topbar mb-4 static-top shadow">
            <div className="navbar-brand">
              <h3><i className="fas fa-hamburger"></i> Jurandir Lanches</h3>
            </div>
            <ul className="navbar-nav ml-auto">
              <div className="topbar-divider d-none d-sm-block"></div>
              <li className="nav-item dropdown no-arrow">
                <a className="btn btn-warning" href="/admin">Acesso administrativo</a>
              </li>
            </ul>
          </nav>

          <div className="container-fluid">
            <div className="content-center">
              <img className="logo" src="Jurandir.png" alt="Logo Jurandir" />

              <div className="form-section">
                <h2>Faça o seu pedido abaixo:</h2>
                <form onSubmit={enviarPedido}>
                  <div className="form-group">
                    <label>Seu nome:</label>
                    <input
                      className="form-control"
                      type="text"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      required
                    />
                  </div>

                  <hr />
                  <h4>Monte o seu lanche:</h4>

                  <div className="form-group">
                    <label>Pão</label>
                    <select className="form-control" value={pao} onChange={e => setPao(e.target.value)} required>
                      <option value="">--Selecione--</option>
                      {paes.map(p => (
                        <option key={p.paoId} value={p.paoId}>{p.paoDescricao}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Hamburguer</label>
                    <select className="form-control" value={hamburguer} onChange={e => setHamburguer(e.target.value)} required>
                      <option value="">--Selecione--</option>
                      {hamburgueres.map(h => (
                        <option key={h.hamburguerId} value={h.hamburguerId}>{h.hamburguerDescricao}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Queijo</label>
                    <select className="form-control" value={queijo} onChange={e => setQueijo(e.target.value)} required>
                      <option value="">--Selecione--</option>
                      {queijos.map(q => (
                        <option key={q.queijoId} value={q.queijoId}>{q.queijoDescricao}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Acompanhamento</label>
                    <select className="form-control" value={acompanhamento} onChange={e => setAcompanhamento(e.target.value)} required>
                      <option value="">--Selecione--</option>
                      {acompanhamentos.map(a => (
                        <option key={a.id} value={a.id}>{a.descricao}</option>
                      ))}
                    </select>
                  </div>

                  <div className="btn-container">
                    <button type="submit" className="btn btn-success">Enviar pedido!</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Jurandir Lanches 2025</span>
            </div>
          </div>
        </footer>
      </div>

      {/* CSS estilizado */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

        * {
          box-sizing: border-box;
        }

        body, html, #content-wrapper, #content {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Montserrat', sans-serif;
          background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
          color: #333;
        }

        #content-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Navbar top */
        .navbar {
          background: #d32f2f;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          color: white;
        }

        .navbar-brand h3 {
          font-weight: 700;
          font-size: 1.8rem;
          letter-spacing: 1.5px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
        }

        .navbar-brand h3 i {
          font-size: 2rem;
        }

        .btn-warning {
          background-color: #fbc02d;
          border: none;
          font-weight: 600;
          color: #333;
          transition: background-color 0.3s ease;
          padding: 0.5rem 1.1rem;
          border-radius: 6px;
          text-decoration: none;
        }

        .btn-warning:hover {
          background-color: #f9a825;
          color: #fff;
        }

        .container-fluid {
          padding: 2rem 1rem 4rem 1rem;
          max-width: 700px;
          margin: 0 auto;
          width: 100%;
        }

        .content-center {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .logo {
          width: 100%;
          max-width: 600px;
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.25);
          transition: transform 0.3s ease;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .form-section {
          margin-top: 20px;
          width: 100%;
          max-width: 600px;
          background: white;
          border-radius: 14px;
          padding: 2rem 2.5rem;
          box-shadow: 0 12px 25px rgba(0,0,0,0.15);
        }

        h2, h4 {
          color: #333;
          text-align: center;
          margin-bottom: 1rem;
        }

        form {
          width: 100%;
        }

        .form-group {
          margin-bottom: 1.6rem;
        }

        label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: block;
          color: #444;
        }

        input.form-control,
        select.form-control {
          width: 100%;
          padding: 0.6rem 1rem;
          font-size: 1rem;
          border: 2px solid #ddd;
          border-radius: 8px;
          transition: border-color 0.3s ease;
          font-family: 'Montserrat', sans-serif;
        }

        input.form-control:focus,
        select.form-control:focus {
          outline: none;
          border-color: #ff4b2b;
          box-shadow: 0 0 8px #ff4b2baa;
        }

        hr {
          border: none;
          height: 1px;
          background: #ff4b2b;
          margin: 2rem 0;
          border-radius: 1px;
        }

        .btn-container {
          margin-top: 15px;
          display: flex;
          justify-content: center;
        }

        button.btn-success {
          background: linear-gradient(45deg, #00c853, #b2ff59);
          border: none;
          color: #222;
          font-weight: 700;
          padding: 0.75rem 1.8rem;
          font-size: 1.15rem;
          border-radius: 50px;
          cursor: pointer;
          width: 100%;
          max-width: 320px;
          box-shadow: 0 8px 20px rgba(0, 200, 83, 0.4);
          transition: all 0.3s ease;
        }

        button.btn-success:hover {
          background: linear-gradient(45deg, #00e676, #76ff03);
          color: #111;
          box-shadow: 0 12px 30px rgba(0, 230, 118, 0.6);
          transform: translateY(-3px);
        }

        footer.sticky-footer {
          background: #fff;
          padding: 1rem 0;
          box-shadow: 0 -6px 15px rgba(0,0,0,0.1);
          font-size: 0.9rem;
          color: #777;
          text-align: center;
          font-weight: 600;
          margin-top: auto;
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .container-fluid {
            padding: 1rem;
          }

          .form-section {
            padding: 1.5rem 1.8rem;
          }

          .navbar-brand h3 {
            font-size: 1.4rem;
          }

          .btn-warning {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }

          button.btn-success {
            max-width: 100%;
          }
        }

        @media (max-width: 400px) {
          .form-section {
            padding: 1rem 1rem;
          }
        }
      `}</style>
    </>
  );
}
