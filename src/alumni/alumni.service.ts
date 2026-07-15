import { Injectable } from '@nestjs/common';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { UpdateAlumniDto } from './dto/update-alumni.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlumniService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAlumniDto, foto?: string) {
    return await this.prisma.alumni.create({
      data: {
        ...dto,
        tanggalLahir: new Date(dto.tanggalLahir),
        foto,
      },
    });
  }

  async findAll() {
    return await this.prisma.alumni.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.alumni.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateAlumniDto, foto?: string) {
    const data: any = { ...dto };

    if (dto.tanggalLahir) {
      data.tanggalLahir = new Date(dto.tanggalLahir);
    }

    if (foto) {
      data.foto = foto;
    }

    return await this.prisma.alumni.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.alumni.delete({
      where: { id },
    });
  }
}
