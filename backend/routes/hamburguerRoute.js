import express from 'express';
import HamburguerController from '../controllers/hamburguerController.js';

const router = express.Router();
const ctrl = new HamburguerController();

router.get('/listar', (req, res) => {
  // #swagger.tags = ['Hamburguer']
  // #swagger.summary = 'Listar hambúrgueres'
  // #swagger.description = 'Retorna todos os hambúrgueres cadastrados.'
  ctrl.listar(req, res);
});

router.get('/obter/:id', (req, res) => {
  // #swagger.tags = ['Hamburguer']
  // #swagger.summary = 'Obter hambúrguer por ID'
  // #swagger.description = 'Retorna um hambúrguer pelo seu ID.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do hambúrguer',
        required: true,
        type: 'integer'
  } */
  ctrl.obter(req, res);
});

router.post('/criar', (req, res) => {
  // #swagger.tags = ['Hamburguer']
  // #swagger.summary = 'Criar novo hambúrguer'
  // #swagger.description = 'Cria um novo hambúrguer com a descrição informada.'
  /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                descricao: {
                  type: "string",
                  example: "Hambúrguer artesanal"
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
  // #swagger.tags = ['Hamburguer']
  // #swagger.summary = 'Alterar hambúrguer'
  // #swagger.description = 'Atualiza a descrição de um hambúrguer existente.'
  /* #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                hamburguerId: {
                  type: "integer",
                  example: 1
                },
                descricao: {
                  type: "string",
                  example: "Hambúrguer artesanal especial"
                }
              },
              required: ["hamburguerId", "descricao"]
            }
          }
        }
  } */
  ctrl.alterar(req, res);
});

router.delete('/excluir/:id', (req, res) => {
  // #swagger.tags = ['Hamburguer']
  // #swagger.summary = 'Excluir hambúrguer'
  // #swagger.description = 'Exclui um hambúrguer pelo seu ID.'
  /* #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do hambúrguer a ser excluído',
        required: true,
        type: 'integer'
  } */
  ctrl.excluir(req, res);
});

export default router;
