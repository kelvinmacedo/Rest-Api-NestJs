import { PartialType } from "@nestjs/mapped-types";
import { CadastrarUsuariosDto } from "./cadastrar-usuarios.dto";

export class AtulaizarUsuarioDto extends PartialType(CadastrarUsuariosDto){

}