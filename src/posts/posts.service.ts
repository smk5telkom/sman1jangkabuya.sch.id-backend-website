import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  async create(
    createPostDto: CreatePostDto,
    userId: number,
    imageUrl?: string | null,
  ) {
    let slug = slugify(createPostDto.title, {
      lower: true,
      strict: true,
    });

    const exist = await this.prisma.posts.findUnique({
      where: { slug },
    });

    if (exist) {
      const count = await this.prisma.posts.count({
        where: {
          slug: {
            startsWith: slug,
          },
        },
      });

      slug = `${slug}-${count + 1}`;
    }
    // return 'This action adds a new post';
    const newPost = await this.prisma.posts.create({
      data: {
        ...createPostDto,
        slug,
        imageUrl,
        postById: userId,
      },
    });

    return newPost;
  }

  async findAll() {
    // return `This action returns all posts`;
    return await this.prisma.posts.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findOne(id: number) {
    // return `This action returns a #${id} post`;
    return await this.prisma.posts.findUnique({
      where: { id },
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

  async findSlug(slug: string) {
    return await this.prisma.posts.findFirst({
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

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
