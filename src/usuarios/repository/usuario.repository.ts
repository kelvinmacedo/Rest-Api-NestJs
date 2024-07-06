import { PrismaService } from "src/prisma/prisma.service";
import { CadastrarUsuariosDto } from "../dto/cadastrar-usuarios.dto";
import { Injectable } from "@nestjs/common";
import { AtulaizarUsuarioDto } from "../dto/atualizar-usuario.dto";
import { EditarUsuariosDto } from "../dto/editar-usuarios.dto";
import { promises } from "dns";

@Injectable()
export class UsuariosRepository{
  constructor(private readonly prisma : PrismaService){}

  async criarUsuario(data : CadastrarUsuariosDto){
    return await this.prisma.users.create ({
      data,
    });
  }

  async listar(){
    return this.prisma.users.findMany();
  };

  async buscar(id : number){
    return this.prisma.users.findUnique({
      where:{
        id,
      }
    })
  };

  async editar(id : number,data:EditarUsuariosDto){
    return this.prisma.users.update({
      data:{update_data: new Date(),
      },
      where:{
        id,
      }
    })
  };

  async atualizar(id : number, data : AtulaizarUsuarioDto){
    return this.prisma.users.update({
      data,
      where:{
        id,
      }
    })
  };

  async existi( id: number, email: string){
      if(id){
        return this.prisma.users.findFirst({
          where :{
            OR:[
                {email: email},
                {id: id}
              ]}
        });
    }

    return this.prisma.users.findFirst({
      where:{email}
    });
  }

}