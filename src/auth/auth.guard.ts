import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { UsuarioDec } from "src/decorators/usuario.decorators";

@Injectable()
export class AuthGuard implements CanActivate{
  
constructor( 
  private readonly authService : AuthService, 
  private readonly usuariosService : UsuariosService
) {}

  async canActivate(context: ExecutionContext){
    const req = context.switchToHttp().getRequest();
    const {authorization} = req.headers;
    
    try {
      const data = this.authService.verificarToken((authorization ?? '').split(' ')[1]);
      
      req.payload = data;
      req.usuarioDec = await this.usuariosService.buscarUsuariosPorId(data.id);      

      return true;

    } catch (erro){

      throw new BadRequestException(erro);
 
    };
  };
};