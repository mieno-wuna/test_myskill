import Joi from "joi";

export interface LoginInterface {
    email: string;

    password: string;
}

export const LoginValidator = Joi.object<LoginInterface>({
  email: Joi.string().min(8).email().required(),
  password: Joi.string().min(8).required(),
});
