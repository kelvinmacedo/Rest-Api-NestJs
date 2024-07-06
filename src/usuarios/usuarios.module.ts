import { Module } from "@nestjs/common";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosService } from "./usuarios.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsuariosRepository } from "./repository/usuario.repository";

@Module({
  imports : [PrismaModule],
  controllers : [UsuariosController],
  providers : [UsuariosService, UsuariosRepository],
  exports: []
})
export class UsuariosModule {};