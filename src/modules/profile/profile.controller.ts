import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({summary: "create profile"})
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto)
  }

  
  @Get(':id')
  @ApiOperation({ summary: "get one profile"})
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({summary: "update profile"})
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto)
  }

  @Delete(':id')
  @ApiOperation({summary: "delete profile"})
  remove(@Param('id') id: string) {
    return this.profileService.remove(id)
  }
}
