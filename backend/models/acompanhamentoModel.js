import Database from '../utils/database.js';

const banco = new Database();

export default class AcompanhamentoModel {
    #acompanhamentoId;
    #acompanhamentoDescricao;

    constructor(acompanhamentoId, acompanhamentoDescricao) {
        this.#acompanhamentoId = acompanhamentoId;
        this.#acompanhamentoDescricao = acompanhamentoDescricao;
    }

    // Getters e setters
    get acompanhamentoId() {
        return this.#acompanhamentoId;
    }

    set acompanhamentoId(acompanhamentoId) {
        this.#acompanhamentoId = acompanhamentoId;
    }

    get acompanhamentoDescricao() {
        return this.#acompanhamentoDescricao;
    }

    set acompanhamentoDescricao(acompanhamentoDescricao) {
        this.#acompanhamentoDescricao = acompanhamentoDescricao;
    }

    // Listar todos
    async listar() {
        const sql = "SELECT * FROM tb_acompanhamento ORDER BY aco_descricao";
        const rows = await banco.ExecutaComando(sql);

        return rows.map(row => new AcompanhamentoModel(row["aco_id"], row["aco_descricao"]));
    }

    // Obter por ID
    async obterPorId(id) {
        const sql = "SELECT * FROM tb_acompanhamento WHERE aco_id = ?";
        const rows = await banco.ExecutaComando(sql, [id]);

        if (rows.length > 0) {
            const row = rows[0];
            return new AcompanhamentoModel(row["aco_id"], row["aco_descricao"]);
        }

        return null;
    }

    // Criar novo acompanhamento
    async gravar() {
    if (!this.#acompanhamentoId || this.#acompanhamentoId === 0) {
        const sql = "INSERT INTO tb_acompanhamento (aco_descricao) VALUES (?)";
        const valores = [this.#acompanhamentoDescricao];
        return await banco.ExecutaComandoNonQuery(sql, valores);
    } else {
        const sql = "UPDATE tb_acompanhamento SET aco_descricao = ? WHERE aco_id = ?";
        const valores = [this.#acompanhamentoDescricao, this.#acompanhamentoId];
        return await banco.ExecutaComandoNonQuery(sql, valores);
    }
}
    // Excluir acompanhamento
    async excluir() {
        const sql = "DELETE FROM tb_acompanhamento WHERE aco_id = ?";
        return await banco.ExecutaComandoNonQuery(sql, [this.#acompanhamentoId]);
    }

    // Conversão para JSON
    toJSON() {
        return {
            id: this.#acompanhamentoId,
            descricao: this.#acompanhamentoDescricao
        };
    }
}
