import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService){}
  
  async login( email: string, senha : string ){
    return await this.prisma.users.findFirst({
      where: {
        email,
        senha,
      }
    });
  }

  async redefinirSenha(email : string){
    return await this.prisma.users.findFirst({
      where: {
        email,
      }
    });
  }
  async resetarSenha(id : number, senha : string, token : string){
    return await this.prisma.users.update({
      where : {
        id,
      },
      data : {
        senha,
      }
    });
  }
}
