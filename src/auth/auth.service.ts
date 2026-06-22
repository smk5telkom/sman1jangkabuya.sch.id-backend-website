import { Injectable, ConflictException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import type { Response } from 'express';
import {Users} from 'src/generated/prisma/client'
import { access } from 'fs';

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

    if (existUsername) {
      throw new ConflictException('Username Already Exist');
    }

    if (existEmail) {
      throw new ConflictException('Email Already Exist');
    }

    return this.usersService.create(dto);
  }

  getRefreshToken(user: Users) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return {
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    };
  }

  getAccessToken(user: Users) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(userId, { refreshToken: hashedRefreshToken });
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User Not Found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    const accessToken = this.getAccessToken(user);
    const refreshToken = this.getRefreshToken(user);

    await this.updateRefreshToken(user.id, refreshToken.refresh_token)

    return {
      access_token: accessToken.access_token,
      refresh_token: refreshToken.refresh_token,
    };
  }

  async refreshTokens(refreshToken: string) {
    let payload: any;

    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (err) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const user = await this.usersService.findOne(payload.sub);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isValid) {
      throw new ForbiddenException('Invalid refresh token');
    }

    const accessToken = this.getAccessToken(user);
    const newRefreshToken = this.getRefreshToken(user);

    await this.updateRefreshToken(user.id, newRefreshToken.refresh_token);

    return {
      access_token: accessToken.access_token,
      refresh_token: newRefreshToken.refresh_token,
    };
  }

  /*async refreshTokens(refreshToken: string) {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET
    })

    const user = await this.usersService.findOne(payload.id);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Invalid resfresh token');
    }

    const newAccessToken = this.getAccessToken(user);
    const newRefreshToken = this.getRefreshToken(user);

    await this.updateRefreshToken(payload.sub, newRefreshToken.refresh_token);

    return {
      access_token: newAccessToken.access_token,
      refresh_token: newRefreshToken.refresh_token
    }
  }*/
}
