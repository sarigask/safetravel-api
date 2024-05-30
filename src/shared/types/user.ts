import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class ImageType {
	@ApiProperty({ type: String })
	fileName: string

	@ApiPropertyOptional({ type: String })
	url?: string
}
