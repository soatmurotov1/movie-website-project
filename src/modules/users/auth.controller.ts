import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { VerifyDto } from './dto/verify.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: "register user" })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('verify')
  @ApiOperation({ summary: "verify user" })
  verify(@Body() dto: VerifyDto) {
    return this.authService.verify(dto.email, dto.otp)
  }

  @Post('login')
  @ApiOperation({ summary: "login user" })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  @Get('users')
  @ApiOperation({ summary: "Get all users" })
  getAllUsers() {
    return this.authService.findAllUsers()
  }

  @Get('users/:id')
  @ApiOperation({ summary: "get one user" })
  getUser(@Param('id') id: string) {
    return this.authService.findOneUser(id)
  }

  @Patch('users/:id')
  @ApiOperation({ summary: "update user" })
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.authService.updateUser(id, dto);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: "user delete" })
  deleteUser(@Param('id') id: string) {
    return this.authService.removeUser(id)
  }
}
