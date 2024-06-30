import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptors implements NestInterceptor {
  intercept( context: ExecutionContext, next: CallHandler ): Observable<any>{
    
    const date = Date.now();
    
    return next.handle().pipe( tap( () => {

      const request = context.switchToHttp().getRequest();

      console.log(request.method, request.url, `Tempo de Execução ${Date.now() - date} milisegundos.`);


    }))
  }
} 