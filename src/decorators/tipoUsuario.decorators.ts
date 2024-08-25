import { SetMetadata } from "@nestjs/common";
import { TipoUsuario } from "src/enum/tipoUsuario.enum";

export const TipoUsuarioDecorators = (...tipoUsuario: TipoUsuario[]) => SetMetadata('tipoUsuario', tipoUsuario);