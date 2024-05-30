import { HttpLoggerMiddleware } from '@nest-toolbox/http-logger-middleware'
import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { AuthModule } from 'auth/auth.module'
import { env } from 'config'
import { S3Module } from 's3/s3.module'
import { AppController } from './app.controller'
import { NotificationModule } from './notification/notification.module'
import { TrackingModule } from './tracking/tracking.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		UserModule,
		// NotificationModule,
		AuthModule,
		S3Module,
		MongooseModule.forRoot(env.DB.hostUrl, { dbName: env.DB.name }),
		ThrottlerModule.forRoot([
			{
				ttl: 60000,
				limit: 250,
			},
		]),
		TrackingModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer): void {
		if (env.APP.nodeEnv !== 'production') {
			consumer.apply(HttpLoggerMiddleware).forRoutes({
				path: '*',
				method: RequestMethod.ALL,
			})
		}
	}
}
