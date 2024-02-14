import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { Validation } from '../../shared/middlewares';
import { PrismaClient } from '@prisma/client';

interface IParamsProps {
  id?: string;
 
}

export const deleteByIdValidation = Validation((getSchema) => ({
  params: getSchema<IParamsProps>(
    yup.object().shape({
      id: yup.string().required(),
    })
  ),
 
}));

const prisma = new PrismaClient();

export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'ID é obrigatório' });
  }

  try {
    const cidade = await prisma.cidade.delete({
      where: {
        id: id,
      },
    });

    return res.status(StatusCodes.NO_CONTENT).send(cidade);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao deletar cidade' });
  }
};
