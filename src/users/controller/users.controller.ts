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
import { UsersDto } from '../dto/users.dto';
import { UsersService } from '../service/users.service';
import { Users } from '../schema/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<Users[]> {
    const users = await this.usersService.findAll();
    if (!users || users.length === 0) {
      throw new NotFoundException('No user found');
    }
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Users> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  @Post()
  async create(@Body() usersDto: UsersDto): Promise<Users> {
    const createdUser = new this.usersService.userModel(usersDto);
    if (!createdUser) {
      throw new NotFoundException('add user fail');
    }
    return createdUser.save();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() usersDto: UsersDto,
  ): Promise<Users> {
    const updatedUser = await this.usersService.update(id, usersDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(id);
    return;
  }
}
