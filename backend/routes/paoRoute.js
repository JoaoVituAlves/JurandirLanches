import express from 'express';
import PaoController from '../controllers/paoController.js';

const router = express.Router();
const ctrl = new PaoController();

router.get('/listar', (req, res) => {
  // #swagger.tags = ['Pao']
  // #swagger.summary = 'Listar pães'
  // #swagger.description = 'Retorna todos os pães cadastrados.'
  ctrl.listar(req, res);
});

router.get('/obter/:id', (req, res) => {
  // #swagger.tags = ['Pao']
  // #swagger.summary = 'Obter pão por ID'
  // #swagger.description = 'Retorna um pão pelo seu ID.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do pão',
        required: true,
        type: 'integer'
  } */
  ctrl.obter(req, res);
});

router.post('/criar', (req, res) => {
  // #swagger.tags = ['Pao']
  // #swagger.summary = 'Criar novo pão'
  // #swagger.description = 'Cria um novo pão com a descrição informada.'
  /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                descricao: {
                  type: "string",
                  example: "Pão francês"
                }
              },
              required: ["descricao"]
            }
          }
        }
  } */
  ctrl.criar(req, res);
});

router.put('/alterar', (req, res) => {
  // #swagger.tags = ['Pao']
  // #swagger.summary = 'Alterar pão'
  // #swagger.description = 'Atualiza a descrição de um pão existente.'
  /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                paoId: {
                  type: "integer",
                  example: 1
                },
                descricao: {
                  type: "string",
                  example: "Pão integral"
                }
              },
              required: ["paoId", "descricao"]
            }
          }
        }
  } */
  ctrl.alterar(req, res);
});

router.delete('/excluir/:id', (req, res) => {
  // #swagger.tags = ['Pao']
  // #swagger.summary = 'Excluir pão'
  // #swagger.description = 'Exclui um pão pelo seu ID.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do pão a ser excluído',
        required: true,
        type: 'integer'
  } */
  ctrl.excluir(req, res);
});

export default router;
