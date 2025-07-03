import Database from '../utils/database.js';

const banco = new Database();

export default class HamburguerModel {

    #hamburguerId;
    #hamburguerDescricao;

    constructor(hamburguerId, hamburguerDescricao) {
        this.#hamburguerId = hamburguerId;
        this.#hamburguerDescricao = hamburguerDescricao;
    }

    get hamburguerId() {
        return this.#hamburguerId;
    }

    set hamburguerId(hamburguerId) {
        this.#hamburguerId = hamburguerId;
    }

    get hamburguerDescricao() {
        return this.#hamburguerDescricao;
    }

    set hamburguerDescricao(hamburguerDescricao) {
        this.#hamburguerDescricao = hamburguerDescricao;
    }

    async listar() {
        const sql = "SELECT * FROM tb_hamburguer ORDER BY ham_descricao";
        const rows = await banco.ExecutaComando(sql);

        const lista = [];

        for (const row of rows) {
            const hamburguer = new HamburguerModel();
            hamburguer.hamburguerId = row["ham_id"];
            hamburguer.hamburguerDescricao = row["ham_descricao"];
            lista.push(hamburguer);
        }

        return lista;
    }

    async obterPorId(id) {
        const sql = "SELECT * FROM tb_hamburguer WHERE ham_id = ?";
        const rows = await banco.ExecutaComando(sql, [id]);
        if (rows.length > 0) {
            const row = rows[0];
            return new HamburguerModel(row["ham_id"], row["ham_descricao"]);
        }
        return null;
    }

    async gravar() {
        if (!this.#hamburguerId || this.#hamburguerId === 0) {
            // Inserir novo
            const sql = "INSERT INTO tb_hamburguer (ham_descricao) VALUES (?)";
            const valores = [this.#hamburguerDescricao];
            return await banco.ExecutaComandoNonQuery(sql, valores);
        } else {
            // Atualizar existente
            const sql = "UPDATE tb_hamburguer SET ham_descricao = ? WHERE ham_id = ?";
            const valores = [this.#hamburguerDescricao, this.#hamburguerId];
            return await banco.ExecutaComandoNonQuery(sql, valores);
        }
    }

    async excluir() {
        if (!this.#hamburguerId) {
            throw new Error("ID do hambúrguer não informado");
        }
        const sql = "DELETE FROM tb_hamburguer WHERE ham_id = ?";
        return await banco.ExecutaComandoNonQuery(sql, [this.#hamburguerId]);
    }
}
