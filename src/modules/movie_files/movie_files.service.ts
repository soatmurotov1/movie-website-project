import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { unlink } from "fs/promises";
import { join } from "path";
import { CreateMovieFileDto } from "./dto/create-movie_file.dto";

@Injectable()
export class MovieFilesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateMovieFileDto, fileName: string) {
    return this.prisma.movie_files.create({
      data: {
        movieId: dto.movieId,
        quality: dto.quality,
        language: dto.language,
        file_url: `http://localhost:3000/uploads/movies/${fileName}`,
      }
    })
  }

  findAll() {
    return this.prisma.movie_files.findMany()
  }

  async findOne(id: string) {
    const file = await this.prisma.movie_files.findUnique({ where: { id } })
    if (!file) throw new NotFoundException("File topilmadi")
    return file
  }

  async remove(id: string) {
  const file = await this.findOne(id)
  const fileName = file.file_url.split('/').pop()
  if (!fileName) {
    throw new Error("Fayl nomi topilmadi")
  }
  const filePath = join(process.cwd(), 'uploads', 'movies', fileName)
  try {
    await unlink(filePath)
  } catch (err) {
    console.warn(`Fayl o'chirilmadi: ${filePath}`, err)
  }
  return this.prisma.movie_files.delete({ where: { id } })
}

}
