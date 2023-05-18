import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { User } from '../user.entity';

interface iSignupParams {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface iLoginParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signup(user: iSignupParams) {
    const userExists = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (userExists) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
      createdAt: new Date(),
    });

    this.userRepository.save(newUser);

    const token = await this.generateJWT(user.email);

    const userRes = {
      accessToken: token,
      email: userExists.email,
      username: userExists.username,
    };

    return userRes;
  }

  async login(user: iLoginParams) {
    const userExists = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (!userExists) {
      throw new HttpException('Invalid credentials', 400);
    }

    const hashedPassword = userExists.password;

    const isValidPassword = await bcrypt.compare(user.password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', 400);
    }

    const token = await this.generateJWT(user.email);

    const userRes = {
      accessToken: token,
      email: userExists.email,
      username: userExists.username,
    };

    return userRes;
  }

  private async generateJWT(email: string) {
    return jwt.sign(
      {
        email,
      },
      'hx$tAKBY2EJQM%t2',
      {
        expiresIn: '5h',
      },
    );
  }
}
