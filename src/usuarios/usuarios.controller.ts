import {Body, Controller, Get, HttpException, HttpStatus, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { CadastrarUsuariosDto } from "./dto/cadastrar-usuarios.dto";
import { UsuariosService } from "./usuarios.service";
import { AtulaizarUsuarioDto } from "./dto/atualizar-usuario.dto";
import { EditarUsuariosDto } from "./dto/editar-usuarios.dto";
import { ParamId } from "src/decorators/paramId.decorators";
import { TipoUsuarioDecorators } from "src/decorators/tipoUsuario.decorators";
import { TipoUsuarioGuard } from "src/guards/tipoUsuario.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { TipoUsuario } from "src/enum/tipoUsuario.enum";

@UseGuards(AuthGuard, TipoUsuarioGuard)
@Controller('usuarios')
export class UsuariosController {

  constructor(private readonly usuariosService : UsuariosService){}
  
  @TipoUsuarioDecorators(TipoUsuario.admin)
  @Post('cadastrar')
  async cadastrarUsuarios( @Body() data : CadastrarUsuariosDto ){
    return this.usuariosService.cadastarUsuarios(data);
  };

  @Get('listar')
  async listarUsuarios(){
    return await this.usuariosService.listarUsuarios();
  };

  @Get('buscarPorId/:id')
  async buscarUsuariosPorId( @ParamId() id: number   ){
      return this.usuariosService.buscarUsuariosPorId(id);
  };

  @TipoUsuarioDecorators(TipoUsuario.admin)
  @Put('editar/:id')
  async editarUsuarios( @Body() data : EditarUsuariosDto, @ParamId() id : number){
    return this.usuariosService.editarUsuarios(id, data);
  };

  @TipoUsuarioDecorators(TipoUsuario.admin)
  @Patch('atualizar/:id')
  async atualizarUsuarios(@Body() data : AtulaizarUsuarioDto, @ParamId() id: number){
    return this.usuariosService.atualizarUsuarios(id, data);
  };
};