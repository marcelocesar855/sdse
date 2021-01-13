const express = require('express');
const routes = express.Router();
const authMiddleware = require("./middlewares/auth");
const { empresaController, loginController, soloController} = require('./controllers');

//Login
routes.post('/login', loginController.auth);

routes.post('/password-reset', empresaController.passwordReset);

//Private
//routes.use(authMiddleware);

//Empresa
routes.post('/empresa', empresaController.store)

routes.get('/empresas', empresaController.index)

routes.put('/empresa/:id', empresaController.update)

routes.delete('/empresa/:id', empresaController.destroy)

routes.post('/empresas-params', empresaController.indexById)

//Solo
routes.post('/solo', soloController.store)

routes.get('/solos', soloController.index)

routes.put('/solo/:id', soloController.update)

routes.delete('/solo/:id', soloController.destroy)

routes.post('/solo-params', soloController.indexByEmpresa)

routes.get('/solos-data', soloController.indexWithData)

module.exports = routes;