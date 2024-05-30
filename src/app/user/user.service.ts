import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { LocationDto } from 'app/tracking/tracking.dto'
import { AuthService } from 'auth/auth.service'
import { Model } from 'mongoose'
import { S3Service } from 's3/s3.service'
import { PaginationResponseType } from 'shared/dto/pagination'
import { User, UserDocument } from 'shared/entities/user.entity'
import { CreateUserDto, GetAllUsersDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Cv } from './types/user.types'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name)
		private userModel: Model<UserDocument>,
		private authService: AuthService,
		private readonly s3Service: S3Service, // Your S3 service for handling URL signing
	) {}

	/**
	 * Create a new user.
	 * @param createUserDto - The user data to create the user.
	 * @returns The created user document.
	 */
	async create(createUserDto: CreateUserDto): Promise<User> {
		try {
			// Validate that either email or phone number is provided
			if (!createUserDto.email && !createUserDto.phone) {
				throw new BadRequestException(
					'Either an email or a phone number must be provided',
				)
			}

			// biome-ignore lint/style/useConst: <explanation>
			let queryConditions = []
			if (createUserDto.email) {
				queryConditions.push({ email: createUserDto.email })
			}
			if (createUserDto.phone) {
				queryConditions.push({ phone: createUserDto.phone })
			}

			// Ensure we have valid conditions before querying
			if (queryConditions.length === 0) {
				throw new BadRequestException('No valid email or phone number provided')
			}

			// Check if a user exists with the same email or phone number
			const existingUser = await this.userModel.findOne({
				$or: queryConditions,
			})

			console.log(existingUser, 'existing user')

			if (existingUser) {
				return existingUser
			}

			// Create a new user if no existing user is found
			const newUser = new this.userModel(createUserDto)
			return newUser.save()
		} catch (error) {
			// Throw an exception if there's a failure in the process
			throw new BadRequestException(`Failed to create user: ${error.message}`)
		}
	}

	/**
	 * Update a user.
	 * @param id - The ID of the user to update.
	 * @param updateUserDto - The data to update the user with.
	 * @returns The updated user document.
	 */
	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.userModel
			.findByIdAndUpdate(id, updateUserDto, { new: true })
			.exec()
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`)
		}
		return user
	}

	/**
	 * Get user by ID.
	 * @param id - The ID of the user to get.
	 * @returns The user document.
	 */
	async getById(id: string): Promise<User> {
		const user = await this.userModel.findById(id).exec()
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`)
		}
		return user
	}

	/**
	 * Set user coordinates.
	 * @param id - The ID of the user to set coordinates for.
	 * @param coordinates - The coordinates to set for the user.
	 */

	async setCoordinates(id: string, coordinates: LocationDto) {
		const user = await this.userModel.findById(id).exec()
		if (!user) {
			throw new NotFoundException(`User with ID ${id} not found`)
		}
		user.coordinates = [coordinates.lat, coordinates.lng]
		await user.save()
		return true
	}

	/**
	 * Search for users by coordinates. This method uses a 2dsphere index to find users within a certain radius.
	 * @param coordinates - The coordinates to search for users around.
	 * @param radius - The radius in meters to search for users around the coordinates.
	 */
	async searchUsersByCoordinates(coordinates: LocationDto, radius: number) {
		return this.userModel
			.find({
				coordinates: {
					$near: {
						$geometry: {
							type: 'Point',
							coordinates: [coordinates.lat, coordinates.lng],
						},
						$maxDistance: radius,
					},
				},
			})
			.exec()
	}
}
