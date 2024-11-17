import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../schema/users.schema';
import { Model } from 'mongoose';
import { UsersDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) public userModel: Model<Users>) {}

  async create(UsersDto: UsersDto): Promise<Users> {
    const createdUser = new this.userModel(UsersDto);
    return createdUser.save();
  }
  async findAll(): Promise<Users[]> {
    return this.userModel.find().exec();
  }
  async update(): Promise<Users> {
    return this.userModel.updateOne();
  }
  async findOne(id: string): Promise<Users | null> {
    return this.userModel.findById(id).exec();
  }
}
