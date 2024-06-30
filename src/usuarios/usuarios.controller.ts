import {Body, ConflictException, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CadastrarUsuariosDto } from "./DTO/cadastrar-usuarios.dto";
import { UsuariosService } from "./usuarios.service";
import { AtulaizarUsuarioDto } from "./DTO/atualizar-usuario.dto";
import { EditarUsuariosDto } from "./DTO/editar-usuarios.dto";

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService : UsuariosService){}

  @Post('cadastrar')
  async cadastrar( @Body() data : CadastrarUsuariosDto ){

    const nomeOuEmail = data.nome || data.email;
    const usuarioExiste = await this.usuariosService.existi(nomeOuEmail);

    if (usuarioExiste) {
      throw new ConflictException('Nome ou e-mail já existe.')
    }

    return this.usuariosService.cadastarUsuarios(data);
  };

  @Get('listar')
  async listar(){
    return this.usuariosService.listarUsuarios();
  };

  @Get('buscarPorId/:id')
  async buscarPorId( @Param( 'id', ParseIntPipe ) id: number   ){
      return this.usuariosService.busacarPorId(id);
  };

  @Put('editar/:id')
  async editar( @Body() data : EditarUsuariosDto, @Param('id', ParseIntPipe) id: number ){
    return this.usuariosService.editar( id, data );
  };

  @Patch('atualizar/:id')
  async atualizar(@Body() data : AtulaizarUsuarioDto, @Param('id', ParseIntPipe) id: number){
    return this.usuariosService.atualizarUsuarios(id, data);
  };
};