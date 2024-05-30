import * as dotenv from 'dotenv'
dotenv.config()
import { z } from 'zod'

const APP = z
	.object({
		port: z.number(),
		nodeEnv: z.string(),
		// origin: z.string().transform(val => val.split(',').map(v => v.trim())),
	})
	.parse({
		port: Number(process.env.APP_PORT),
		nodeEnv: process.env.NODE_ENV,
		// origin: process.env.ORIGIN,
	})

// const HASH = z
// 	.object({
// 		secret: z.string(),
// 	})
// 	.parse({
// 		secret: process.env.HASH_SECRET,
// 	})

const DB = z
	.object({
		hostUrl: z.string(),
		name: z.string(),
	})
	.parse({
		hostUrl: process.env.DB_HOST_URL,
		name: process.env.DB_NAME,
	})

const SWAGGER_STATS = z
	.object({
		username: z.string(),
		password: z.string(),
	})
	.parse({
		username: process.env.SWAGGER_STATS_USERNAME,
		password: process.env.SWAGGER_STATS_PASSWORD,
	})

// const CLERK = z
// 	.object({
// 		issuerUrl: z.string(),
// 		secretKey: z.string(),
// 	})
// 	.parse({
// 		secretKey: process.env.CLERK_SECRET_KEY,
// 		issuerUrl: process.env.CLERK_ISSUER_URL,
// 	})

const FIREBASE = z
	.object({
		type: z.string(),
		projectId: z.string(),
		privateKeyId: z.string(),
		privateKey: z.string(),
		clientEmail: z.string(),
		clientId: z.string(),
		authUri: z.string(),
		tokenUri: z.string(),
		authProviderX509CertUrl: z.string(),
		clientX509CertUrl: z.string(),
		universeDomain: z.string(),
	})
	.parse({
		type: process.env.FIREBASE_TYPE,
		projectId: process.env.FIREBASE_PROJECT_ID,
		privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
		privateKey: process.env.FIREBASE_PRIVATE_KEY,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		clientId: process.env.FIREBASE_CLIENT_ID,
		authUri: process.env.FIREBASE_AUTH_URI,
		tokenUri: process.env.FIREBASE_TOKEN_URI,
		authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
		clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
		universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
	})

export const env = {
	APP,
	DB,
	SWAGGER_STATS,
	// HASH,
	// CLERK,
	FIREBASE,
}
