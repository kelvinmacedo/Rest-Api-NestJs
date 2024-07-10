import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { authModule } from './auth/auth.module';



@Module({
  imports: [UsuariosModule, authModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
