import { Module } from "@nestjs/common";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosService } from "./usuarios.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports : [PrismaModule],
  controllers : [UsuariosController],
  providers : [UsuariosService],
  exports: []
})
export class UsuariosModule {};