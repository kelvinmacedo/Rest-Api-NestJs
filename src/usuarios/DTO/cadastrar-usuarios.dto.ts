import { Optional } from "@nestjs/common";
import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { TipoUsuario } from "src/enum/tipoUsuario.enum";

export class CadastrarUsuariosDto {

  @IsNotEmpty()
  @IsString()
  nome : string;
  
  @IsNotEmpty()
  @IsEmail()
  email : string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength : 8,
    minLowercase : 1,
    minNumbers : 1,
    minSymbols : 1,
    minUppercase : 1,
  })
  senha : string;

  @IsOptional()
  @IsEnum(TipoUsuario)
  tipo_usuarios?: TipoUsuario;
}