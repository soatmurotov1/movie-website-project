import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFavoriteDto) {
    try {
      return await this.prisma.favorites.create({
        data: {
          userId: dto.userId,
          movieId: dto.movieId
        }
      })
    } catch (error) {
      throw new BadRequestException("Bu film allaqachon favorite qilingan")
    }
  }

  async findAll() {
    return this.prisma.favorites.findMany({
      include: {
        movie: true,
        user: true
      }
    })
  }

  async findByUser(userId: string) {
    return this.prisma.favorites.findMany({
      where: { userId },
      include: {
        movie: true
      }
    })
  }


  async remove(userId: string, movieId: string) {
    return this.prisma.favorites.delete({
      where: {
        userId_movieId: {
          userId,
          movieId
        }
      }
    })
  }
}
