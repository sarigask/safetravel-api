// src/location/dto/update-location.dto.ts

import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator'

export class LocationDto {
	@IsNotEmpty()
	@IsNumber()
	@Min(-90)
	@Max(90)
	lat: number

	@IsNotEmpty()
	@IsNumber()
	@Min(-180)
	@Max(180)
	lng: number
}
