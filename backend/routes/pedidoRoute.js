import express from 'express';
import PedidoController from '../controllers/pedidoController.js';

const router = express.Router();
const ctrl = new PedidoController();

router.post('/cadastrar', (req, res) => ctrl.cadastrar(req, res));
router.put('/alterar', (req, res) => ctrl.alterar(req, res));
router.post('/excluir', (req, res) => ctrl.excluir(req, res));
router.get('/listar', (req, res) => ctrl.listar(req, res));
router.get('/obter/:id', (req, res) => ctrl.obter(req, res));  // Rota para obter pedido por ID

export default router;
