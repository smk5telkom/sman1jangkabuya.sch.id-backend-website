import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import type { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async register(dto: CreateUserDto) {
    const existUsername = await this.usersService.findByUsername(dto.username);
    const existEmail = await this.usersService.findByEmail(dto.email);

    if (existUsername && existEmail) {
      throw new ConflictException('User Already Exist');
    }
    if (existUsername) {
      throw new ConflictException('Username Already Exist');
    }
    if (existEmail) {
      throw new ConflictException('Email Already Exist');
    }

    return this.usersService.create(dto);
  }

  async login(email: string, password: string, res: Response) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Wrong Password');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    const refreshToken = await this.jwtService.signAsync(payload);

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.prisma.users.update({
      where: { id: user.id },
      data: { refreshToken: hashedRefreshToken },
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return {
      accessToken,
    };
  }
}
