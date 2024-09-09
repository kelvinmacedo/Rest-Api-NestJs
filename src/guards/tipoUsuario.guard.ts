import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TIPO_USUARIO_KEY } from "src/decorators/tipoUsuario.decorators";
import { TipoUsuario } from "src/enum/tipoUsuario.enum";


export class TipoUsuarioGuard implements CanActivate{
  
  constructor( private readonly reflector: Reflector){}
  
  canActivate(context: ExecutionContext){

    const respostaTipoUsuario = this.reflector.getAllAndOverride<TipoUsuario[]>(TIPO_USUARIO_KEY, [context.getHandler(), context.getClass()]);
    console.log("🚀 ~ TipoUsuarioGuard ~ canActivate ~ respostaTipoUsuario:", respostaTipoUsuario)
    
    if(!respostaTipoUsuario){
      return true;
    }
    const {ususraio} = context.switchToHttp().getRequest();
    const filtrarUsuario = respostaTipoUsuario.filter(tipoUsuario => tipoUsuario === ususraio.tipoUsuario);
    return filtrarUsuario.length > 0;

  }

}