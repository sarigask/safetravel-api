import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Image } from 'shared/entities/image.entity'
import { UserStatus } from 'shared/enums'
import { ImageType } from 'shared/types'

// Data Type for User Profile Image that needs to be verified
export class ProfileImage {
	@ApiProperty({ type: String, required: true })
	image: string

	@ApiProperty({ type: Boolean, default: false })
	verified: boolean
}

// Data Type for User CV that needs to be verified
export class Cv {
	@ApiProperty({ type: String, required: true })
	fileName: string

	@ApiPropertyOptional({ type: String })
	url?: string

	@ApiProperty({ type: Boolean, default: false })
	verified: boolean
}

// Data Type for User EID that needs to be verified
export class Eid {
	@ApiProperty({ type: String, required: true })
	eidNumber: string

	@ApiProperty({ type: [ImageType], required: true })
	image: ImageType[]

	@ApiProperty({ type: Boolean, default: false })
	verificationStatus: boolean

	@ApiProperty({ type: Date, required: true })
	expiryDate: Date
}

// Complete Data Type for User Profile to show on Admin Dashboard
export class GetAllUserDetails {
	@ApiProperty({ type: String, required: true })
	firstName: string

	@ApiProperty({ type: String, required: true })
	lastName: string

	@ApiProperty({ type: String, required: true })
	email: string

	@ApiProperty({ type: String, required: true })
	mobile: string

	@ApiProperty({ type: String })
	image?: string

	@ApiProperty({ type: Eid })
	eid: Eid

	@ApiProperty({ type: [Cv], default: [] })
	cv: Cv[]

	@ApiProperty({ type: [ProfileImage], default: [] })
	profileImages: ProfileImage[]

	@ApiProperty({ enum: UserStatus, default: UserStatus.active })
	status: UserStatus

	@ApiProperty({ type: String })
	adminNotes: string

	@ApiProperty({ type: String })
	createdBy: string

	@ApiProperty({ type: String })
	updatedBy: string
}
