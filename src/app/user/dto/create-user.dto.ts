import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsEmail,
	IsEnum,
	IsNumberString,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
	ValidateIf,
} from 'class-validator'
import { PaginationDto } from 'shared/dto/pagination'
import { UserStatus } from 'shared/enums/admin'
import { ImageType } from 'shared/types/user'

export class CreateUserDto {
	@ApiProperty({
		example: 'John',
		required: true,
	})
	@IsOptional()
	@IsString()
	@MinLength(2, { message: 'Full name must be at least 2 characters long' })
	@MaxLength(50, { message: 'Full name cannot be longer than 50 characters' })
	fullName?: string

	@ApiPropertyOptional({
		example: 'JohnDoe@gmail.com',
		description: 'User Email',
	})
	@IsOptional()
	@ValidateIf(o => !o.phone)
	@IsEmail()
	email?: string

	@ApiPropertyOptional({ example: '9089678781', description: 'Mobile Number' })
	@IsOptional()
	@ValidateIf(o => !o.email)
	@IsNumberString()
	@MinLength(10, { message: 'Please enter a valid 10 digit phone number' })
	phone?: string

	@ApiPropertyOptional({ example: '25/10/1995', description: 'User DOB' })
	@IsOptional()
	@IsString()
	dob?: string

	@ApiPropertyOptional({ example: '123456', description: 'User Zipcode' })
	@IsOptional()
	@IsString()
	zipcode?: string

	@ApiPropertyOptional({ example: 'eDDFDFDDF', description: 'expo push token' })
	@IsOptional()
	@IsString()
	deviceId?: string

	@ApiPropertyOptional({ example: 'Address Line 1' })
	@IsOptional()
	@IsString()
	addressLine1?: string

	@ApiPropertyOptional({ example: 'Address Line 2' })
	@IsOptional()
	@IsString()
	addressLine2?: string

	@ApiPropertyOptional({ description: "User's kyc" })
	@IsOptional()
	kyc?: ImageType

	@ApiPropertyOptional({ description: 'Firebase User id' })
	@IsOptional()
	@IsString()
	firebaseId?: string
}

export class GetAllUsersDto extends PaginationDto {
	@IsOptional()
	@IsEnum(UserStatus)
	@ApiPropertyOptional({
		enum: UserStatus,
		required: false,
	})
	status?: UserStatus = UserStatus.active
}
