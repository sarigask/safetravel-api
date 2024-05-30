import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiHeader,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { AuthGuard } from 'auth/auth.guard'
import { AdminRole } from 'shared/enums'

export function Auth(...permissions: AdminRole[]) {
	return applyDecorators(
		SetMetadata('permissions', permissions.length ? permissions : null),
		UseGuards(AuthGuard),
		ApiBearerAuth(),
		ApiHeader({
			name: 'authorization',
			description: 'Bearer token required for authentication',
		}),
		ApiUnauthorizedResponse({
			description: 'Unauthorized if token is missing or invalid',
		}),
	)
}
