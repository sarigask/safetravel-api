import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber, Min } from 'class-validator'

export class PaginationDto {
	@ApiProperty({ example: 1 })
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	page = 1

	@ApiProperty({ example: 20 })
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	pageSize = 15
}

export class PaginationResponseType {
	@ApiProperty({ type: () => Number, example: 1 })
	page = 2

	@ApiProperty({ type: () => Number })
	pageSize = 2

	@ApiProperty({ type: () => Number })
	total!: number
}
