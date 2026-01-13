// src/movie_files/movie_files.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieFileDto } from './dto/create-movie_file.dto';
import { UpdateMovieFileDto } from './dto/update-movie_file.dto';

@Injectable()
export class MovieFilesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMovieFileDto, file: Express.Multer.File) {
        const fileUrl = `${process.env.SERVER_URL || 'http://localhost:3000'}/uploads/movie-files/${file.filename}`;
    return this.prisma.movie_files.create({
      data: {
        movieId: dto.movieId,
        quality: dto.quality,
        language: dto.language,
        file_url: fileUrl,
      },
    });
  }

  findAll() {
    return this.prisma.movie_files.findMany();
  }

  findOne(id: string) {
    return this.prisma.movie_files.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateMovieFileDto) {
    return this.prisma.movie_files.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const file = await this.prisma.movie_files.findUnique({ where: { id } });

    if (!file) {
      throw new NotFoundException('movie_files not found');
    }

    await this.prisma.movie_files.delete({ where: { id } });
    return { message: 'movie_files deleted' };
  }
}
