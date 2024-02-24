import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './../auth/auth.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './../schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

const jwtConstants = {
    secret: 'justAJWTSecret--do-change-on-production',
    tokenExpiresIn: '1600s',
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.tokenExpiresIn },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}