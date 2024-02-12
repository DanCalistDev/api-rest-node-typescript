import { StatusCodes } from 'http-status-codes';
import { Request,Response } from 'express';
import * as yup from 'yup';
import { Validation } from '../../shared/middlewares';

interface ICidade {
  nome?: string;
}

export const createValidation = Validation((getSchema) => ({
  body: getSchema<ICidade>(yup.object().shape({
    nome: yup.string() .required().min(3),
  })),
}));

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

  console.log(req.body);

  return res.status(StatusCodes.OK).send('Create!');
};