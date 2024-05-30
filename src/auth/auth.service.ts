import { Inject, Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { Claims } from './types/claims.dto'

@Injectable()
export class AuthService {
	constructor(@Inject('FIREBASE_APP') private firebaseApp: admin.app.App) {}

	async registerUser(email: string, password: string, claims: Claims) {
		/**
		 * Registers a new user in Firebase Authentication.
		 * @param email The email address of the user.
		 * @param password The password for the user.
		 * @param claims Custom claims to assign to the user (for access control).
		 * @returns The Firebase user record.
		 */
		const userRecord = await this.firebaseApp.auth().createUser({
			email,
			password,
		})
		await this.firebaseApp.auth().setCustomUserClaims(userRecord.uid, claims)
		return userRecord
	}
	/**
	 * Deletes a user from Firebase Authentication.
	 * @param uid The Firebase User ID of the user to be deleted.
	 * @returns A promise that resolves when the user is deleted successfully.
	 */
	async deleteUser(uid: string): Promise<void> {
		await this.firebaseApp.auth().deleteUser(uid)
	}

	/**
	 * Bulk deletes Firebase users.
	 * @param firebaseIds Array of Firebase user IDs to delete.
	 */
	async bulkDeleteUsers(firebaseIds: string[]): Promise<void> {
		const deleteLimit = 1000 // Firebase batch delete limit per call
		for (let i = 0; i < firebaseIds.length; i += deleteLimit) {
			const batch = firebaseIds.slice(i, i + deleteLimit)
			await this.firebaseApp.auth().deleteUsers(batch)
		}
	}
}
