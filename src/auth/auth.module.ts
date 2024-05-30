import { Module } from '@nestjs/common'
import { env } from 'config'
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as admin from 'firebase-admin'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'

const firebaseProvider = {
	provide: 'FIREBASE_APP',
	useFactory: () => {
		return admin.initializeApp({
			credential: admin.credential.cert(env.FIREBASE),
		})
	},
}

@Module({
	imports: [],
	providers: [AuthService, firebaseProvider, AuthGuard],
	exports: [firebaseProvider, AuthService, AuthGuard],
})
export class AuthModule {}
