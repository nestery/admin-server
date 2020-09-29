import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnsupportedMediaTypeException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ContentTypes } from '../enums/content-types.enum';
import { ExceptionMessages } from '../exceptions/exeptions-msg.enum';

@Injectable()
export class ContentTypeValidator implements NestInterceptor {
    private type = ""
    constructor(type: ContentTypes) {
        this.type = type
    }
    intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
        const req = ctx.switchToHttp().getRequest()

        switch (this.type) {
            case ContentTypes.FORMDATA:
                if (!req.isMultipart()) {
                    throw new UnsupportedMediaTypeException(ExceptionMessages.SUPPORT_MULTIPART_FORMDATA_ONLY)
                }
                break;

            default:
                break;
        }
        return next.handle()
    }
}