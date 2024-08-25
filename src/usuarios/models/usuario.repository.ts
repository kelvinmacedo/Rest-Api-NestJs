import { PrismaService } from "src/prisma/prisma.service";
import { CadastrarUsuariosDto } from "../dto/cadastrar-usuarios.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AtulaizarUsuarioDto } from "../dto/atualizar-usuario.dto";
import { EditarUsuariosDto } from "../dto/editar-usuarios.dto";


@Injectable()
export class UsuariosRepository{
  constructor(private readonly prisma : PrismaService){}

  async criarUsuario(data : CadastrarUsuariosDto){
    try{
      const criarUsuario = await this.prisma.users.create ({
        data,
      });
      return criarUsuario;
    }catch(error){
      console.error('Erro ao criar usuário no banco: ', error);
      throw new HttpException('Não foi possivel cadastrar usuário.', HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  async listar(){
    return this.prisma.users.findMany();
  };

  async buscar(id : number){
    try{
      const buscarPorId = await this.prisma.users.findUnique({
        where:{
          id,
        }
      });
      return buscarPorId;
    }catch(error){
      console.error('Erro ao buscar usuário no banco: ', error);
      throw new HttpException('Usuário não encontrado.', HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  async editar(id : number, data: EditarUsuariosDto){
    try {
      const usuarioUpdate = this.prisma.users.update({
        where:{
          id
        },
        data:{
          update_data: new Date(),
          ...data,
        },
      });
      return usuarioUpdate;
    }catch(error){
      console.error('Erro ao editar usuário no banco: ', error);
      throw new HttpException('Não foi possivel editar o usuário.', HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  async atualizar(id : number, data : AtulaizarUsuarioDto){
    try{
      const atualizar = await this.prisma.users.update({
        where:{
          id,
        },
        data,
      });
      return atualizar;
    }catch(error){
      console.error('Erro ao atualizar usuário no banco: ', error);
      throw new HttpException('Não foi possivel atualizar usuário.', HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  async existi( id: number, email: string){
      const isExiste = id ? { OR: [{ email }, { id }] } : { email };
      return this.prisma.users.findFirst({
        where: isExiste,
      });
  };

};