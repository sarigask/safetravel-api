import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { JobQueryType } from 'shared/enums'

export class Tag {
	@ApiProperty({ type: String, required: true })
	name: string

	@ApiProperty({ type: String, required: true })
	icon: string
}

export class ApplicationQuery {
	@ApiProperty({ type: Number })
	id: number

	@ApiProperty({ type: String })
	question: string

	@ApiProperty({ type: String })
	@IsOptional()
	instructions?: string

	@ApiProperty({ enum: JobQueryType, default: JobQueryType.input })
	type: JobQueryType

	@ApiProperty({ type: [String] })
	@IsOptional()
	choices?: string[]

	@ApiProperty({ type: Boolean, default: false })
	required: boolean
}

export enum SortTypes {
	Newest = 'newest',
	Oldest = 'oldest',
}
