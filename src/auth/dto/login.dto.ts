import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
	@ApiProperty({
		example: 'user@gmail.com',
		description: 'The email of the user',
	})
	email: string

	@ApiProperty({
		example: 'Create@1234',
		description: 'The password of the user',
	})
	password: string
}
