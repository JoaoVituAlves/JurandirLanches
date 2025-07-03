import express from 'express';
import QueijoController from '../controllers/queijoController.js';

const router = express.Router();
const ctrl = new QueijoController();

router.get('/listar', (req, res) => {
  // #swagger.tags = ['Queijo']
  // #swagger.summary = 'Listar queijos'
  // #swagger.description = 'Retorna todos os queijos cadastrados.'
  ctrl.listar(req, res);
});

router.get('/obter/:id', (req, res) => {
  // #swagger.tags = ['Queijo']
  // #swagger.summary = 'Obter queijo por ID'
  // #swagger.description = 'Retorna um queijo pelo seu ID.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do queijo',
        required: true,
        type: 'integer'
  } */
  ctrl.obter(req, res);
});

router.post('/criar', (req, res) => {
  // #swagger.tags = ['Queijo']
  // #swagger.summary = 'Criar novo queijo'
  // #swagger.description = 'Cria um novo queijo com a descrição informada.'
  /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                descricao: {
                  type: "string",
                  example: "Queijo cheddar"
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
  // #swagger.tags = ['Queijo']
  // #swagger.summary = 'Alterar queijo'
  // #swagger.description = 'Atualiza a descrição de um queijo existente.'
  /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                queijoId: {
                  type: "integer",
                  example: 1
                },
                descricao: {
                  type: "string",
                  example: "Queijo prato"
                }
              },
              required: ["queijoId", "descricao"]
            }
          }
        }
  } */
  ctrl.alterar(req, res);
});

router.delete('/excluir/:id', (req, res) => {
  // #swagger.tags = ['Queijo']
  // #swagger.summary = 'Excluir queijo'
  // #swagger.description = 'Exclui um queijo pelo seu ID.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do queijo a ser excluído',
        required: true,
        type: 'integer'
  } */
  ctrl.excluir(req, res);
});

export default router;
