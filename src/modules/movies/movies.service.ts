import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieDto: CreateMovieDto) {
    return this.prisma.movies.create({
      data: createMovieDto
    })
  }

  async findAll() {
    return this.prisma.movies.findMany({
      include: {
        categories: true,
        files: true,
        favorites: true,
        reviews: true,
        history: true
      }
    })
  }

  async findOne(id: string) {
    const movie = await this.prisma.movies.findUnique({
      where: { id },
      include: {
        categories: true,
        files: true,
        favorites: true,
        reviews: true,
        history: true
      }
    })
    if (!movie) throw new NotFoundException("movie not found")
    return movie
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.prisma.movies.findUnique({ where: { id } })
    if (!movie) throw new NotFoundException("movie not found")

    return this.prisma.movies.update({
      where: { id },
      data: updateMovieDto
    })
  }

  
    async remove(id: string) {
    const movie = await this.prisma.movies.findUnique({
      where: { id }
    })
    if (!movie) {
      throw new NotFoundException("movie not found")
    }
    await this.prisma.movies.delete({
      where: { id }
    })
    return {
      message: "movie deleted"
    }
  }


}
