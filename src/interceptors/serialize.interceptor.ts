import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface ClassConstructor {
  new (...args: any[]): {};
}

interface SerializeCallback {
  (data: any): any;
}

export function Serialize(dto: ClassConstructor, callback?: SerializeCallback) {
  return UseInterceptors(new SerializeInterceptor(dto, callback));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(
    private readonly dto: any,
    private readonly callback?: SerializeCallback,
  ) {}

  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return {
          message: data.message,
          result: {
            [Object.keys(data.result)[0]]: plainToInstance(
              this.dto,
              this.callback(data),
              {
                excludeExtraneousValues: true,
              },
            ),
          },
        };
      }),
    );
  }
}
