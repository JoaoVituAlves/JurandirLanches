import express from 'express';
import AcompanhamentoController from '../controllers/acompanhamentoController.js';

const router = express.Router();
const ctrl = new AcompanhamentoController();

router.get('/listar', (req, res) => {
  // #swagger.tags = ['Acompanhamento']
  // #swagger.summary = 'Listar acompanhamentos'
  // #swagger.description = 'Retorna todos os acompanhamentos cadastrados.'
  ctrl.listar(req, res);
});

router.get('/obter/:id', (req, res) => {
  // #swagger.tags = ['Acompanhamento']
  // #swagger.summary = 'Obter acompanhamento por ID'
  // #swagger.description = 'Retorna um acompanhamento pelo seu ID.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do acompanhamento',
        required: true,
        type: 'integer'
  } */
  ctrl.obter(req, res);
});

router.post('/criar', (req, res) => {
  // #swagger.tags = ['Acompanhamento']
  // #swagger.summary = 'Criar novo acompanhamento'
  // #swagger.description = 'Cria um novo acompanhamento com a descrição informada.'
  /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                descricao: {
                  type: "string",
                  example: "Batata frita"
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
  // #swagger.tags = ['Acompanhamento']
  // #swagger.summary = 'Alterar acompanhamento'
  // #swagger.description = 'Atualiza a descrição de um acompanhamento existente.'
  /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                acompanhamentoId: {
                  type: "integer",
                  example: 1
                },
                descricao: {
                  type: "string",
                  example: "Molho especial"
                }
              },
              required: ["acompanhamentoId", "descricao"]
            }
          }
        }
  } */
  ctrl.alterar(req, res);
});

router.delete('/excluir/:id', (req, res) => {
  // #swagger.tags = ['Acompanhamento']
  // #swagger.summary = 'Excluir acompanhamento'
  // #swagger.description = 'Exclui um acompanhamento pelo seu ID.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do acompanhamento a ser excluído',
        required: true,
        type: 'integer'
  } */
  ctrl.excluir(req, res);
});

export default router;
