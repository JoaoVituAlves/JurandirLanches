import express from 'express';
import usuarioRota from './routes/usuarioRoute.js';
import perfilRota from './routes/perfilRoute.js';
import loginRota from './routes/loginRoute.js';
import pedidoRota from './routes/pedidoRoute.js';
import acompanhamentoRota from './routes/acompanhamentoRoute.js';
import hamburguerRota from './routes/hamburguerRoute.js';
import paoRota from './routes/paoRoute.js';
import queijoRota from './routes/queijoRoute.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerJson = require("./outputSwagger.json");;
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use('/usuario', usuarioRota);
app.use('/perfil', perfilRota);
app.use('/login', loginRota);
app.use('/pedido', pedidoRota);
app.use('/acompanhamento', acompanhamentoRota);
app.use('/hamburguer', hamburguerRota);
app.use ('/pao', paoRota);
app.use ('/queijo', queijoRota);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.listen('4000', function() {
    console.log('backend em execução');
})