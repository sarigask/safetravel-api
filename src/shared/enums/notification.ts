// export enum NotificationStatus {
//   DRAFT = 'Draft',
//   SENT = 'Sent',
// }

// export enum NotificationType {
//   JOB_STATUS = 'Job Status',
//   MARKETING = 'Marketing',
//   // Add other types as needed
// }
export const NotificationStatus = {
	draft: 'Draft',
	sent: 'Sent',
} as const

export const NotificationType = {
	jobStatus: 'Job Status',
	marketing: 'Marketing',
} as const

export type NotificationStatus =
	(typeof NotificationStatus)[keyof typeof NotificationStatus]
export type NotificationType =
	(typeof NotificationType)[keyof typeof NotificationType]
