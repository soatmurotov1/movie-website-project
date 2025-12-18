import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { Roles } from 'src/common/roles.decorator';

@ApiBearerAuth()
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({summary: "ADMIN, SUPERADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  create(@Body() dto: CreateFavoriteDto) {
    return this.favoritesService.create(dto)
  }

  @Get()
  @ApiOperation({summary: "ADMIN, SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  findAll() {
    return this.favoritesService.findAll()
  }

  @Get('/:userId')
  @ApiOperation({summary: "ADMIN, SUPERADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  findByUser(@Param('userId') userId: string) {
    return this.favoritesService.findByUser(userId)
  }

  @Delete(':userId/:movieId')
  @ApiOperation({ summary: "ADMIN, SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  remove(
    @Param('userId') userId: string,
    @Param('movieId') movieId: string
  ) {
    return this.favoritesService.remove(userId, movieId)
  }
}
