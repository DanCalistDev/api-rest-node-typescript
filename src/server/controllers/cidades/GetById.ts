import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { Validation } from '../../shared/middlewares';

interface IParamsProps {
  id?: number;
 
}

export const getByIdValidation = Validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
 
    })
  ),
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
  if (Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: {
      default: 'Registro não encontrado'
    }
  });

  return res.status(StatusCodes.OK).json({
    id: req.params.id,
    nome: 'Vila Velha',
  });
};
