  import { IsString, MinLength, IsEnum } from 'class-validator';
  import { Level, Type } from '../../generated/prisma/enums';

  export class CreateAchievementDto {
    @IsString()
    title: string;

    @IsString()
    subtitle: string;

    @IsString()
    description: string;

    @IsEnum(Level)
    level: Level;
  }
