import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

@Schema({ timestamps: true })
export class HelpRequest {
	@Prop({ type: Types.ObjectId, required: true, ref: 'User' })
	user: Types.ObjectId

	@Prop({ type: [Types.ObjectId], ref: 'User' })
	trackedUsers: Types.ObjectId[]

	@Prop({ type: [Types.ObjectId], ref: 'User' })
	availableUsers: Types.ObjectId[]

	@Prop({
		type: [Number],
		index: '2dsphere',
	})
	coordinates!: number[]

	@Prop({
		type: String,
		enum: ['requested', 'inProgress', 'resolved'],
		default: 'requested',
	})
	status: string
}

export type HelpRequestDocument = Document & HelpRequest

export const HelpRequestSchema = SchemaFactory.createForClass(HelpRequest)
