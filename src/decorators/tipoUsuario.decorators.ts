import { SetMetadata } from "@nestjs/common";
import { TipoUsuario } from "src/enum/tipoUsuario.enum";

export const TIPO_USUARIO_KEY = 'tipoUsuario';
export const TipoUsuarioDecorators = (...tipoUsuario: TipoUsuario[]) => SetMetadata(TIPO_USUARIO_KEY, tipoUsuario);