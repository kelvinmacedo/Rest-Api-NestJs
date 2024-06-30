import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CadastrarUsuariosDto } from "./DTO/cadastrar-usuarios.dto";
import { AtulaizarUsuarioDto } from "./DTO/atualizar-usuario.dto";
import { EditarUsuariosDto } from "./DTO/editar-usuarios.dto";

@Injectable()
export class UsuariosService {

  constructor(private readonly prisma : PrismaService){}

  async cadastarUsuarios (data: CadastrarUsuariosDto){
    
    return this.prisma.users.create ({
      data,
    });  
  
  };

  async listarUsuarios (){
    return this.prisma.users.findMany({
    });
  };

  async busacarPorId (id : number){
    return this.prisma.users.findUnique({
      where : {
        id,
      }
    });
  };

  async editar(id: number, data: EditarUsuariosDto, ){
    return this.prisma.users.update({
      data,
      where : {
        id,
      }
    });
  };

  async atualizarUsuarios(id : number, data: AtulaizarUsuarioDto){
    return this.prisma.users.update({
      data,
      where : {
        id,
      }
    });
  };

  async existi(nomeOuEmail: string): Promise<boolean>{
    const usuarioExiste = await this.prisma.users.findFirst({
      where : {
        OR : [
          {nome : nomeOuEmail },
          { email : nomeOuEmail },
        ],
      },
    });

    return!!usuarioExiste;

  };
}