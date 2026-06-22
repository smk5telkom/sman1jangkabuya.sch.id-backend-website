import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AchievementService } from './achievement.service';
import type { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Public } from '../public.decorator';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/achievements',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new Error('File harus gambar'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  create(
    @Body() createAchievementDto: CreateAchievementDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = `/uploads/achievements/${file.filename}`;
    return this.achievementService.create(createAchievementDto, imageUrl);
  }

  @Public()
  @Get()
  findAll() {
    return this.achievementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.achievementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAchievementDto: UpdateAchievementDto) {
    return this.achievementService.update(+id, updateAchievementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.achievementService.remove(+id);
  }
}
