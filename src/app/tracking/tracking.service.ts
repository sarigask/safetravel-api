import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserService } from 'app/user/user.service'
import mongoose, { Model, Types } from 'mongoose'
import {
	HelpRequest,
	HelpRequestDocument,
} from 'shared/entities/help-request.entity'
import { LocationDto } from './tracking.dto'

interface User {
	_id: mongoose.Types.ObjectId
	// other properties of the user
}

@Injectable()
export class TrackingService {
	constructor(
		private readonly userService: UserService,
		@InjectModel(HelpRequest.name)
		private helpRequestModel: Model<HelpRequestDocument>,
	) {}

	async getHelpRequestById(id: string) {
		const helpRequest = (await this.helpRequestModel
			.findOne({ _id: id })
			.populate('user')
			.exec()) as HelpRequest

		// calculate distance between two coordinates
		// const distance = this.haversineDistance(
		// 	{
		// 		lat: helpRequest.coordinates[0],
		// 		lng: helpRequest.coordinates[1],
		// 	},
		// 	{
		// 		lat: user.coordinates[0],
		// 		lng: user.coordinates[1],
		// 	},
	}

	async listHelpRequests(id: string) {
		const user = await this.userService.getById(id)
		const requests = await this.helpRequestModel.find({
			coordinates: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: user.coordinates,
					},
					$maxDistance: 5000000,
				},
			},
		})
		console.log('🚀 ~ TrackingService ~ listHelpRequests ~ requests:', requests)

		return requests.map(r => ({
			_id: r._id,
			user: r.user,
			distance: this.haversineDistance(
				{
					lat: r.coordinates[0] as number,
					lng: r.coordinates[1] as number,
				},
				{
					lat: user.coordinates[0] as number,
					lng: user.coordinates[1] as number,
				},
			),
		}))
	}

	async sendHelpRequest(id: string, loc: LocationDto) {
		const user = await this.userService.getById(id)
		const availableUsers = await this.userService.searchUsersByCoordinates(
			loc,
			5000,
		)
		const filterUsers = availableUsers.filter(
			u => (u._id as string).toString() !== id,
		)
		await new this.helpRequestModel({
			user: user,
			availableUsers: filterUsers,
			coordinates: [loc.lat, loc.lng],
		}).save()
		return true
	}

	async updateCoordinates(id: string, loc: LocationDto) {
		return await this.userService.setCoordinates(id, loc)
	}

	async trackHelpRequest(id: string, requestId: string) {
		const helpRequest = await this.helpRequestModel.findOne({
			_id: new Types.ObjectId(requestId),
		})
		if (!helpRequest) {
			return false
		}
		if (helpRequest.trackedUsers.includes(id as unknown as Types.ObjectId)) {
			return false
		}
		helpRequest.trackedUsers.push(id as unknown as Types.ObjectId)
		await helpRequest.save()
		return {
			lat: helpRequest.coordinates[0] as number,
			lng: helpRequest.coordinates[1] as number,
		}
	}

	haversineDistance(coords1: LocationDto, coords2: LocationDto) {
		const r = 6371000 // Earth's radius in meters
		const lat1 = (coords1.lat * Math.PI) / 180 // Convert degrees to radians
		const lat2 = (coords2.lat * Math.PI) / 180
		const deltaLat = ((coords2.lat - coords1.lat) * Math.PI) / 180
		const deltaLon = ((coords2.lng - coords1.lng) * Math.PI) / 180

		const a =
			Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
			Math.cos(lat1) *
				Math.cos(lat2) *
				Math.sin(deltaLon / 2) *
				Math.sin(deltaLon / 2)
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

		const distance = r * c // Distance in meters
		return distance
	}
}
