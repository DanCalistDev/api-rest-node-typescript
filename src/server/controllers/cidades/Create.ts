import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';


interface ICidade {
  nome?: string;
}

const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  nome: yup.string() .required().min(3),
});

export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {

  let validatedData: ICidade | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body, {abortEarly: false});

  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if(!error.path) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({errors});
  }

  console.log(validatedData);

  return res.status(StatusCodes.OK).send('Create!');
};