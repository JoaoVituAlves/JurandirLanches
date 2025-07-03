import UsuarioModel from "./models/usuarioModel.js";
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: 'PFS 2 - API',
    description: 'API da disciplina de PFS 2'
  },
  host: 'localhost:4000',
  schemes: ['http'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'chaveapi',
      description: 'Chave de autorização da nossa API'
    }
  },
  components: {
    schemas: {
      usuario: new UsuarioModel(
        999,                  
        "Usuário Teste",      
        "teste@teste.com",    
        'S',                  
        1,                    
        new Date().toISOString(), 
        "123"                
      ).toJSON(),

      login: {
        email: "teste@teste.com",
        senha: "123"
      }
    }
  }
};

const outputJson = "./outputSwagger.json";
const routes = ['./server.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputJson, routes, doc)
  .then(async () => {
    await import('./server.js');
  });
