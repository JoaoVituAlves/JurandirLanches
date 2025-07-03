import Database from '../utils/database.js';

const banco = new Database();

export default class PedidoModel {
  #id;
  #nome;
  #data;
  #pao;
  #queijo;
  #hamburguer;
  #acompanhamento;

  constructor(id, nome, data, pao, queijo, hamburguer, acompanhamento) {
    this.#id = id;
    this.#nome = nome;
    this.#data = data;
    this.#pao = pao;
    this.#queijo = queijo;
    this.#hamburguer = hamburguer;
    this.#acompanhamento = acompanhamento;
  }

  get id() { return this.#id; }
  set id(id) { this.#id = id; }

  get nome() { return this.#nome; }
  set nome(nome) { this.#nome = nome; }

  get data() { return this.#data; }
  set data(data) { this.#data = data; }

  get pao() { return this.#pao; }
  set pao(pao) { this.#pao = pao; }

  get queijo() { return this.#queijo; }
  set queijo(queijo) { this.#queijo = queijo; }

  get hamburguer() { return this.#hamburguer; }
  set hamburguer(hamburguer) { this.#hamburguer = hamburguer; }

  get acompanhamento() { return this.#acompanhamento; }
  set acompanhamento(acompanhamento) { this.#acompanhamento = acompanhamento; }

  async cadastrar() {
    const sql = `
      INSERT INTO tb_pedido 
      (ped_nome, ped_data, pao_id, que_id, ham_id, aco_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const valores = [
      this.#nome,
      this.#data,
      this.#pao,
      this.#queijo,
      this.#hamburguer,
      this.#acompanhamento
    ];

    try {
      const result = await banco.ExecutaComandoNonQuery(sql, valores);

      // result deve conter insertId
      if (result && result.insertId) {
        this.#id = result.insertId;
      }

      return result;
    } catch (error) {
      console.error('Erro no cadastrar PedidoModel:', error);
      throw error;
    }
  }

  async listar() {
  const sql = `
    SELECT p.*, 
           pao.pao_descricao, 
           que.que_descricao, 
           ham.ham_descricao, 
           aco.aco_descricao
    FROM tb_pedido p
    LEFT JOIN tb_pao pao ON p.pao_id = pao.pao_id
    LEFT JOIN tb_queijo que ON p.que_id = que.que_id
    LEFT JOIN tb_hamburguer ham ON p.ham_id = ham.ham_id
    LEFT JOIN tb_acompanhamento aco ON p.aco_id = aco.aco_id
  `;

  const rows = await banco.ExecutaComando(sql);

  const lista = rows.map(row => ({
    id: row.ped_id,
    nome: row.ped_nome,
    data: row.ped_data,
    pao: {
      id: row.pao_id,
      descricao: row.pao_descricao
    },
    queijo: {
      id: row.que_id,
      descricao: row.que_descricao
    },
    hamburguer: {
      id: row.ham_id,
      descricao: row.ham_descricao
    },
    acompanhamento: {
      id: row.aco_id,
      descricao: row.aco_descricao
    }
  }));

  return lista;
}
async alterar() {
  const sql = `
    UPDATE tb_pedido
    SET ped_nome = ?, ped_data = ?, pao_id = ?, que_id = ?, ham_id = ?, aco_id = ?
    WHERE ped_id = ?
  `;

  const valores = [
    this.#nome,
    this.#data,
    this.#pao,
    this.#queijo,
    this.#hamburguer,
    this.#acompanhamento,
    this.#id
  ];

  const result = await banco.ExecutaComandoNonQuery(sql, valores);
  return result;
}

 async obter(id) {
  const sql = `
    SELECT p.ped_id, p.ped_nome, p.ped_data,
           pao.pao_id, pao.pao_descricao,
           que.que_id, que.que_descricao,
           ham.ham_id, ham.ham_descricao,
           aco.aco_id, aco.aco_descricao
    FROM tb_pedido p
    LEFT JOIN tb_pao pao ON p.pao_id = pao.pao_id
    LEFT JOIN tb_queijo que ON p.que_id = que.que_id
    LEFT JOIN tb_hamburguer ham ON p.ham_id = ham.ham_id
    LEFT JOIN tb_acompanhamento aco ON p.aco_id = aco.aco_id
    WHERE p.ped_id = ?
  `;

  const rows = await banco.ExecutaComando(sql, [id]);

  if (rows.length === 0) return null;

  const row = rows[0];

  // Monta o objeto no formato esperado pelo frontend:
  return {
    id: row.ped_id,
    nome: row.ped_nome,
    data: row.ped_data,
    pao: {
      id: row.pao_id,
      descricao: row.pao_descricao
    },
    queijo: {
      id: row.que_id,
      descricao: row.que_descricao
    },
    hamburguer: {
      id: row.ham_id,
      descricao: row.ham_descricao
    },
    acompanhamento: {
      id: row.aco_id,
      descricao: row.aco_descricao
    }
  };
}

  async excluir(id) {
    const sql = `DELETE FROM tb_pedido WHERE ped_id = ?`;
    const result = await banco.ExecutaComandoNonQuery(sql, [id]);
    return result;
  }
}
