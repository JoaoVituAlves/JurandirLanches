import HamburguerModel from "../models/hamburguerModel.js";

export default class HamburguerController {

  // Listar todos
  async listar(req, res) {
    try {
      const model = new HamburguerModel();
      const lista = await model.listar();
      const listaJson = lista.map(item => ({
        hamburguerId: item.hamburguerId,
        hamburguerDescricao: item.hamburguerDescricao
      }));
      res.status(200).json(listaJson);
    } catch (e) {
      res.status(500).json({ msg: "Erro ao listar hambúrgueres", erro: e.message });
    }
  }

  // Obter por ID
  async obter(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ msg: "ID inválido" });

      const model = new HamburguerModel();
      const lista = await model.listar();
      const hamburguer = lista.find(h => h.hamburguerId == id);

      if (!hamburguer)
        return res.status(404).json({ msg: "Hambúrguer não encontrado" });

      res.status(200).json({
        hamburguerId: hamburguer.hamburguerId,
        hamburguerDescricao: hamburguer.hamburguerDescricao
      });
    } catch (e) {
      res.status(500).json({ msg: "Erro ao obter hambúrguer", erro: e.message });
    }
  }

  // Criar novo (atenção: sua model atual não tem método criar, então aqui só um exemplo básico)
  async criar(req, res) {
    try {
      const { descricao } = req.body;
      if (!descricao || descricao.trim() === "")
        return res.status(400).json({ msg: "Descrição é obrigatória" });

      // Inserir diretamente com SQL aqui, pois model não tem método gravar
      const sql = "INSERT INTO tb_hamburguer (ham_descricao) VALUES (?)";
      const banco = new HamburguerModel().constructor.banco || new (await import('../utils/database.js')).default();
      const resultado = await banco.ExecutaComandoNonQuery(sql, [descricao]);

      if (resultado)
        res.status(201).json({ msg: "Hambúrguer criado com sucesso!" });
      else
        res.status(500).json({ msg: "Erro ao criar hambúrguer" });

    } catch (e) {
      res.status(500).json({ msg: "Erro ao criar hambúrguer", erro: e.message });
    }
  }

  // Alterar existente (mesma observação: model não tem método alterar)
  async alterar(req, res) {
    try {
      const { hamburguerId, descricao } = req.body;
      if (!hamburguerId || !descricao || descricao.trim() === "")
        return res.status(400).json({ msg: "ID e descrição são obrigatórios" });

      const sql = "UPDATE tb_hamburguer SET ham_descricao = ? WHERE ham_id = ?";
      const banco = new HamburguerModel().constructor.banco || new (await import('../utils/database.js')).default();
      const resultado = await banco.ExecutaComandoNonQuery(sql, [descricao, hamburguerId]);

      if (resultado)
        res.status(200).json({ msg: "Hambúrguer alterado com sucesso!" });
      else
        res.status(500).json({ msg: "Erro ao alterar hambúrguer" });

    } catch (e) {
      res.status(500).json({ msg: "Erro ao alterar hambúrguer", erro: e.message });
    }
  }

  // Excluir por ID
  async excluir(req, res) {
    try {
      const id = req.params.id;
      if (!id) return res.status(400).json({ msg: "ID inválido" });

      const sql = "DELETE FROM tb_hamburguer WHERE ham_id = ?";
      const banco = new HamburguerModel().constructor.banco || new (await import('../utils/database.js')).default();
      const resultado = await banco.ExecutaComandoNonQuery(sql, [id]);

      if (resultado)
        res.status(200).json({ msg: "Hambúrguer excluído com sucesso!" });
      else
        res.status(500).json({ msg: "Erro ao excluir hambúrguer" });

    } catch (e) {
      res.status(500).json({ msg: "Erro ao excluir hambúrguer", erro: e.message });
    }
  }

}
