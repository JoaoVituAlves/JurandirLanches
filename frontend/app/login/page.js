'use client'
import { useRef } from 'react'
import httpClient from '../utils/httpClient'

export default function Login() {
  const email = useRef('')
  const senha = useRef('')

  async function autenticar() {
    if (!email.current.value || !senha.current.value) {
      alert('Preencha os campos corretamente!')
      return
    }

    try {
      const data = await httpClient.post('/login/autenticar', {
        email: email.current.value,
        senha: senha.current.value,
      })

      alert(data.msg)
      if (data.msg === 'Usuário autenticado!') {
        window.location.href = '/admin'
      }
    } catch (error) {
      alert(error.message || 'Erro ao tentar autenticar.')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Entrar no Sistema</h2>

        <form onSubmit={(e) => { e.preventDefault(); autenticar(); }}>
          <label>Email</label>
          <input type="email" placeholder="Digite seu email" ref={email} />

          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" ref={senha} />

          <button type="submit">Entrar</button>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to bottom right, #cbd5e1, #a5b4fc);
        }

        .login-box {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        h2 {
          text-align: center;
          color: #4f46e5;
          margin-bottom: 24px;
          font-size: 24px;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 14px;
          margin-bottom: 6px;
          color: #333;
        }

        input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
        }

        button {
          padding: 12px;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #4338ca;
        }
      `}</style>
    </div>
  )
}
