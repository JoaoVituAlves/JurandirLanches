import Database from '../utils/database.js'

const banco = new Database()

export default class UsuarioHambModel {

    #id;
    #nome;
    #email;
    #ativo;
    #perfilId;
    #dataCadastro;
    #senha;

    constructor(id, nome, email, ativo, perfilId, dataCadastro, senha) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#ativo = ativo;
        this.#perfilId = perfilId;
        this.#dataCadastro = dataCadastro;
        this.#senha = senha;
    }

    // Getters e Setters
    get id() { return this.#id; }
    set id(id) { this.#id = id; }

    get nome() { return this.#nome; }
    set nome(nome) { this.#nome = nome; }

    get email() { return this.#email; }
    set email(email) { this.#email = email; }

    get ativo() { return this.#ativo; }
    set ativo(ativo) { this.#ativo = ativo; }

    get perfilId() { return this.#perfilId; }
    set perfilId(perfilId) { this.#perfilId = perfilId; }

    get dataCadastro() { return this.#dataCadastro; }
    set dataCadastro(dataCadastro) { this.#dataCadastro = dataCadastro; }

    get senha() { return this.#senha; }
    set senha(senha) { this.#senha = senha; }

    // Para serialização JSON
    toJSON() {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            ativo: this.#ativo,
            perfilId: this.#perfilId,
            dataCadastro: this.#dataCadastro,
            senha: this.#senha
        };
    }

   async gravar() {
    if (!this.#id || this.#id == 0) { // insert
        let sql = "insert into tb_usuarioshamb (usu_nome, usu_email, usu_ativo, perfil_id, usu_datacadastro, usu_senha) values (?, ?, ?, ?, now(), ?)";
        let valores = [this.#nome, this.#email, this.#ativo, this.#perfilId, this.#senha];
        return await banco.ExecutaComandoNonQuery(sql, valores);
    } else { // update
        let sql = "update tb_usuarioshamb set usu_nome = ?, usu_email = ?, usu_ativo = ?, perfil_id = ?, usu_senha = ? where usu_id = ?";
        let valores = [this.#nome, this.#email, this.#ativo, this.#perfilId, this.#senha, this.#id];
        return await banco.ExecutaComandoNonQuery(sql, valores);
    }
}



    // Obter um usuário pelo ID
    async obter(id) {
        const sql = `SELECT * FROM tb_usuarioshamb WHERE usu_id = ?`;
        const rows = await banco.ExecutaComando(sql, [id]);

        if (rows.length > 0) {
            const u = rows[0];
            return new UsuarioHambModel(
                u.usu_id, u.usu_nome, u.usu_email, u.usu_ativo,
                u.perfil_id, u.usu_datacadastro, u.usu_senha
            );
        }
        return null;
    }

    // Listar todos os usuários
    async obterTodos() {
        const sql = `SELECT * FROM tb_usuarioshamb`;
        const rows = await banco.ExecutaComando(sql);
        const lista = [];

        for (const u of rows) {
            lista.push(new UsuarioHambModel(
                u.usu_id, u.usu_nome, u.usu_email, u.usu_ativo,
                u.perfil_id, u.usu_datacadastro, u.usu_senha
            ));
        }

        return lista;
    }

    // Excluir usuário
    async excluir(id) {
        const sql = `DELETE FROM tb_usuarioshamb WHERE usu_id = ?`;
        return await banco.ExecutaComandoNonQuery(sql, [id]);
    }

    // Autenticar por email e senha
    async autenticar(email, senha) {
        const sql = `SELECT usu_id FROM tb_usuarioshamb WHERE usu_email = ? AND usu_senha = ?`;
        const rows = await banco.ExecutaComando(sql, [email, senha]);
        return rows.length > 0;
    }
}
