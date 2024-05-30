export const JobStatus = {
	active: 'Active',
	inactive: 'Inactive',
} as const

export const JobApplicationStatus = {
	pending: 'Pending',
	review: 'Review',
	selected: 'Selected',
	rejected: 'Rejected',
} as const

export const JobQueryType = {
	radio: 'Radio',
	input: 'Input',
	dropdown: 'Dropdown',
	fileUpload: 'File Upload',
} as const

export enum Countries {
	AllCities = '',
	Dubai = 'Dubai',
	AbuDhabi = 'Abudhabi',
	Ajman = 'Ajman',
	Sharjah = 'Sharjah',
	AlAin = 'Al Ain',
}

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus]
export type JobApplicationStatus =
	(typeof JobApplicationStatus)[keyof typeof JobApplicationStatus]
export type JobQueryType = (typeof JobQueryType)[keyof typeof JobQueryType]

// export enum JobQueryType {
// 	Radio = 'Radio',
// 	Input = 'Input',
// 	Dropdown = 'Dropdown',
// 	FileUpload = 'File Upload',
// }
