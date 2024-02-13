import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { Validation } from '../../shared/middlewares';

interface IParamsProps {
  id?: number;
 
}
interface IBodyProps {
  nome: string;
 
}

export const updateByIdValidation = Validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
    })
  ),
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
 
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  console.log(req.params);
  console.log(req.body);


  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Não implementado!');
};