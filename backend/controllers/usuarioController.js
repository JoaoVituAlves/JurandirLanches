import UsuarioModel from "../models/usuarioModel.js";

export default class UsuarioController {

    async obter(req, res) {
        try {
            if (req.params.id !== undefined) {
                const usuarioModel = new UsuarioModel();
                const usuario = await usuarioModel.obter(req.params.id);

                if (!usuario) {
                    return res.status(404).json({ msg: "Usuário não encontrado!" });
                }
                return res.status(200).json(usuario.toJSON());
            } else {
                return res.status(400).json({ msg: "Parâmetro inválido" });
            }
        } catch (e) {
            console.error("Erro no obter:", e);
            return res.status(500).json({ msg: e.message });
        }
    }

    async listar(req, res) {
        try {
            const usuarioModel = new UsuarioModel();
            const lista = await usuarioModel.obterTodos();
            const listaRetorno = lista.map(u => u.toJSON());
            return res.status(200).json(listaRetorno);
        } catch (e) {
            console.error("Erro no listar:", e);
            return res.status(500).json({ msg: e.message });
        }
    }

    async excluir(req, res) {
        try {
            // aceitar ids que sejam números válidos, inclusive 0
            if (req.params.id != null && req.params.id !== "") {
                const usuarioModel = new UsuarioModel();
                const ok = await usuarioModel.excluir(req.params.id);

                if (ok) {
                    return res.status(200).json({ msg: "Usuário excluído com sucesso!" });
                } else {
                    return res.status(500).json({ msg: "Erro ao excluir usuário" });
                }
            } else {
                return res.status(400).json({ msg: "Parâmetro inválido" });
            }
        } catch (e) {
            console.error("Erro no excluir:", e);
            return res.status(500).json({ msg: e.message });
        }
    }

    async alterar(req, res) {
        try {
            const { id, nome, email, ativo, perfilId, senha } = req.body;

            if (id != null && nome && email && ativo && perfilId != null && senha) {
                const usuarioModel = new UsuarioModel(id, nome, email, ativo, perfilId, null, senha);
                const ok = await usuarioModel.gravar();

                if (ok) {
                    return res.status(200).json({ msg: "Usuário alterado com sucesso!" });
                } else {
                    return res.status(500).json({ msg: "Erro ao alterar usuário" });
                }
            } else {
                return res.status(400).json({ msg: "Parâmetros inválidos" });
            }
        } catch (e) {
            console.error("Erro no alterar:", e);
            return res.status(500).json({ msg: e.message });
        }
    }

    async criar(req, res) {
        try {
            const { nome, email, ativo, perfilId, senha } = req.body;

            if (nome && email && ativo && perfilId != null && senha) {
                const usuarioModel = new UsuarioModel(0, nome, email, ativo, perfilId, null, senha);
                const ok = await usuarioModel.gravar();

                if (ok) {
                    return res.status(200).json({ msg: "Usuário adicionado com sucesso!" });
                } else {
                    return res.status(500).json({ msg: "Erro ao adicionar usuário" });
                }
            } else {
                return res.status(400).json({ msg: "Parâmetros inválidos" });
            }
        } catch (e) {
            console.error("Erro no criar:", e);
            return res.status(500).json({ msg: e.message });
        }
    }
}
