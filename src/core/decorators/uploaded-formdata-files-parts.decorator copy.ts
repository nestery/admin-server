import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const UploadedFormdataFiles = createParamDecorator(async (data: unknown, ctx: ExecutionContext): Promise<[]> => {
    const req = ctx.switchToHttp().getRequest()
    const parts: [] = await req.files()

    return parts
})