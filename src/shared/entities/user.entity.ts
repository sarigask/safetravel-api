import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { UserStatus } from 'shared/enums'
import { Image } from './image.entity'

export type UserDocument = Document & User

@Schema({ timestamps: true })
export class User {
	@Prop({ type: String })
	fullName?: string

	@Prop({ type: String })
	dob?: string

	@Prop({ type: String })
	zipcode?: string

	@Prop({ type: String })
	addressLine1?: string

	@Prop({ type: String })
	addressLine2?: string

	@Prop({ type: String })
	phone?: string

	@Prop({ type: String })
	deviceId?: string

	@Prop({
		type: String,
		unique: true,
		sparse: true,
		validate: {
			validator: (value: string) => (value ? value.trim().length > 0 : true),
			message: 'firebaseId cannot be empty',
		},
		set: (value: string) => (value && value.trim().length > 0 ? value : null),
	})
	firebaseId?: string

	@Prop({
		type: String,
		unique: true,
		sparse: true,
	})
	email?: string

	@Prop({ type: Image })
	kyc?: Image

	@Prop({
		type: String,
		enum: Object.values(UserStatus),
		default: UserStatus.active,
	})
	status: UserStatus

	@Prop({ type: [Number], index: '2dsphere' })
	coordinates: number[]
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.index({ coordinates: '2dsphere' })
