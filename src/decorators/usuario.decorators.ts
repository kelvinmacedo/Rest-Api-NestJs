import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";

export const UsuarioDec = createParamDecorator(( filter : string, context : ExecutionContext) => {

  const req = context.switchToHttp().getRequest();

  if(req.usuarioDec){

    if(filter){
      return req.usuarioDec[filter];
    } else{
      return req.usuarioDec;
    }

  } else {
    throw new BadRequestException('Usuario não encontrado no resquest verifique o authGuard!');
  };
});
