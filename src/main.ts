import fs from 'node:fs'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'
import compression from 'compression'
import { customCss, env } from 'config'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
// biome-ignore lint/style/noNamespaceImport: <explanation>
import * as swaggerStats from 'swagger-stats'
import { AppModule } from './app/app.module'
async function bootstrap() {
	const logger = new Logger('Safe Travel')
	let app: NestExpressApplication

	if (env.APP.nodeEnv === 'testing1') {
		const httpsOptions = {
			key: fs.readFileSync('./secrets/cert.key'),
			cert: fs.readFileSync('./secrets/cert.crt'),
		}
		app = await NestFactory.create<NestExpressApplication>(AppModule, {
			httpsOptions,
		})
	} else {
		app = await NestFactory.create<NestExpressApplication>(AppModule)
	}

	app.useGlobalPipes(new ValidationPipe({ transform: true }))
	const config = new DocumentBuilder()
		.setTitle('Safe Travel API')
		.setDescription('Safe Travel for frontend')
		.setVersion('1.0')
		.addCookieAuth('accessToken')
		.build()

	app.use(cookieParser())
	app.use(compression())
	const document = SwaggerModule.createDocument(app, config, {
		deepScanRoutes: true,
	})

	app.enableCors({
		origin: '*',
		credentials: true,
	})

	if (env.APP.nodeEnv === 'production') {
		logger.log('Production mode')
		app.use(helmet({}))
	}

	if (env.APP.nodeEnv !== 'production') {
		logger.log('Development mode')
		app.use(
			'/api',
			apiReference({
				showSidebar: true,
				darkMode: true,
				searchHotKey: 's',
				layout: 'modern',
				theme: 'kepler',
				spec: {
					content: document,
				},
			}),
		)
		SwaggerModule.setup('api-legacy-docs', app, document, {
			customSiteTitle: 'Safe Travel API',
			customCss,
		})
		logger.log(`Swagger api at https://localhost:${env.APP.port}/api`)
	}

	app.use(
		swaggerStats.getMiddleware({
			name: 'safe travel stats',
			version: '1.0.0',
			uriPath: '/stats',
			authentication: true,
			apdexThreshold: 30,
			swaggerSpec: document,
			sessionMaxAge: 86400,
			swaggerOnly: true,
			onAuthenticate(req, username: string, password: string) {
				return (
					username === env.SWAGGER_STATS.username &&
					password === env.SWAGGER_STATS.password
				)
			},
		}),
	)

	await app.listen(env.APP.port)
}
bootstrap()
