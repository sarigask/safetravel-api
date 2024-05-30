import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from 'app/user/user.module'
import { AuthModule } from 'auth/auth.module'
import {
	HelpRequest,
	HelpRequestSchema,
} from 'shared/entities/help-request.entity'
import { TrackingController } from './tracking.controller'
import { TrackingService } from './tracking.service'

@Module({
	imports: [
		AuthModule,
		UserModule,
		MongooseModule.forFeature([
			{ name: HelpRequest.name, schema: HelpRequestSchema },
		]),
	],
	controllers: [TrackingController],
	providers: [TrackingService],
})
export class TrackingModule {}
