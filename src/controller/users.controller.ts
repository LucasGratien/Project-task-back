import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersDto } from '../users/dto/users.dto';
import { UsersService } from '../users/service/users.service';
import { Users } from '../users/schema/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<Users[]> {
    try {
      const users = await this.usersService.findAll();
      if (!users || users.length === 0) {
        throw new NotFoundException('No user found');
      }
      return users;
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error('Error :', error.message);
        throw error;
      } else {
        console.error('Unexpected error :', error.message || error);
        throw new Error('Unable to retrieve users at the moment.');
      }
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Users> {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error('Error :', error.message);
        throw error;
      } else {
        console.error('Unexpected error :', error.message || error);
        throw new Error(
          `Unable to retrieve users with ID ${id} at the moment.`,
        );
      }
    }
  }
  @Post()
  async create(@Body() usersDto: UsersDto): Promise<Users> {
    try {
      const createdUser = new this.usersService.userModel(usersDto);
      return createdUser.save();
    }}

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() usersDto: UsersDto,
  ): Promise<Users> {
    return this.usersService.update(id, usersDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
