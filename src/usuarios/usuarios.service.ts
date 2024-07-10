import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CadastrarUsuariosDto } from "./dto/cadastrar-usuarios.dto";
import { AtulaizarUsuarioDto } from "./dto/atualizar-usuario.dto";
import { EditarUsuariosDto } from "./dto/editar-usuarios.dto";
import { UsuariosRepository } from "./models/usuario.repository";
@Injectable()
export class UsuariosService {
  
  constructor( private readonly usuariosRepository : UsuariosRepository ){};

  async cadastarUsuarios (data: CadastrarUsuariosDto){ 
    const existiEmailOuId = await this.usuariosRepository.existi(undefined, data.email);
    if (existiEmailOuId) {
      throw new HttpException('E-mail de usuario jã existe!', HttpStatus.CONFLICT);
    }
    return await this.usuariosRepository.criarUsuario(data);
  };

  async listarUsuarios (){
    return this.usuariosRepository.listar();
  };

  async buscarUsuariosPorId (id : number){
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