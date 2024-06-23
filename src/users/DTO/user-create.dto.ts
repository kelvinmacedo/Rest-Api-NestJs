import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class UsersCreateDto {
  
  @IsString()
  nome : string;

  @IsEmail()
  email : string;

  @IsStrongPassword({
    minLength : 8,
    minLowercase : 1,
    minNumbers : 1,
    minSymbols : 1,
    minUppercase : 1,
  })
  senha : string;
}