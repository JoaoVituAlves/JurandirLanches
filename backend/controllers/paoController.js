import PaoModel from '../models/paoModel.js';

export default class PaoController {

  // Listar todos os pães
  async listar(req, res) {
    try {
      const model = new PaoModel();
      const lista = await model.listar();
      const listaJson = lista.map(item => ({
        paoId: item.paoId,
        paoDescricao: item.paoDescricao
      }));
      res.status(200).json(listaJson);
    } catch (e) {
      res.status(500).json({ msg: "Erro ao listar pães", erro: e.message });
    }
  }

  // Obter pão por ID
  async obter(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ msg: "ID inválido" });

      const model = new PaoModel();
      const pao = await model.obterPorId(id);

      if (!pao) return res.status(404).json({ msg: "Pão não encontrado" });

      res.status(200).json({
        paoId: pao.paoId,
        paoDescricao: pao.paoDescricao
      });
    } catch (e) {
      res.status(500).json({ msg: "Erro ao obter pão", erro: e.message });
    }
  }

  // Criar novo pão
  async criar(req, res) {
    try {
      const { descricao } = req.body;
      if (!descricao || descricao.trim() === "") {
        return res.status(400).json({ msg: "Descrição é obrigatória" });
      }

      const model = new PaoModel(0, descricao);
      const ok = await model.criar();

      if (ok) {
        res.status(201).json({ msg: "Pão criado com sucesso!" });
      } else {
        res.status(500).json({ msg: "Erro ao criar pão" });
      }
    } catch (e) {
      res.status(500).json({ msg: "Erro ao criar pão", erro: e.message });
    }
  }

  // Alterar pão existente
  async alterar(req, res) {
    try {
      const { paoId, descricao } = req.body;
      if (!paoId || !descricao || descricao.trim() === "") {
        return res.status(400).json({ msg: "ID e descrição são obrigatórios" });
      }

      const model = new PaoModel(paoId, descricao);
      const ok = await model.alterar();

      if (ok) {
        res.status(200).json({ msg: "Pão alterado com sucesso!" });
      } else {
        res.status(500).json({ msg: "Erro ao alterar pão" });
      }
    } catch (e) {
      res.status(500).json({ msg: "Erro ao alterar pão", erro: e.message });
    }
  }

  // Excluir pão
  async excluir(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ msg: "ID inválido" });

      const model = new PaoModel(id);
      const ok = await model.excluir();

      if (ok) {
        res.status(200).json({ msg: "Pão excluído com sucesso!" });
      } else {
        res.status(500).json({ msg: "Erro ao excluir pão" });
      }
    } catch (e) {
      res.status(500).json({ msg: "Erro ao excluir pão", erro: e.message });
    }
  }
}
