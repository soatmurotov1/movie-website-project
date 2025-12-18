import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { Roles } from 'src/common/roles.decorator';

@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  @Post()
  @ApiOperation({summary: "ADMIN, SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "ADMIN, SUPERADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: "ADMIN, SUPERADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({summary: "ADMIN, SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto)
  }

  @Delete(':id')
  @ApiOperation({summary: "SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN")
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id)
  }
}
