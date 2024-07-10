import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsuariosModule } from "src/usuarios/usuarios.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./models/auth.repository";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports : [JwtModule.register({
    secret : `b0e52d30c98bd48d16dd71259c782d5f`
    }),
    UsuariosModule,
    PrismaModule
  ],
  controllers : [AuthController],
  providers : [AuthService, AuthRepository]
})
export class authModule{

}