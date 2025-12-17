import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({summary: "create movie"})
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto)
  }

  @Get()
  @ApiOperation({summary: "get all movies"})
  findAll() {
    return this.moviesService.findAll()
  }

  @Get(':id')
  @ApiOperation({summary: "get one movie"})
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({summary: "update movie"})
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto)
  }

  @Delete(':id')
  @ApiOperation({summary: "delete movie"})
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id)
  }
}
