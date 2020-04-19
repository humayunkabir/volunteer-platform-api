import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserInterface } from './user.interface';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  signUp(signupDto: SignUpDto): Promise<UserInterface> {
    return this.getServableUser(this.userRepository.signUp(signupDto));
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<UserInterface> {
    const user = await this.getServableUser(
      this.userRepository.signIn(authCredentialsDto),
    );

    const payload: Payload = { email: user.email, phone: user.phone };
    user.accessToken = this.jwtService.sign(payload);

    return user;
  }

  async token(authorization: string) {
    if (!authorization) {
      throw new UnauthorizedException();
    }

    const accessToken = authorization.split(' ')[1];
    const { email, phone } = this.jwtService.verify(accessToken);

    const user = await this.getServableUser(
      this.userRepository.getUser({ email, phone }),
    );

    user.accessToken = accessToken;

    return user;
  }

  async getServableUser(user: Promise<User>): Promise<UserInterface> {
    const { id, firstName, lastName, email, phone, location } = await user;
    return { id, firstName, lastName, email, phone, location, accessToken: '' };
  }
}
