import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const UserToBody = createParamDecorator((data: unknown, ctx: ExecutionContext): ExecutionContext => {
    const req = ctx.switchToHttp().getRequest()
    if (!req.body) {
        req.body = {}
    }
    req.body.user = req.user
    return req
})