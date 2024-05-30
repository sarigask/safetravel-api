import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from 'auth/auth.module'
import { S3Module } from 's3/s3.module'
import { User, UserSchema } from 'shared/entities/user.entity' // Ensure this path is correct
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		AuthModule,
		S3Module,
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
