import { StatusCodes } from 'http-status-codes';
import { Request,Response } from 'express';
import * as yup from 'yup';
import { Validation } from '../../shared/middlewares';
import { PrismaClient } from '@prisma/client';


interface ICidade {
  nome?: string
}

export const createValidation = Validation((getSchema) => ({
  body: getSchema<ICidade>(yup.object().shape({
    nome: yup.string().optional().min(3),
  })),
}));

const prisma = new PrismaClient();
export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Nome é obrigatório' });
  }

  try {
    const novaCidade = await prisma.cidade.create({
      data: {
        nome,
      },
    });

    return res.status(StatusCodes.CREATED).json(novaCidade);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao criar cidade' });
  }
};



