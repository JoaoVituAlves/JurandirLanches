import PedidoModel from '../models/pedidoModel.js';

export default class PedidoController {

  async listar(req, res) {
    try {
      const pedido = new PedidoModel();
      const listaPedidos = await pedido.listar();
      res.json(listaPedidos);
    } catch (error) {
      res.status(500).send({ ok: false, msg: 'Erro ao listar pedidos', detalhes: error.message });
    }
  }

  async obter(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400).send({ ok: false, msg: "ID inválido ou não informado" });
    }

    const pedidoModel = new PedidoModel();
    const pedido = await pedidoModel.obter(id);

    if (pedido) {
      res.json(pedido);
    } else {
      res.status(404).send({ ok: false, msg: "Pedido não encontrado" });
    }
  } catch (error) {
    res.status(500).send({ ok: false, msg: "Erro ao obter pedido", detalhes: error.message });
  }
}


  async cadastrar(req, res) {
    try {
      const { nome, data, pao, queijo, hamburguer, acompanhamento } = req.body;

      if (nome && data && pao && queijo && hamburguer && acompanhamento) {
        const pedido = new PedidoModel(0, nome, data, pao, queijo, hamburguer, acompanhamento);
        const result = await pedido.cadastrar();

        if (result && result.insertId) {
          res.status(201).send({ ok: true, msg: "Pedido cadastrado com sucesso!" });
        } else {
          res.status(400).send({ ok: false, msg: "Erro ao cadastrar pedido!" });
        }
      } else {
        res.status(400).send({ ok: false, msg: "Parâmetros preenchidos incorretamente!" });
      }
    } catch (error) {
      res.status(500).send({ ok: false, msg: "Erro ao processar cadastro", detalhes: error.message });
    }
  }

  async alterar(req, res) {
    try {
      const { id, nome, data, pao, queijo, hamburguer, acompanhamento } = req.body;

      if (id && nome && data && pao && queijo && hamburguer && acompanhamento) {
        const pedido = new PedidoModel(id, nome, data, pao, queijo, hamburguer, acompanhamento);
        const result = await pedido.alterar();

        if (result && result.affectedRows > 0) {
          res.send({ ok: true, msg: "Pedido alterado com sucesso!" });
        } else {
          res.status(404).send({ ok: false, msg: "Pedido não encontrado para alteração!" });
        }
      } else {
        res.status(400).send({ ok: false, msg: "Parâmetros preenchidos incorretamente!" });
      }
    } catch (error) {
      res.status(500).send({ ok: false, msg: "Erro ao processar alteração", detalhes: error.message });
    }
  }

  async excluir(req, res) {
    try {
      const { pedidoId } = req.body;

      if (pedidoId != null) {
        const pedido = new PedidoModel();
        const result = await pedido.excluir(pedidoId);

        if (result && result.affectedRows > 0) {
          res.send({ ok: true, msg: "Pedido excluído!" });
        } else {
          res.status(404).send({ ok: false, msg: "Pedido não encontrado para exclusão!" });
        }
      } else {
        res.status(400).send({ ok: false, msg: "O id da exclusão não foi enviado!" });
      }
    } catch (error) {
      res.status(500).send({ ok: false, msg: "Erro ao excluir pedido", detalhes: error.message });
    }
  }

}
