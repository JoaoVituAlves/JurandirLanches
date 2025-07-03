import Database from '../utils/database.js';

const banco = new Database();

export default class QueijoModel {

    #queijoId;
    #queijoDescricao;

    constructor(queijoId, queijoDescricao) {
        this.#queijoId = queijoId;
        this.#queijoDescricao = queijoDescricao;
    }

    get queijoId() {
        return this.#queijoId;
    }

    set queijoId(queijoId) {
        this.#queijoId = queijoId;
    }

    get queijoDescricao() {
        return this.#queijoDescricao;
    }

    set queijoDescricao(queijoDescricao) {
        this.#queijoDescricao = queijoDescricao;
    }

    async listar() {
        const sql = "SELECT * FROM tb_queijo ORDER BY que_descricao";
        const rows = await banco.ExecutaComando(sql);

        const lista = [];

        for (const row of rows) {
            const queijo = new QueijoModel(row["que_id"], row["que_descricao"]);
            lista.push(queijo);
        }

        return lista;
    }

    async criar() {
        const sql = "INSERT INTO tb_queijo (que_descricao) VALUES (?)";
        const valores = [this.#queijoDescricao];
        return await banco.ExecutaComandoNonQuery(sql, valores);
    }

    async alterar() {
        const sql = "UPDATE tb_queijo SET que_descricao = ? WHERE que_id = ?";
        const valores = [this.#queijoDescricao, this.#queijoId];
        return await banco.ExecutaComandoNonQuery(sql, valores);
    }

    async excluir() {
        const sql = "DELETE FROM tb_queijo WHERE que_id = ?";
        return await banco.ExecutaComandoNonQuery(sql, [this.#queijoId]);
    }
}
