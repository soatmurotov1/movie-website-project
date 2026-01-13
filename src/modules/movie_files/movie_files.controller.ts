import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MovieFilesService } from './movie_files.service';
import { CreateMovieFileDto } from './dto/create-movie_file.dto';
import { UpdateMovieFileDto } from './dto/update-movie_file.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from 'src/common/auth.guard';
import { RolesGuard } from 'src/common/role.guard';
import { Roles } from 'src/common/roles.decorator';

const storage = diskStorage({
  destination: './uploads/movie-files',
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + '-' + Math.round(Math.random() * 1e9) + extname(file.originalname);
    cb(null, uniqueName)
  },
});

@ApiBearerAuth()
@Controller('movie-files')
export class MovieFilesController {
  constructor(private readonly movieFilesService: MovieFilesService) {}

  @Post()
  @ApiOperation({ summary: "ADMIN, SUPERADMIN" })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        movieId: { type: 'string' },
        quality: { type: 'string', enum: ['p360', 'p480', 'p720', 'p1080'] },
        language: { type: 'string' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { storage }))
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN", "ADMIN")
  create(
    @Body() dto: CreateMovieFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.movieFilesService.create(dto, file);
  }

  @Get()
  @Roles("ADMIN", "SUPERADMIN", "USER")
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.movieFilesService.findAll();
  }

  @Get(':id')
  @Roles("ADMIN", "SUPERADMIN", "USER")
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Param('id') id: string) {
    return this.movieFilesService.findOne(id);
  }

  @Patch(':id')
  @Roles("ADMIN", "SUPERADMIN")
  @UseGuards(AuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMovieFileDto,
  ) {
    return this.movieFilesService.update(id, dto);
  }

  @Delete(':id')
  @Roles("SUPERADMIN")
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.movieFilesService.remove(id);
  }
}
