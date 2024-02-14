import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { Validation } from '../../shared/middlewares';
import { PrismaClient } from '@prisma/client';

interface IParamsProps {
  id?: string;
 
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
      id: yup.string().required(),
    })
  ),
 
}));

const prisma = new PrismaClient();

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  const { id } = req.params;
  const { nome } = req.body;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'ID é obrigatório' });
  }

  if (!nome) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Nome é obrigatório' });
  }

  try {
    const cidadeAtualizada = await prisma.cidade.update({
      where: {
        id:id,
      },
      data: {
        nome,
      },
    });

    return res.status(StatusCodes.OK).json(cidadeAtualizada);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao atualizar cidade' });
  }
};
