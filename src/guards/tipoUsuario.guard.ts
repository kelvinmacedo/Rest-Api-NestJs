import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TIPO_USUARIO_KEY } from "src/decorators/tipoUsuario.decorators";
import { TipoUsuario } from "src/enum/tipoUsuario.enum";


export class TipoUsuarioGuard implements CanActivate{
  
  constructor( private readonly reflector: Reflector){}
  
  canActivate(context: ExecutionContext){

    const res = this.reflector.getAllAndOverride<TipoUsuario[]>(TIPO_USUARIO_KEY, [context.getHandler(), context.getClass()]);
    console.log("🚀 ~ TipoUsuarioGuard ~ canActivate ~ res:", res)
    const req = context.switchToHttp().getRequest();
    
    return true;
  }

}