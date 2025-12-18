import { PartialType } from '@nestjs/swagger';
import { CreateMovieFileDto } from './create-movie_file.dto';

export class UpdateMovieFileDto extends PartialType(CreateMovieFileDto) {}
