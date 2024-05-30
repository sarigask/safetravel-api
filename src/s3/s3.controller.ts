import {
	BadRequestException,
	Controller,
	Get,
	HttpStatus,
	Post,
	Query,
	Req,
	Res,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { Multer } from 'multer'
import {
	fileFilterValidationRule,
	imageFileFilterValidationRule,
} from 'shared/utils/file-filters'
import { S3Service } from './s3.service'

@ApiTags('S3')
@Controller('s3')
export class S3Controller {
	private bucketName: string

	constructor(private readonly s3Service: S3Service) {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		this.bucketName = process.env.AWS_BUCKET_NAME!
	}

	@Post('upload-images')
	@UseInterceptors(
		FilesInterceptor('files', 10, {
			fileFilter: imageFileFilterValidationRule,
		}),
	)
	@ApiConsumes('multipart/form-data')
	@ApiOperation({ summary: 'Upload images' })
	@ApiBody({
		description: 'Upload multiple images',
		type: 'multipart/form-data',
		required: true,
		schema: {
			type: 'object',
			properties: {
				files: {
					type: 'array',
					items: { type: 'string', format: 'binary' },
				},
			},
		},
	})
	async uploadImages(
		@UploadedFiles() files: Express.Multer.File[],
		@Req() req: Request,
	) {
		if (!files || files.length === 0) {
			throw new BadRequestException('No files uploaded.')
		}

		const uploads = await this.s3Service.uploadFiles(files, this.bucketName)
		return { message: 'Images uploaded successfully', uploads }
	}

	@Post('upload-documents')
	@UseInterceptors(
		FilesInterceptor('files', 10, { fileFilter: fileFilterValidationRule }),
	)
	@ApiConsumes('multipart/form-data')
	@ApiOperation({ summary: 'Upload documents' })
	@ApiBody({
		description: 'Upload multiple documents',
		type: 'multipart/form-data',
		required: true,
		schema: {
			type: 'object',
			properties: {
				files: {
					type: 'array',
					items: { type: 'string', format: 'binary' },
				},
			},
		},
	})
	async uploadMultipleDocuments(
		@UploadedFiles() files: Express.Multer.File[],
		@Req() req: Request,
	) {
		if (!files || files.length === 0) {
			throw new BadRequestException('No files uploaded.')
		}

		const uploads = await this.s3Service.uploadFiles(files, this.bucketName)
		return { message: 'Documents uploaded successfully', uploads }
	}

	@Get('signed-url')
	@ApiOperation({ summary: 'Get signed url' })
	async getSignedUrl(
		@Query('filename') filename: string,
		@Res() res: Response,
	) {
		if (!filename) {
			return res
				.status(HttpStatus.BAD_REQUEST)
				.json({ message: 'Filename query parameter is required' })
		}
		try {
			const url = await this.s3Service.getSignedImageUrl(filename)
			return res.status(HttpStatus.OK).json({ url })
		} catch (error) {
			console.error('Failed to get signed URL:', error)
			return res
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.json({ message: 'Failed to generate signed URL' })
		}
	}
}
