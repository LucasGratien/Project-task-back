import { Injectable, NotFoundException } from "@nestjs/common";
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
  async remove(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
  async update(id: string, updateData: Partial<Users>): Promise<Users | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .exec();
  }

  async findOne(id: string): Promise<Users | null> {
    return this.userModel.findById(id).exec();
  }
}
