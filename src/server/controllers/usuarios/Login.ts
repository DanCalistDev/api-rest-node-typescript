
import {PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { PasswordCrypto } from '../../shared/services/PasswordCrypto';
import * as yup from 'yup';
import { JWTService } from '../../shared/services/JWTService';
import { Validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
interface ILogin {
  email?: string
  senha: string
}

export const loginValidation = Validation((getSchema) => ({
  body: getSchema<ILogin>(yup.object().shape({
    senha: yup.string().required().min(6),
    email: yup.string().required().email().min(5),
  })),
}));


const prisma = new PrismaClient();

export const signIn = async (req: Request<{}, {}, ILogin>, res: Response) => {
  const { email, senha } = req.body;


  const usuario = await prisma.user.findFirst({ where: { email } });
  if (!usuario) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(senha, usuario.senha);
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    });
  } else {

    const accessToken = JWTService.sign({ uid: usuario.id });
    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o token de acesso'
        }
      });
    }

    return res.status(StatusCodes.OK).json({ accessToken });
  }

};