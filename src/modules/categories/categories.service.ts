import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.categories.create({
      data: createCategoryDto
    })
  }

  async findAll() {
    return this.prisma.categories.findMany({
      include: {
        movies: true
      }
    })
  }

  async findOne(id: string) {
    return this.prisma.categories.findUnique({
      where: { id }
    })
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.categories.findUnique({ where: {id}})
    if(!category) {
      throw new NotFoundException("categories not found")
    }
    return this.prisma.categories.update({ 
      where: { id }, 
      data: UpdateCategoryDto 
    })
  }

  async remove(id: string) {
    const category = await this.prisma.categories.findUnique({
      where: { id }
    })
    if (!category) {
      throw new NotFoundException("category not found")
    }
    await this.prisma.categories.delete({
      where: { id }
    })
    return {
      message: "category deleted"
    }
  }
  

}
