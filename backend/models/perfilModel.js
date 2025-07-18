import Database from '../utils/database.js'

const conexao = new Database()

export default class PerfilModel {

    #perfilId;
    #perfilDescricao;

    get perfilId() {
        return this.#perfilId;
    }
    set perfilId(perfilId){
        this.#perfilId = perfilId;
    }

    get perfilDescricao() {
        return this.#perfilDescricao;
    }
    set perfilDescricao(perfilDescricao){
        this.#perfilDescricao = perfilDescricao;
    }

    constructor(perfilId, perfilDescricao){
        this.#perfilId = perfilId;
        this.#perfilDescricao = perfilDescricao;
    }

    async listarPerfil() {

        let lista = [];
        let sql = "select * from tb_perfilhamb";

        let rows = await conexao.ExecutaComando(sql);

        for(let i = 0; i<rows.length; i++){

            let perfil = new PerfilModel(rows[i]["perfil_id"], rows[i]["descricao"]);

            lista.push(perfil);
        }

        return lista;
    }

    toJSON() {
        return {
            "perfilId": this.#perfilId,
            "perfilDescricao": this.#perfilDescricao
        };
    }
}
