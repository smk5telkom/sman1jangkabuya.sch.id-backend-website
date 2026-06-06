import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { PrismaService } from '../prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class AnnouncementsService {
  constructor(private prisma: PrismaService) {}

  async create(createAnnouncementDto: CreateAnnouncementDto, userId: number) {
    let slug = slugify(createAnnouncementDto.title, {
      lower: true,
      strict: true,
    });

    const exist = await this.prisma.announcements.findUnique({
      where: { slug },
    });

    if (exist) {
      const count = await this.prisma.announcements.count({
        where: {
          slug: {
            startsWith: slug,
          },
        },
      });

      slug = `${slug}-${count + 1}`;
    }
    return await this.prisma.announcements.create({
      data: {
        ...createAnnouncementDto,
        slug,
        postById: userId,
      },
    });
  }

  async findAll() {
    // return `This action returns all announcements`;
    return await this.prisma.announcements.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findSlug(slug: string) {
    return await this.prisma.announcements.findFirst({
      where: { slug },
      include: {
        postBy: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} announcement`;
  }

  update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    return `This action updates a #${id} announcement`;
  }

  remove(id: number) {
    return `This action removes a #${id} announcement`;
  }
}
