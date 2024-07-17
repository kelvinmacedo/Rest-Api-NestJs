import { Body, Controller, Headers, HttpStatus, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegistarDto } from "./dto/auth-Registar.dto";
import { AuthRedefinirSenhaDto } from "./dto/auth-redefinirSenha.dto";
import { AuthResetarSenhaDto } from "./dto/auth-resetarSenha.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { UsuarioDec } from "src/decorators/usuario.decorators";


@Controller('auth')
export class AuthController{

  constructor( 
    private readonly authService : AuthService
   ){}

  @Post('login')
  async login(@Body() body : AuthLoginDto){
    return this.authService.login(body.email, body.senha);
  };
  
  @Post('registrar')
  async registar(@Body() body : AuthRegistarDto){
    return this.authService.registrar(body);
  };
  
  @Post('redefinirSenha')
  async redefinirSenha(@Body() {email} : AuthRedefinirSenhaDto){
    return this.authService.redefinirSenha(email);
  };
  
  @Patch('resetarSenha')
  async resetarSenha(@Body() {senha, token} : AuthResetarSenhaDto){
    return this.authService.resetarSenha( senha, token );
  };

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@UsuarioDec('nome') usuario){
    return {message:'Seja Bem-vindo ', usuario};
    // return this.authService.verificarToken(body);

  }
  
}