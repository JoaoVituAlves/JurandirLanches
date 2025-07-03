import QueijoModel from "../models/queijoModel.js";

export default class QueijoController {

  async listar(req, res) {
    try {
      const model = new QueijoModel();
      const lista = await model.listar();
      const listaJson = lista.map(item => ({
        queijoId: item.queijoId,
        queijoDescricao: item.queijoDescricao
      }));
      res.status(200).json(listaJson);
    } catch (e) {
      res.status(500).json({ msg: "Erro ao listar queijos", erro: e.message });
    }
  }

  async obter(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ msg: "ID inválido" });

      const model = new QueijoModel();
      const lista = await model.listar();
      const queijo = lista.find(q => q.queijoId == id);

      if (!queijo) return res.status(404).json({ msg: "Queijo não encontrado" });

      res.status(200).json({
        queijoId: queijo.queijoId,
        queijoDescricao: queijo.queijoDescricao
      });
    } catch (e) {
      res.status(500).json({ msg: "Erro ao obter queijo", erro: e.message });
    }
  }

  async criar(req, res) {
    try {
      const { descricao } = req.body;
      if (!descricao || descricao.trim() === "")
        return res.status(400).json({ msg: "Descrição é obrigatória" });

      const model = new QueijoModel(0, descricao);
      const ok = await model.criar();

      if (ok)
        res.status(201).json({ msg: "Queijo criado com sucesso!" });
      else
        res.status(500).json({ msg: "Erro ao criar queijo" });
    } catch (e) {
      res.status(500).json({ msg: "Erro ao criar queijo", erro: e.message });
    }
  }

  async alterar(req, res) {
    try {
      const { queijoId, descricao } = req.body;
      if (!queijoId || !descricao || descricao.trim() === "")
        return res.status(400).json({ msg: "ID e descrição são obrigatórios" });

      const model = new QueijoModel(queijoId, descricao);
      const ok = await model.alterar();

      if (ok)
        res.status(200).json({ msg: "Queijo alterado com sucesso!" });
      else
        res.status(500).json({ msg: "Erro ao alterar queijo" });
    } catch (e) {
      res.status(500).json({ msg: "Erro ao alterar queijo", erro: e.message });
    }
  }

  async excluir(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ msg: "ID inválido" });

      const model = new QueijoModel(id, null);
      const ok = await model.excluir();

      if (ok)
        res.status(200).json({ msg: "Queijo excluído com sucesso!" });
      else
        res.status(500).json({ msg: "Erro ao excluir queijo" });
    } catch (e) {
      res.status(500).json({ msg: "Erro ao excluir queijo", erro: e.message });
    }
  }
}
