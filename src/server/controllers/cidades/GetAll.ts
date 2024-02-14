import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { Validation } from '../../shared/middlewares';
import { PrismaClient } from '@prisma/client';

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = Validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
    })
  ),
}));

const prisma = new PrismaClient();

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
  try {
    const { page = 1, limit = 10, filter = '' } = req.query;

    const cidades = await prisma.cidade.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        nome: {
          contains: filter,
        },
      },
    });

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', cidades.length);

    return res.status(StatusCodes.OK).json(cidades);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao buscar cidades' });
  }
};

