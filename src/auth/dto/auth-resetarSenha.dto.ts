import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthResetarSenhaDto {
  @IsStrongPassword({
    minLength : 8,
    minLowercase : 1,
    minNumbers : 1,
    minSymbols : 1,
    minUppercase : 1,
  })
  senha : string;

  @IsJWT()
  token: string;
}