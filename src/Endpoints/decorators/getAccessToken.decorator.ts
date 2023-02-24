import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getAccessTokenDecorator = createParamDecorator((data: string | undefined, context: ExecutionContext)=>{
  const request = context.switchToHttp().getRequest();
  return request.headers["authorization"]
})