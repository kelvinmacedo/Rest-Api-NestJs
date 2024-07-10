import { IsEmail } from "class-validator";

export class AuthRedefinirSenhaDto {
  @IsEmail()
  email: string;
}