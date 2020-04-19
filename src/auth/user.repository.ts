import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { UnauthorizedException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Payload } from './payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signUpDto: SignUpDto): Promise<User> {
    console.log(signUpDto);

    const { firstName, lastName, email, phone, location, password } = signUpDto;

    const user = new User();
    user.id = uuid();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.location = location;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      return await user.save();
    } catch (error) {
      // Separate error.code file
      // duplicate error code

      if (error.code === 23505) {
        throw new ConflictException();
      } else if (error.code === 11000) {
        if (error.errmsg.includes('email:')) {
          throw new ConflictException('Email already exists!');
        } else if (error.errmsg.includes('username:')) {
          throw new ConflictException('Username already exists!');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const user = await this.validateUserPassword(authCredentialsDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return user;
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { email, phone, password } = authCredentialsDto;
    const user = await this.getUser({ email, phone });
    if (user && (await user.validatePassowrd(password))) {
      return user;
    } else {
      return null;
    }
  }

  async getUser(payload: Payload): Promise<User> {
    const { email, phone } = payload;
    let user: User;
    if (email) user = await this.findOne({ email });
    if (phone) user = await this.findOne({ phone });
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
