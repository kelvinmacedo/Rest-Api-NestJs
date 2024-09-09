import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CadastrarUsuariosDto } from "./dto/cadastrar-usuarios.dto";
import { AtulaizarUsuarioDto } from "./dto/atualizar-usuario.dto";
import { EditarUsuariosDto } from "./dto/editar-usuarios.dto";
import { UsuariosRepository } from "./models/usuario.repository";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsuariosService {
  
  constructor( private readonly usuariosRepository : UsuariosRepository ){};

  async cadastarUsuarios (data: CadastrarUsuariosDto){ 
    
    const existiEmailOuId = await this.usuariosRepository.existi(undefined, data.email);
    
    data.senha = await bcrypt.hash( data.senha, 36 );

    if (existiEmailOuId) {
      throw new HttpException('E-mail de usuario jã existe!', HttpStatus.CONFLICT);
    }
    
    console.log("🚀 ~ UsuariosService ~ cadastarUsuarios ~ data:", data);

    return await this.usuariosRepository.criarUsuario(data);
  };

  async listarUsuarios (){
    const listar = await this.usuariosRepository.listar();

    if (!listar || listar.length === 0 ) {
      throw new HttpException('Nenhum usuário encontrado.', HttpStatus.OK);
    };
    
    return listar;
  };

  async buscarUsuariosPorId (id : number){
    if(!id){
      throw new HttpException('Esse id e invalido!', HttpStatus.BAD_REQUEST);
    };
    return this.usuariosRepository.buscar(id);
  };

  async editarUsuarios (id : number, data: EditarUsuariosDto, ){
    const existiEmailOuId = await this.usuariosRepository.existi( id , data.email);
    if (existiEmailOuId.id !== id && existiEmailOuId.email === data.email) {
      throw new HttpException('E-mail de usuario jã existe!', HttpStatus.CONFLICT);
    }
    return this.usuariosRepository.editar(id, data);
  };

  async atualizarUsuarios(id : number, data: AtulaizarUsuarioDto){
    const existiEmailOuId = await this.usuariosRepository.existi(id, data.email);
    if (existiEmailOuId.id !== id && existiEmailOuId.email === data.email) {
      throw new HttpException('E-mail de usuario jã existe!', HttpStatus.CONFLICT);
    }
    return this.usuariosRepository.atualizar(id, data);
  };
}