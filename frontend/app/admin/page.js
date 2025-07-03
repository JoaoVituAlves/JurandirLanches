'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const [usuarioNome, setUsuarioNome] = useState('');
  const router = useRouter();

  useEffect(() => {
    const nome = localStorage.getItem('usuarioNome');
    if (nome) {
      setUsuarioNome(nome);
    }
  }, []);

  return (
    <main className="admin-dashboard">
      <h1>Bem-vindo, {usuarioNome || 'Administrador'}!</h1>
      <p>Você está autenticado e acessando a <strong>Área Administrativa</strong> do sistema Jurandir Lanches.</p>
      
      <section className="admin-summary">
        <div
          className="card card-clickable"
          onClick={() => router.push('/admin/pedidos')}
        >
          <h2>📦 Pedidos</h2>
          <p>Acompanhe e gerencie todos os pedidos feitos.</p>
        </div>

        <div
          className="card card-clickable"
          onClick={() => router.push('/admin/usuarios')}
        >
          <h2>👥 Usuários</h2>
          <p>Visualize e administre os usuários do sistema.</p>
        </div>
      </section>

      <style jsx>{`
        .admin-dashboard {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 2rem;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(198, 40, 40, 0.15);
          color: #333;
          font-family: 'Montserrat', sans-serif;
        }

        h1 {
          color: #c62828;
          font-size: 2rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        p {
          font-size: 1.1rem;
          text-align: center;
          margin-bottom: 2rem;
        }

        .admin-summary {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
        }

        .card {
          flex: 1 1 250px;
          background: #fce4ec;
          border: 2px solid #f8bbd0;
          border-radius: 10px;
          padding: 1.5rem;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(198, 40, 40, 0.3);
        }

        .card h2 {
          margin-bottom: 0.8rem;
          color: #ad1457;
        }

        .card p {
          color: #6a1b1b;
        }

        .card-clickable {
          cursor: pointer;
        }

        @media (max-width: 600px) {
          .admin-dashboard {
            padding: 1.5rem 1rem;
          }

          .admin-summary {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </main>
  );
}
