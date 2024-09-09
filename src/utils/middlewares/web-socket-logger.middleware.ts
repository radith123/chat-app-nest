import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";


@Injectable()
export class WebSocketLogging implements NestInterceptor {
    private readonly logger = new Logger("HTTP");

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const client = context.switchToWs().getClient();
        const data = context.switchToWs().getData();

        const userName = client?.user?.name || 'Unknown User';
        this.logger.log(`WebSocket message from ${userName} received: ${JSON.stringify(data)}`);

        return next
            .handle()
            .pipe(
                tap((res) =>
                    console.log(`WebSocket response: ${JSON.stringify(res)}`),
                ),
            );
    }
}