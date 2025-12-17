import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieCategoriesService } from './movie_categories.service';
import { CreateMovieCategoryDto } from './dto/create-movie_category.dto';
import { UpdateMovieCategoryDto } from './dto/update-movie_category.dto';

@Controller('movie-categories')
export class MovieCategoriesController {
  constructor(private readonly movieCategoriesService: MovieCategoriesService) {}

  @Post()
  create(@Body() createMovieCategoryDto: CreateMovieCategoryDto) {
    return this.movieCategoriesService.create(createMovieCategoryDto)
  }

  @Get()
  findAll() {
    return this.movieCategoriesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieCategoriesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieCategoryDto: UpdateMovieCategoryDto) {
    return this.movieCategoriesService.update(id, updateMovieCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieCategoriesService.remove(id)
  }
}
