import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiHeader,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { Auth } from 'shared/decorators/auth.decorator'
import { CreateUserDto, GetAllUsersDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({
		summary: 'Create a new user',
		description: 'Checks for existing user and creates user',
	})
	@ApiResponse({
		status: 201,
		description: 'The user has been successfully created.',
		type: CreateUserDto,
	})
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto)
	}

	@ApiOperation({ summary: 'Update user' })
	@ApiResponse({
		status: 200,
		description: 'User updated successfully.',
		type: UpdateUserDto,
	})
	@ApiResponse({ status: 404, description: 'User not found.' })
	@Patch(':id')
	@Auth()
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto)
	}
}
