import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MovieFilesService } from './movie_files.service';
import { CreateMovieFileDto } from './dto/create-movie_file.dto';
import { UpdateMovieFileDto } from './dto/update-movie_file.dto';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { Roles } from 'src/common/roles.decorator';

@Controller('movie-files')
export class MovieFilesController {
  constructor(private readonly movieFilesService: MovieFilesService) {}

  @Post()
  @ApiOperation({summary: "ADMIN, SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN", "ADMIN")
  create(@Body() createMovieFileDto: CreateMovieFileDto) {
    return this.movieFilesService.create(createMovieFileDto);
  }

  @Get()
  @ApiOperation({summary: "ADMIN, SUPERADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  findAll() {
    return this.movieFilesService.findAll()
  }

  @Get(':id')
  @ApiOperation({summary: "SUPERADMIN, ADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN", "ADMIN", "USER")
  findOne(@Param('id') id: string) {
    return this.movieFilesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({summary: "SUPERADMIN, ADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN", "ADMIN")
  update(@Param('id') id: string, @Body() updateMovieFileDto: UpdateMovieFileDto) {
    return this.movieFilesService.update(id, updateMovieFileDto)
  }

  @Delete(':id')
  @ApiOperation({summary: "SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN")
  remove(@Param('id') id: string) {
    return this.movieFilesService.remove(id)
  }
}
