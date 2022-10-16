import { Request } from "express";
import { getAuth as getAuthAdmin } from "firebase-admin/auth";
import { signInWithEmailAndPassword, getAuth, AuthError } from "firebase/auth";
import { StandardError } from "../utils/standard-error";
import { StandardResponse } from "../utils/standard-response";

import { LoginValidator } from "./validators/login-validator";
import { SignUpValidator } from "./validators/signup-validator";

export async function userSignIn(req: Request): Promise<StandardResponse> {
  const validated = LoginValidator.validate(req.body);
  if (validated.error) {
    throw validated.error.details;
  }

  const { user } = await signInWithEmailAndPassword(
    getAuth(),
    validated.value.email,
    validated.value.password
  ).catch(() => {
    throw new StandardError("Invalid emal or password!", 422);
  });

  return {
    data: {
      id: user.uid,
      email: user.email,
      token: await user.getIdToken(),
    },
    statusCode: 200,
  };
}

export async function userSignUp(req: Request): Promise<StandardResponse> {
  const validated = SignUpValidator.validate(req.body);
  if (validated.error) {
    throw validated.error.details;
  }

  const authAdmin = getAuthAdmin();

  const [isEmaiExist, isPhoneNumberExist] = await Promise.all([
    authAdmin.getUserByEmail(validated.value.email).catch(() => false),
    authAdmin
      .getUserByPhoneNumber(validated.value.phoneNumber)
      .catch(() => false),
  ]);

  if (isEmaiExist) {
    throw new StandardError("email already exists", 422);
  }

  if (isPhoneNumberExist) {
    throw new StandardError("phoneNumber already exists", 422);
  }

  const user = await authAdmin.createUser({
    email: validated.value.email,
    password: validated.value.password,
    phoneNumber: validated.value.phoneNumber,
    displayName: validated.value.displayName,
  });

  const userCredential = await signInWithEmailAndPassword(
    getAuth(),
    validated.value.email,
    validated.value.password
  );

  return {
    data: {
      id: user.uid,
      email: user.email,
      token: await userCredential.user.getIdToken(),
    },
    statusCode: 201,
  };
}

export async function userSignOut(req: Request): Promise<StandardResponse> {
  const authAdmin = getAuthAdmin();
  await authAdmin.revokeRefreshTokens(req.get("authorization")! as string);

  return {
    data: {},
    statusCode: 200,
  };
}
