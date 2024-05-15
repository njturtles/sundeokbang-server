import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RequestContextService } from './request-context.service';
import ApiHeaders from '../../common-config/res/api.headers';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        RequestContextService.set(
            'DEBUG_RESPONSE_ERROR_LEVEL',
            req.headers[ApiHeaders.DEBUG_RESPONSE_ERROR_LEVEL] || 'default',
        );

        res.on('finish', () => {
            RequestContextService.clear();
        });

        next();
    }
}
