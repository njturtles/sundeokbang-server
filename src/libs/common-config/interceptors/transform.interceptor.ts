import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor {
    constructor(private readonly classType: new (...args: any[]) => T) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        return next.handle().pipe(
            map((data) =>
                plainToInstance(this.classType, data, {
                    excludeExtraneousValues: true,
                }),
            ),
        );
    }
}
