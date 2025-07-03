import express from 'express';
import Autorizacao from '../middlewares/autorizacao.js';
import PerfilController from '../controllers/perfilController.js';

const router = express.Router();

let auth = new Autorizacao();
let ctrl = new PerfilController();
router.get('/listar', auth.validarToken, 
(req, res) => {
    // #swagger.tags = ['Perfil']
    /* #swagger.security = [{
        "apiKeyAuth": ['PFSII']
    }] */
    ctrl.listar(req, res);
})


export default router;
