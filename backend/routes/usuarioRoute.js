import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import Autorizacao from '../middlewares/autorizacao.js';

let router = express.Router();
let ctrl = new UsuarioController();
let auth = new Autorizacao();

router.get("/obter/:id", auth.validarToken, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'Obter um usuário pelo ID'
    /* #swagger.security = [{
        "apiKeyAuth": ['PFSII']
    }] */
    // #swagger.parameters['id'] = { description: 'ID do usuário' }
    ctrl.obter(req, res);
});

router.get('/listar', auth.validarToken, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'Listar todos os usuários'
    /* #swagger.security = [{
        "apiKeyAuth": ['PFSII']
    }] */
    ctrl.listar(req, res);
});

router.post('/criar', auth.validarToken, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'Criar um novo usuário'
    /* #swagger.security = [{
        "apiKeyAuth": ['PFSII']
    }] */
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/usuario"
                }
            }
        }
    } */
    ctrl.criar(req, res);
});

router.put('/alterar', auth.validarToken, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'Alterar os dados de um usuário existente'
    /* #swagger.security = [{
        "apiKeyAuth": ['PFSII']
    }] */
    /* #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/usuario"
                }
            }
        }
    } */
    ctrl.alterar(req, res);
});

router.delete('/excluir/:id', auth.validarToken, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.description = 'Excluir um usuário pelo ID'
    /* #swagger.security = [{
        "apiKeyAuth": ['PFSII']
    }] */
    // #swagger.parameters['id'] = { description: 'ID do usuário a ser excluído' }
    ctrl.excluir(req, res);
});

export default router;
