import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { ProfileUserDto } from './dto/profile-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await new this.userModel(createUserDto).save();
  }

  async findOneById(id: string | ObjectId): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findOne(filter: FilterQuery<User>): Promise<User> {
    return await this.userModel.findOne(filter);
  }

  async update(dto: ProfileUserDto): Promise<User> {
    const updateData: any = {
      gender: dto.gender,
      occupation: dto.occupation,
    };
    const user = await this.userModel.findById(dto._id);
    if (dto.name != user.name) {
      const exist = await this.findOne({ name: dto.name });
      if (exist) {
        throw new BadRequestException('Name Already exist')
      }
      updateData.name = dto.name;
    }

    if (dto.password != null) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(dto.password, saltRounds);;
    }
    await this.userModel.updateOne({ _id: user._id }, { $set: updateData });
    const saved = await this.userModel.findById(user._id);
    return saved;
  }
}
