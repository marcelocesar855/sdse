const express = require('express');
const routes = express.Router();
const authMiddleware = require("./middlewares/auth");
const { fileTypeController, empresaController, loginController, soloController} = require('./controllers');
const multer = require('multer');
const multerConfig = require('./middlewares/multer');

//Login
routes.post('/login', loginController.auth);
routes.post('/password-recovery', empresaController.passwordRecovery);
routes.post('/password-reset', empresaController.passwordReset);
routes.post('/password-firstaccess', empresaController.passwordCreation);

//Empresa
routes.post('/empresa', empresaController.store)
routes.get('/empresas', empresaController.index)

//Private
routes.use(authMiddleware);
routes.put('/empresa/:id', empresaController.update)
routes.delete('/empresa/:id', empresaController.destroy)
routes.get('/empresas-params/:id', empresaController.indexById)

//Solo
routes.post('/solo', soloController.store)
routes.get('/solos', soloController.index)
routes.put('/solo/:id', soloController.update)
routes.delete('/solo/:id', soloController.destroy)
routes.get('/solo-params/:id', soloController.indexByEmpresa)
routes.get('/solos-data', soloController.indexWithData)
routes.get('/solos-data-params', soloController.indexWithDataByParams)

//File
routes.get('/files-solo/:id', soloController.indexFilesBySolo);
routes.post('/file-solo', multer(multerConfig).single('file'), soloController.storeFile);
routes.delete('/file-solo/:id', soloController.destroyFile);

// File Types
routes.get('/file-types', fileTypeController.index);
routes.get('/file-types/:id', fileTypeController.show);
routes.post('/file-types', fileTypeController.store);
routes.put('/file-types/:id', fileTypeController.update);
routes.delete('/file-types/:id', fileTypeController.destroy);

module.exports = routes;