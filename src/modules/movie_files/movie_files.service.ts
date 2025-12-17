import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieFileDto } from './dto/create-movie_file.dto';
import { UpdateMovieFileDto } from './dto/update-movie_file.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieFilesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMovieFileDto: CreateMovieFileDto) {
    return this.prisma.movie_files.create({
      data: createMovieFileDto
    })
  }

  findAll() {
    return this.prisma.movie_files.findMany({})
  }

  findOne(id: string) {
    return this.prisma.movie_files.findUnique({ where: { id }})
  }

  update(id: string, updateMovieFileDto: UpdateMovieFileDto) {
    return this.prisma.movie_files.update({
      where: { id }, 
      data: updateMovieFileDto
    })
  }


  async remove(id: string) {
    const movie_files = await this.prisma.movie_files.findUnique({
      where: { id }
    })
    if (!movie_files) {
      throw new NotFoundException("movie_files not found")
    }
    await this.prisma.movies.delete({
      where: { id }
    })
    return {
      message: "movie_files deleted"
    }
  }
}
