import { Injectable } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AchievementService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAchievementDto, imageUrl: string) {
    return await this.prisma.achievement.create({
      data:
      {
        ...dto,
        imageUrl
      }
    });
  }

  async findAll() {
    return await this.prisma.achievement.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} achievement`;
  }

  async update(id: number, dto: UpdateAchievementDto, imageUrl?: string) {
    const data: any = {
      ...dto
    }

    if (imageUrl) {
      data.imageUrl = imageUrl;
    }

    return await this.prisma.achievement.update({
      where: {
        id,
      },
      data
    });
  }

  async remove(id: number) {
    return this.prisma.achievement.delete({
      where: {
        id,
      },
    });
  }
}
