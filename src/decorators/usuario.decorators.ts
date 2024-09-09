import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";

export const UsuarioDecorator = createParamDecorator(( filter : string, context : ExecutionContext) => {

  const req = context.switchToHttp().getRequest();

  console.log("🚀 ~ UsuarioDecorator ~ req:", req.usuarioDecorator)
  if(req.usuarioDecorator){

    if(filter){
      return req.usuarioDecorator[filter];
    } else{
      return req.usuarioDecorator;
    }

  } else {
    throw new BadRequestException('Usuario não encontrado no resquest verifique o authGuard!');
  };
});
