import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  @Post()
  @ApiOperation({summary: "ADMIN, SUPERADMIN"})
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "ADMIN, SUPERADMIN, USER"})
  findAll() {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: "ADMIN, SUPERADMIN, USER"})
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({summary: "ADMIN, SUPERADMIN"})
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto)
  }

  @Delete(':id')
  @ApiOperation({summary: "SUPERADMIN"})
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id)
  }
}
