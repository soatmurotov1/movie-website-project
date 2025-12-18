import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { Roles } from 'src/common/roles.decorator';

@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({summary: "SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN")
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto)
  }

  @Get()
  @ApiOperation({summary: "SUPERADMIN, ADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN", "ADMIN", "USER")
  findAll() {
    return this.moviesService.findAll()
  }

  @Get(':id')
  @ApiOperation({summary: "SUPERADMIN, ADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN", "ADMIN", "USER")
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({summary: "SUPERADMIN, ADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN", "ADMIN")
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto)
  }

  @Delete(':id')
  @ApiOperation({summary: "SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN")
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id)
  }
}
