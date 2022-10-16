import Joi, { Root } from "joi";
import JoiPhoneNumber from "joi-phone-number";

const JoiCustom = Joi.extend(JoiPhoneNumber) as Root;

export interface SignUpInterface {
  email: string;
  password: string;
  phoneNumber: string;
  displayName: string;
}

export const SignUpValidator = JoiCustom.object<SignUpInterface>({
  email: JoiCustom.string().email().required(),
  password: JoiCustom.string().min(8).required(),
  phoneNumber: JoiCustom.string().phoneNumber({ strict: true }).required(),
  displayName: JoiCustom.string().required(),
});
