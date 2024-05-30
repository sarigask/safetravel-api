export const UserStatus = {
	active: 'Active',
	inactive: 'Inactive',
	blocked: 'Blocked',
} as const

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]

export const AdminRoleType = {
	superAdmin: 'SuperAdmin',
	admin: 'Admin',
	frontDesk: 'FrontDesk',
} as const
export type AdminRole = (typeof AdminRoleType)[keyof typeof AdminRoleType]
