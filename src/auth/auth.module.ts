import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsuariosModule } from "src/usuarios/usuarios.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./models/auth.repository";


@Module({
  imports : [JwtModule.register({
    secret : `b0e52d30c98bd48d16dd71259c782d5f`
    }),
    forwardRef(() => UsuariosModule),
    PrismaModule
  ],
  controllers : [AuthController],
  providers : [AuthService, AuthRepository],
  exports : [AuthService]
})
export class authModule{

}