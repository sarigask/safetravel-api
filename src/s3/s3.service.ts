import { randomUUID } from 'node:crypto'
import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'

@Injectable()
export class S3Service {
	private s3Client: S3Client

	constructor() {
		this.s3Client = new S3Client({
			region: process.env.AWS_REGION || 'ap-south-1',
			credentials: {
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
			},
		})
	}
	async uploadFiles(
		files: Express.Multer.File[],
		bucket: string,
	): Promise<{ filenames: string[]; urls: string[] }> {
		const uploadPromises = files.map(async file => {
			const { originalname, buffer } = file
			const filename = `${randomUUID()}-${originalname}`

			const putCommand = new PutObjectCommand({
				// biome-ignore lint/style/useNamingConvention: <explanation>
				Bucket: bucket,
				// biome-ignore lint/style/useNamingConvention: <explanation>
				Key: filename,
				// biome-ignore lint/style/useNamingConvention: <explanation>
				Body: buffer,
			})

			await this.s3Client.send(putCommand)

			const result = new GetObjectCommand({
				// biome-ignore lint/style/useNamingConvention: <explanation>
				Bucket: bucket,
				// biome-ignore lint/style/useNamingConvention: <explanation>
				Key: filename,
			})

			const signedUrl = await getSignedUrl(this.s3Client, result, {
				expiresIn: 3600,
			})

			return { filename, url: signedUrl }
		})

		const uploads = await Promise.all(uploadPromises)
		const filenames = uploads.map(upload => upload.filename)
		const urls = uploads.map(upload => upload.url)
		return { filenames, urls }
	}

	async getSignedImageUrl(filename: string): Promise<string> {
		try {
			const result = new GetObjectCommand({
				// biome-ignore lint/style/useNamingConvention: <explanation>
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				Bucket: process.env.AWS_BUCKET_NAME!,
				// biome-ignore lint/style/useNamingConvention: <explanation>
				Key: filename,
			})

			const signedUrl = await getSignedUrl(this.s3Client, result, {
				expiresIn: 3600,
			})
			return signedUrl
		} catch (error) {
			console.log('🚀 error', error)
			throw new Error(`Failed to get signed URL for file: ${filename}`)
		}
	}
}
