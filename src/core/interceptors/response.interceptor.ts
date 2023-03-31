import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<ResponseData> {
		const now = Date.now();
		const httpContext = context.switchToHttp();
		const request = httpContext.getRequest();

		const response = next.handle().pipe<ResponseData>(
			map(
				(data): ResponseData => ({
					data: data,
					isArray: Array.isArray(data),
					path: request.path,
					duration: `${Date.now() - now}ms`,
					method: request.method,
				}),
			),
		);

		return response;
	}
}

interface ResponseData {
	data: any;
	isArray: boolean;
	path: string;
	duration: string;
	method: string;
}
