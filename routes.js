const express = require('express');
const routes = express.Router();
const authMiddleware = require("./middlewares/auth");
const { soloStatusController, soloTipoController, fileTypeController, empresaController, loginController, soloController, soloRaController} = require('./controllers');
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
routes.put('/empresa', empresaController.update)
routes.delete('/empresa/:id', empresaController.destroy)
routes.get('/empresas-params/:id', empresaController.indexById)

//Solo
routes.post('/solo', soloController.store)
routes.get('/solos', soloController.index)
routes.put('/solo/:id', soloController.update)
routes.delete('/solo/:id', soloController.destroy)
routes.get('/solo-params/:id', soloController.indexByEmpresa)
routes.get('/solo-id/:id', soloController.indexById)
routes.get('/solos-data', soloController.indexWithData)
routes.post('/solos-doacao-data-params', soloController.indexDoacoesWithDataByParams)
routes.post('/solos-solicitacao-data-params', soloController.indexSolicitacoesWithDataByParams)
routes.post('/solos-doacao-disp-data-params', soloController.indexDoacoesDisponiveisWithDataByParams)
routes.post('/solo-interesse', soloController.manifestoInteresse)
routes.post('/aceitar', soloController.aceitar)
routes.post('/recusar', soloController.recusar)

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

// Solo Tipos
routes.get('/solo-tipos', soloTipoController.index);
routes.get('/solo-tipos/:id', soloTipoController.show);
routes.post('/solo-tipos', soloTipoController.store);
routes.put('/solo-tipos/:id', soloTipoController.update);
routes.delete('/solo-tipos/:id', soloTipoController.destroy);

// Solo Status
routes.get('/solo-status', soloStatusController.index);
routes.get('/solo-status/:id', soloStatusController.show);
routes.post('/solo-status', soloStatusController.store);
routes.put('/solo-status/:id', soloStatusController.update);
routes.delete('/solo-status/:id', soloStatusController.destroy);

// Solo RA
routes.get('/solo-ras', soloRaController.index);
routes.get('/solo-ras/:id', soloRaController.show);
routes.post('/solo-ras', soloRaController.store);
routes.put('/solo-ras/:id', soloRaController.update);
routes.delete('/solo-ras/:id', soloRaController.destroy);

module.exports = routes;