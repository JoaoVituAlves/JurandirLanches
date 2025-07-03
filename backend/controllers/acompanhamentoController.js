import AcompanhamentoModel from "../models/acompanhamentoModel.js";

export default class AcompanhamentoController {

  async listar(req, res) {
    try {
      const model = new AcompanhamentoModel();
      const lista = await model.listar();
      const listaJson = lista.map(item => item.toJSON());
      res.status(200).json(listaJson);
    } catch (e) {
      res.status(500).json({ msg: "Erro ao listar acompanhamentos", erro: e.message });
    }
  }

  async obter(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ msg: "ID inválido" });

      const model = new AcompanhamentoModel();
      const acompanhamento = await model.obterPorId(id);

      if (!acompanhamento)
        return res.status(404).json({ msg: "Acompanhamento não encontrado" });

      res.status(200).json(acompanhamento.toJSON());
    } catch (e) {
      res.status(500).json({ msg: "Erro ao obter acompanhamento", erro: e.message });
    }
  }

  async criar(req, res) {
    try {
      const { descricao } = req.body;
      if (!descricao || descricao.trim() === "")
        return res.status(400).json({ msg: "Descrição é obrigatória" });

      const model = new AcompanhamentoModel(0, descricao);
      const ok = await model.gravar();

      if (ok)
        res.status(201).json({ msg: "Acompanhamento criado com sucesso!" });
      else
        res.status(500).json({ msg: "Erro ao criar acompanhamento" });
    } catch (e) {
      res.status(500).json({ msg: "Erro ao criar acompanhamento", erro: e.message });
    }
  }

  async alterar(req, res) {
    try {
      const { acompanhamentoId, descricao } = req.body;
      if (!acompanhamentoId || !descricao || descricao.trim() === "")
        return res.status(400).json({ msg: "ID e descrição são obrigatórios" });

      const model = new AcompanhamentoModel(acompanhamentoId, descricao);
      const ok = await model.gravar();

      if (ok)
        res.status(200).json({ msg: "Acompanhamento alterado com sucesso!" });
      else
        res.status(500).json({ msg: "Erro ao alterar acompanhamento" });
    } catch (e) {
      res.status(500).json({ msg: "Erro ao alterar acompanhamento", erro: e.message });
    }
  }

  async excluir(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ msg: "ID inválido" });

      const model = new AcompanhamentoModel(id);
      const ok = await model.excluir();

      if (ok)
        res.status(200).json({ msg: "Acompanhamento excluído com sucesso!" });
      else
        res.status(500).json({ msg: "Erro ao excluir acompanhamento" });
    } catch (e) {
      res.status(500).json({ msg: "Erro ao excluir acompanhamento", erro: e.message });
    }
  }
}
