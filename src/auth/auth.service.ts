import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userModel
      .findOne({ email: email, isActive: true })
      .lean();

    if (!user) {
        throw new Error("User not registered!");        
    }

    if(user.password != password) {
        throw new Error("Invalid credentials!");
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return false;

    delete user.password;

    return { 
      access_token: await this.jwtService.signAsync(user),
    };
  }
}