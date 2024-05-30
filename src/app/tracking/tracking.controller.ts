import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from 'shared/decorators/auth.decorator'
import { LocationDto } from './tracking.dto'
import { TrackingService } from './tracking.service'

@ApiTags('Tracking')
@Controller('tracking')
export class TrackingController {
	constructor(private readonly trackingService: TrackingService) {}

	@ApiOperation({
		summary: 'Update user location',
		description: 'Update user location with latitude and longitude.',
	})
	@ApiResponse({
		status: 201,
		description: 'Location updated successfully.',
		type: LocationDto,
	})
	@Post('update-location/:id')
	@HttpCode(200)
	@Auth()
	async updateLocation(
		@Param('id') id: string,
		@Body() coordinates: LocationDto,
	) {
		return this.trackingService.updateCoordinates(id, coordinates)
	}

	@ApiOperation({
		summary: 'Send help request',
		description: 'Send a help request to nearby users.',
	})
	@ApiResponse({
		status: 201,
		description: 'Help request sent successfully.',
	})
	@Post('help-request/:id')
	@HttpCode(200)
	@Auth()
	async helpRequest(@Param('id') id: string, @Body() coordinates: LocationDto) {
		return this.trackingService.sendHelpRequest(id, coordinates)
	}

	@ApiOperation({
		summary: 'List all help requests',
		description: 'List all help requests from users.',
	})
	@ApiResponse({
		status: 200,
		description: 'List of help requests.',
	})
	@Get('help-requests/:id')
	@Auth()
	async listHelpRequests(@Param('id') id: string) {
		return this.trackingService.listHelpRequests(id)
	}

	@ApiOperation({
		summary: 'Get help request by id',
		description: 'Get help request by id.',
	})
	@ApiResponse({
		status: 200,
		description: 'Help request details.',
	})
	@Get('help-request/:id')
	@Auth()
	async getHelpRequestById(@Param('id') id: string) {
		return this.trackingService.getHelpRequestById(id)
	}

	@ApiOperation({
		summary: 'Track help request',
		description: 'Track help request',
	})
	@ApiResponse({
		status: 200,
		description: 'Help request location.',
	})
	@Post('track-help-request/:id')
	@Auth()
	async trackHelpRequest(
		@Param('id') id: string,
		@Body() request: { id: string },
	) {
		return this.trackingService.trackHelpRequest(id, request.id)
	}
}
