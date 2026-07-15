import { IsString, IsEnum, IsDateString, IsInt, IsOptional } from 'class-validator';
import { Gender } from '../../generated/prisma/enums';

export class CreateAlumniDto {
  @IsString()
  nis: string;

  @IsString()
  namaLengkap: string;

  @IsEnum(Gender)
  jenisKelamin: Gender;

  @IsDateString()
  tanggalLahir: string;

  @IsInt()
  tahunLulus: number;

  @IsOptional()
  @IsString()
  riwayatPendidikanPekerjaan?: string;

  @IsString()
  alamat: string;

  @IsString()
  email: string;

  @IsString()
  noHp: string;
}
