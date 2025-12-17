import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieCategoryDto } from './dto/create-movie_category.dto';
import { UpdateMovieCategoryDto } from './dto/update-movie_category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovieCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  
  create(createMovieCategoryDto: CreateMovieCategoryDto) {
    return this.prisma.movie_categories.create({data: createMovieCategoryDto})
  }

  findAll() {
    return this.prisma.movie_categories.findMany({
      include: {
        movie: true,
        category: true
      }
    })
  }

  findOne(id: string) {
    return this.prisma.movie_categories.findUnique({
      where: {id}
    })
  }

  update(id: string, updateMovieCategoryDto: UpdateMovieCategoryDto) {
    const movie_cat = this.prisma.movie_categories.findFirst({where: {id}})
    if(!movie_cat) {
      throw new NotFoundException("not found movie_categories")
    }
    return this.prisma.movie_categories.update({
      where: {id},
      data: updateMovieCategoryDto
    })
  }
  
  
  async remove(id: string) {
    const movie_cat = await this.prisma.movie_categories.findUnique({
      where: { id }
    })
    if (!movie_cat) {
      throw new NotFoundException("movie_categories not found")
    }
    await this.prisma.movies.delete({
      where: { id }
    })
    return {
      message: "movie_categories deleted"
    }
  }
}



