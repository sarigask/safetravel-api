import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ _id: false, autoCreate: true })
export class Image {
	@Prop({ type: String })
	fileName!: string

	@Prop({ type: String })
	url?: string
}

export const ImageSchema = SchemaFactory.createForClass(Image)
