# Nest JS

@Body(): This NestJS decorator extracts the body of the HTTP request (JSON data sent by the client) and passes it into the method.

## DTO

DTO stands for Data Transfer Object.
Contains classes that define the structure of incoming and outgoing data.

Used for:

Validation (class-validator)

Type safety

Input filtering

## Entities

entities/
Contains ORM entity classes that represent your database tables/models.

These are used by tools like TypeORM or Prisma to map data.

Example: User, Admin, Role entities.

## Enum

enums/
Stores enumeration types, e.g. fixed sets of constants.

## Services

services/
Contains business logic.

Services interact with:

Repositories (DB)

Other services

Utils

Example: AdminUsersService handles user CRUD operations.

## Swagger UI

```js
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';


@ApiTags('Admin Users') // Swagger group name
@Controller('admin/users')
export class UsersController {
  constructor(
    private readonly usersService: AdminUsersService,
    private readonly usersDeleteService: UsersDeleteService,
  ) {}

  @Post('enroll')
  @ApiOperation({ summary: 'Enroll a new user', description: 'Creates and enrolls a new user into the system.' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Validation failed or bad input.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'List users', description: 'Returns a paginated list of users with optional filters.' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  // Add more @ApiQuery if your FilterUsersDto has more fields like search, role, status, etc.
  @ApiResponse({ status: 200, description: 'List of users with pagination metadata.' })
  async findAll(@Query() filter: FilterUsersDto) {
    const [users, total] = await this.usersService.findAll(filter);
    const page = filter.page;
    const limit = filter.limit;

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID', description: 'Fetches a single user by their ID. Admin only.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'User found and returned.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Roles(userRoleType.ADMIN)
  async getUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findUserById(id);
    return plainToInstance(UserResponseDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID', description: 'Deletes a single user by their ID.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: number) {
    return await this.usersDeleteService.deleteUserOrMany(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete multiple users', description: 'Deletes multiple users by a list of user IDs.' })
  @ApiBody({ type: DeleteUsersDto })
  @ApiResponse({ status: 200, description: 'Users deleted successfully.' })
  @HttpCode(HttpStatus.OK)
  async deleteMultipleUsers(@Body() deleteUsersDto: DeleteUsersDto) {
    return await this.usersDeleteService.deleteUserOrMany(
      deleteUsersDto.user_ids,
    );
  }

  @Patch('status')
  @ApiOperation({ summary: 'Update status for multiple users', description: 'Activate or deactivate multiple users by ID.' })
  @ApiBody({ type: UpdateUserStatusDto })
  @ApiResponse({ status: 200, description: 'User statuses updated.' })
  async updateBulkUserStatus(@Body() dto: UpdateUserStatusDto): Promise<any> {
    return this.usersService.updateStatus(dto.user_ids, dto.is_active);
  }
}
```

`import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';`

for DPO for form updates
