import { Controller, Post, Body, UploadedFile, UseInterceptors, Get, Param, Delete, UseGuards } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { multerConfig } from "src/common/multer.config";
import { MovieFilesService } from "./movie_files.service";
import { CreateMovieFileDto } from "./dto/create-movie_file.dto";
import { AuthGuard } from "src/common/auth.guard";
import { RolesGuard } from "src/common/role.guard";
import { Roles } from "src/common/roles.decorator";

@ApiBearerAuth()
@Controller("movie-files")
export class MovieFilesController {
  constructor(private service: MovieFilesService) {}


  @Post()
  @ApiOperation({summary: "ADMIN, SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file", multerConfig))
  create(
    @Body() dto: CreateMovieFileDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.service.create(dto, file.filename)
  }

  @Get()
  @ApiOperation({summary: "ADMIN, SUPERADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  findAll() {
    return this.service.findAll()
  }

  @Get(":id")
  @ApiOperation({summary: "ADMIN, SUPERADMIN, USER"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPERADMIN", "USER")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id)
  }


  @Delete(":id")
  @ApiOperation({summary: "SUPERADMIN"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("SUPERADMIN")
  remove(@Param("id") id: string) {
    return this.service.remove(id)
  }
}
