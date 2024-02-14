import '../shared/services/TranslationsYup';
import { Router } from 'express';
import {StatusCodes} from 'http-status-codes';
import {CidadesController} from './../controllers';
import { UsuariosController } from '../controllers/usuarios';

const router =  Router();

router.get('/', (_, res) => {
  return res.status(StatusCodes.OK).send('Iniciando Projeto!');
});

router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);

router.post('/register', UsuariosController.registerValidation);
router.post('/login', UsuariosController.loginValidation, UsuariosController.signIn);

export {router};