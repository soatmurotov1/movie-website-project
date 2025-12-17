import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MovieCategoriesService } from './movie_categories.service';
import { CreateMovieCategoryDto } from './dto/create-movie_category.dto';
import { UpdateMovieCategoryDto } from './dto/update-movie_category.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';

@Controller('movie-categories')
export class MovieCategoriesController {
  constructor(private readonly movieCategoriesService: MovieCategoriesService) {}

  @Post()
  @ApiOperation({summary: "SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  
  create(@Body() createMovieCategoryDto: CreateMovieCategoryDto) {
    return this.movieCategoriesService.create(createMovieCategoryDto)
  }

  @Get()
  @ApiOperation({summary: "ADMIN, SUPERADMIN, USER"})
  findAll() {
    return this.movieCategoriesService.findAll()
  }

  @Get(':id')
  @ApiOperation({summary: "SUPERADMIN, ADMIN, USER"})
  findOne(@Param('id') id: string) {
    return this.movieCategoriesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({summary: "ADMIN, SUPERADMIN"})
  update(@Param('id') id: string, @Body() updateMovieCategoryDto: UpdateMovieCategoryDto) {
    return this.movieCategoriesService.update(id, updateMovieCategoryDto)
  }

  @Delete(':id')
  @ApiOperation({summary: "SUPERADMIN"})
  remove(@Param('id') id: string) {
    return this.movieCategoriesService.remove(id)
  }
}
