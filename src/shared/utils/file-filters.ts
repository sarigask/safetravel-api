import { NotAcceptableException } from '@nestjs/common'

export const imageFileFilterValidationRule = (
	req: Request,
	file: Express.Multer.File,
	cb: (error: Error | null, acceptFile: boolean) => void,
) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/webp' ||
		file.mimetype === 'image/svg+xml'
	) {
		cb(null, true)
	} else {
		cb(
			new NotAcceptableException(
				`${file.fieldname} must be in PNG, JPG, JPEG, WebP, or SVG format.`,
			),
			false,
		)
	}
}

export const fileFilterValidationRule = (
	req: Request,
	file: Express.Multer.File,
	cb: (error: Error | null, acceptFile: boolean) => void,
) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/webp' ||
		file.mimetype === 'application/pdf' ||
		file.mimetype ===
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
	) {
		cb(null, true)
	} else {
		cb(
			new NotAcceptableException(
				`${file.fieldname} must be in PNG, JPG, JPEG, WebP, PDF, or DOCX format.`,
			),
			false,
		)
	}
}
