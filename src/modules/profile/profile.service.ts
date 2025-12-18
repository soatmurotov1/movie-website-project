import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto) {
    return this.prisma.profile.create({
      data: createProfileDto
    })

  }
  async findAll() {
    return this.prisma.profile.findMany()
  }

  async findOne(id: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id }
    })

    if (!profile) throw new NotFoundException("profile not found")
    return profile
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.prisma.profile.findUnique({ where: { id } })
    if (!profile) throw new NotFoundException("profile not found")

    return this.prisma.profile.update({
      where: { id },
      data: updateProfileDto
    })
  }
  
  async remove(id: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id }
    })
    if (!profile) {
      throw new NotFoundException("profile not found")
    }
    await this.prisma.profile.delete({
      where: { id }
    })
    return {
      message: "profile deleted"
    }
  }
}
