import { IsString, MinLength, IsEnum } from 'class-validator';
import { Type } from '../../generated/prisma/enums';

export class CreateAnnouncementDto {
  @IsString()
  title: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsEnum(Type)
  type: Type;

  @IsString()
  typeContent: string;
}
