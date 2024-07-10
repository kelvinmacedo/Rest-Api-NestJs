import {HttpException, HttpStatus, Injectable, } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "./models/auth.repository";
import { users } from "@prisma/client";
import { CadastrarUsuariosDto } from "src/usuarios/dto/cadastrar-usuarios.dto";
import { UsuariosService } from "src/usuarios/usuarios.service";

@Injectable()
export class AuthService {

  constructor( 
    private readonly jwtService : JwtService, 
    private readonly authRepository : AuthRepository,
    private readonly usuariosService : UsuariosService
  ){}

  async criarToken(usuario : users ){
    return {
      accessToken : this.jwtService.sign({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      },{
        expiresIn: "1h",
        subject: String(usuario.id),
        issuer: "login",
        audience: "usuarios"
      })
    };
  };

  async verificarToken(token : string){
    const data = this.jwtService.verify(token,{
      issuer: "login",
      audience: "usuarios"
    });

    return data;
  }

  async registrar(data : CadastrarUsuariosDto){
    const usuario = await this.usuariosService.cadastarUsuarios(data);

    return this.criarToken(usuario);
  }

  async login( email : string, senha: string){
    const usuario = await this.authRepository.login( email, senha );
    if(!usuario){
      throw new HttpException('Email e/ou senha incorretos!', HttpStatus.UNAUTHORIZED);
    };

    return this.criarToken(usuario);
  };

  async redefinirSenha(email : string){
    const exiteEmail = await this.authRepository.redefinirSenha(email);
    if(!exiteEmail){
      throw new HttpException('E-mail esta incorreto!', HttpStatus.UNAUTHORIZED);
    }
    //enviar email de redefinição de senha.

    return true;
  };

  async resetarSenha(senha : string, token : string ){
    // validar o token de acesso depois.
    console.log(token);
    const id = 0;

    const usuario = await this.authRepository.resetarSenha(id, senha, token);

    return this.criarToken(usuario);
  };

}