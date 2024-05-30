import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import * as admin from 'firebase-admin'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		@Inject('FIREBASE_APP') private firebaseApp: admin.app.App,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const permissions = this.reflector.get<string[] | null>(
			'permissions',
			context.getHandler(),
		)
		const request = context.switchToHttp().getRequest()
		const authorizationHeader = request.headers?.authorization

		if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
			throw new UnauthorizedException(
				'Authorization token is missing or invalid.',
			)
		}

		const idToken = authorizationHeader.split(' ')[1]

		try {
			const decodedToken = await this.firebaseApp.auth().verifyIdToken(idToken)

			if (!permissions) {
				return true
			}

			const userHasPermission = permissions.includes(decodedToken.role)

			if (!userHasPermission) {
				throw new UnauthorizedException(
					'You do not have permission to access this resource.',
				)
			}

			return true
		} catch (error) {
			console.error('Authentication error:', error)
			throw error
		}
	}
}
