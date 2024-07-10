import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UsuariosController } from "./usuarios.controller";
import { UsuariosService } from "./usuarios.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsuariosRepository } from "./models/usuario.repository";
import { UsuarioIdCheckMiddlewares } from "src/middlewares/usuario-id-check.middlewares";
import { authModule } from "src/auth/auth.module";

@Module({
  imports : [PrismaModule],
  controllers : [UsuariosController],
  providers : [UsuariosService, UsuariosRepository],
  exports: [UsuariosService]
})
export class UsuariosModule implements NestModule {


  configure(consumer: MiddlewareConsumer) {
    const usuariosRouters = [
      {path : 'usuarios/listar ', method : RequestMethod.GET},
      {path : 'usuarios/buscarPorId/:id', method : RequestMethod.GET},
      {path : 'usuarios/cadastrar', method : RequestMethod.POST},
      {path : 'usuarios/editar/:id', method : RequestMethod.PUT},
      {path : 'usuarios/atualizar/:id', method : RequestMethod.PATCH}
    ]
    consumer.apply(UsuarioIdCheckMiddlewares).forRoutes(...usuariosRouters)

  }

  
};