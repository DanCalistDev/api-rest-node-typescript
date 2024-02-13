import { StatusCodes } from 'http-status-codes';
import { Request,Response } from 'express';
import * as yup from 'yup';
import { Validation } from '../../shared/middlewares';

interface ICidade {
  nome?: string;
}

export const createValidation = Validation((getSchema) => ({
  body: getSchema<ICidade>(yup.object().shape({
    nome: yup.string().optional().min(3),
  })),
}));


export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

  return res.status(StatusCodes.CREATED).json(1);
};