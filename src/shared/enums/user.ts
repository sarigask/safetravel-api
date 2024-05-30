export const UserStatus = {
	active: 'Active',
	inactive: 'Inactive',
	blocked: 'Blocked',
} as const

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]

export const VerificationStatus = {
	unVerified: 'Unverified',
	pending: 'Pending',
	verified: 'Verified',
} as const

export type VerificationStatus =
	(typeof VerificationStatus)[keyof typeof VerificationStatus]

export const AdminRoleType = {
	superAdmin: 'SuperAdmin',
	admin: 'Admin',
	frontDesk: 'FrontDesk',
} as const
export type AdminRole = (typeof AdminRoleType)[keyof typeof AdminRoleType]
