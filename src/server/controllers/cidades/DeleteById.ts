import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { Validation } from '../../shared/middlewares';

interface IParamsProps {
  id?: number;
 
}

export const deleteByIdValidation = Validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
 
}));

export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
  console.log(req.params);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Não implementado!');
};
