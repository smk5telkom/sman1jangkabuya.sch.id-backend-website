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

  async update(id: number, dto: UpdateAnnouncementDto) {
    const data: any = {
      ...dto,
    }

    if (dto.title) {
      let slug = slugify(dto.title, {
        lower: true,
        strict: true,
      })

      const exist = await this.prisma.announcements.findFirst({
        where: {
          slug,
          NOT: {
            id
          },
        },
      });

      if (exist) {
        const count = await this.prisma.announcements.count({
          where: {
            slug: {
              startsWith: slug,
            },
            NOT: {
              id,
            },
          },
        });

        slug = `${slug}-${count + 1}`
      }

      data.slug = slug
    }

    return await this.prisma.announcements.update({
      where: { id },
      data
    })
  }

  remove(id: number) {
    return this.prisma.announcements.delete({
      where: {
        id,
      },
    });
  }
}
