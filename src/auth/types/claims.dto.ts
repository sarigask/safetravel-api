import { ApiProperty } from '@nestjs/swagger'
import mongoose from 'mongoose'
import { UserStatus } from 'shared/enums'
import { AdminRole, AdminRoleType } from 'shared/enums/admin'

export class Claims {
	@ApiProperty({
		description: 'Specifies if the user has admin privileges',
		example: true,
		required: true,
		type: Boolean,
	})
	admin: boolean

	@ApiProperty({
		description: 'Reference identifier for the claim',
		example: 'ADM123',
		required: true,
		type: String,
	})
	referenceId: string

	@ApiProperty({
		description: 'Role of the user within the system',
		enum: AdminRoleType,
		example: AdminRoleType.admin,
		required: true,
	})
	role: AdminRole

	@ApiProperty({
		description: 'Current status of the user',
		enum: UserStatus,
		example: UserStatus.active,
		required: true,
	})
	status: UserStatus

	@ApiProperty({
		description: 'User ID associated with the claims, if available',
		example: '12345',
		required: false,
		nullable: true,
	})
	userId?: mongoose.Types.ObjectId | null
}
