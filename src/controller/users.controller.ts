import {
  Body,
  Controller,
  Delete,
  Get,
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
  findAll(): string {
    return 'users';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() usersDto: UsersDto): Promise<Users> {
    const createdUser = new this.usersService.userModel(usersDto);
    return createdUser.save();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() usersDto: UsersDto,
  ): Promise<Users> {
    return this.usersService.update();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
