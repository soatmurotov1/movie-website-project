import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/common/redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { NesMailerService } from 'src/common/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
    private mailer: NesMailerService,
    private jwt: JwtService,
  ) {}

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  async register(dto: RegisterDto) {
    const user = await this.prisma.users.findFirst({
      where: { OR: [{ email: dto.email }, { username: dto.username }] }
    })

    if (user) {
      if (!user.verified) {
        const otp = this.generateOtp()
        await this.redis.set(`otp:${user.email}`, otp, 900)
        await this.mailer.sendOtpEmail(user.email, otp)
        return { message: "Bu user ooldin ruyxatdan o'tgan lekin tasdiqlanmagan. OTP qayta yuborildi" }
      } else {
        throw new BadRequestException("bu user oldin ruyxatdan utgan")
      }
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10)
    await this.prisma.users.create({
      data: { ...dto, password: hashedPassword }
    })

    const otp = this.generateOtp();
    await this.redis.set(`otp:${dto.email}`, otp, 900)
    await this.mailer.sendOtpEmail(dto.email, otp)

    return { message: "OTP yuborildi" }
  }

  async verify(email: string, otp: string) {
    const savedOtp = await this.redis.get(`otp:${email}`)
    if (!savedOtp || savedOtp !== otp) {
      throw new BadRequestException("OTP xato")
    }
    await this.prisma.users.update({ where: { email }, data: { verified: true } })
    await this.redis.del(`otp:${email}`)

    return { message: "Account tasdiqlandi" }
  }


  async login(username: string, password: string) {
    const user = await this.prisma.users.findUnique({ where: { username } })
    if (!user) throw new UnauthorizedException("username yoki parol xato")

    if (!user.verified) {
      const otp = this.generateOtp();
      await this.redis.set(`otp:${user.email}`, otp, 900)
      await this.mailer.sendOtpEmail(user.email, otp)
      throw new UnauthorizedException("OTP qayta yuborildi.")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new UnauthorizedException("username yoki password xato")

    const token = this.jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role })
    return { token: token, user: user }
  }


  async requestPasswordReset(email: string) {
    const user = await this.prisma.users.findUnique({ where: { email } })
    if (!user) throw new NotFoundException("user not found")

    const otp = this.generateOtp()
    await this.redis.set(`reset:${email}`, otp, 900)
    await this.mailer.sendOtpEmail(email, otp)
    return { message: "Yangi parol emailga yuborildi" }
  }

  async findAllUsers() {
    return this.prisma.users.findMany()
  }

  async findOneUser(id: string) {
    const user = await this.prisma.users.findUnique({ where: { id } })
    if (!user) throw new NotFoundException("user not found")
    return user
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10)
    return this.prisma.users.update({ where: { id }, data: dto })
  }
    async removeUser(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { id }
    })
    if (!user) {
      throw new NotFoundException("user not found")
    }
    await this.prisma.users.delete({
      where: { id }
    })
    return {
      message: "user deleted"
    }
  }
}
