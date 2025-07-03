"use client";

import React, { useState, useEffect } from "react";
import httpClient from "../utils/httpClient";

export default function PedidoPage() {
  const [nome, setNome] = useState("");
  const [pao, setPao] = useState("");
  const [hamburguer, setHamburguer] = useState("");
  const [queijo, setQueijo] = useState("");
  const [acompanhamento, setAcompanhamento] = useState("");

  const [paes, setPaes] = useState([]);
  const [hamburgueres, setHamburgueres] = useState([]);
  const [queijos, setQueijos] = useState([]);
  const [acompanhamentos, setAcompanhamentos] = useState([]);

  useEffect(() => {
    async function carregarItens() {
      try {
        const paesData = await httpClient.get("/pao/listar");
        const hamburgueresData = await httpClient.get("/hamburguer/listar");
        const queijosData = await httpClient.get("/queijo/listar");
        const acompanhamentosData = await httpClient.get("/acompanhamento/listar");

        setPaes(paesData || []);
        setHamburgueres(hamburgueresData || []);
        setQueijos(queijosData || []);
        setAcompanhamentos(acompanhamentosData || []);
      } catch (err) {
        console.error("Erro ao carregar itens:", err);
        alert("Erro ao carregar os itens. Veja o console.");
      }
    }

    carregarItens();
  }, []);

  async function enviarPedido(e) {
    e.preventDefault();

    if (!nome || !pao || !hamburguer || !queijo || !acompanhamento) {
      alert("Preencha todos os campos antes de enviar!");
      return;
    }

    const payload = {
      nome,
      data: new Date().toISOString().slice(0, 19).replace("T", " "),
      pao: Number(pao),
      hamburguer: Number(hamburguer),
      queijo: Number(queijo),
      acompanhamento: Number(acompanhamento),
    };

    try {
      await httpClient.post("/pedido/cadastrar", payload);
      alert("Pedido cadastrado com sucesso!");
      setNome("");
      setPao("");
      setHamburguer("");
      setQueijo("");
      setAcompanhamento("");
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      alert(`Erro na requisição: ${error.message}`);
    }
  }

  return (
    <main>
      <h1>Formulário de Pedido</h1>
      <form onSubmit={enviarPedido}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <select value={pao} onChange={(e) => setPao(e.target.value)}>
          <option value="">Selecione o Pão</option>
          {paes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>

        <select value={hamburguer} onChange={(e) => setHamburguer(e.target.value)}>
          <option value="">Selecione o Hambúrguer</option>
          {hamburgueres.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>

        <select value={queijo} onChange={(e) => setQueijo(e.target.value)}>
          <option value="">Selecione o Queijo</option>
          {queijos.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>

        <select value={acompanhamento} onChange={(e) => setAcompanhamento(e.target.avalue)}>
          <option value="">Selecione o Acompanhamento</option>
          {acompanhamentos.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
        </select>

        <button type="submit">Enviar Pedido</button>
      </form>
    </main>
  );
}
