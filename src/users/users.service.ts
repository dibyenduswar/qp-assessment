import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './../schemas/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}


  async findByUsername(username: string) : Promise<UserEntity> {
    return await this.userModel.findOne({ username: username }).lean();
  }


  async findActiveUser(username: string) : Promise<UserEntity> {
    return await this.userModel
      .findOne({ username: username, isActive: true })
      .lean();
  }
}