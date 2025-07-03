import Database from '../utils/database.js';

const banco = new Database();

export default class PaoModel {

    #paoId;
    #paoDescricao;

    constructor(paoId = 0, paoDescricao = "") {
        this.#paoId = paoId;
        this.#paoDescricao = paoDescricao;
    }

    // Getters e setters
    get paoId() {
        return this.#paoId;
    }

    set paoId(paoId) {
        this.#paoId = paoId;
    }

    get paoDescricao() {
        return this.#paoDescricao;
    }

    set paoDescricao(paoDescricao) {
        this.#paoDescricao = paoDescricao;
    }

    // Listar todos
    async listar() {
        const sql = "SELECT * FROM tb_pao ORDER BY pao_descricao";
        const rows = await banco.ExecutaComando(sql);

        return rows.map(row => new PaoModel(row["pao_id"], row["pao_descricao"]));
    }

    // Obter por ID
    async obterPorId(id) {
        const sql = "SELECT * FROM tb_pao WHERE pao_id = ?";
        const rows = await banco.ExecutaComando(sql, [id]);

        if (rows.length > 0) {
            const row = rows[0];
            return new PaoModel(row["pao_id"], row["pao_descricao"]);
        }

        return null;
    }

    // Criar novo pão
    async criar() {
        const sql = "INSERT INTO tb_pao (pao_descricao) VALUES (?)";
        const valores = [this.#paoDescricao];
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // Alterar pão existente
    async alterar() {
        const sql = "UPDATE tb_pao SET pao_descricao = ? WHERE pao_id = ?";
        const valores = [this.#paoDescricao, this.#paoId];
        const resultado = await banco.ExecutaComandoNonQuery(sql, valores);
        return resultado;
    }

    // Excluir pão
    async excluir() {
        const sql = "DELETE FROM tb_pao WHERE pao_id = ?";
        const resultado = await banco.ExecutaComandoNonQuery(sql, [this.#paoId]);
        return resultado;
    }
}
