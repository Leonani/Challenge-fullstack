import { Injectable, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Registro
  async register(dto: RegisterDto) {
    //  Validar campos
    if (!dto.name || !dto.email || !dto.password) {
      throw new BadRequestException('Todos los campos son obligatorios');
    }

    //  Verificar si el email ya existe
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) throw new BadRequestException('Email ya registrado');

    //  Hashear la contraseña
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: { ...dto, password: hashedPassword },
      });

      //  Retornar solo datos seguros
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  // Login
  async login(dto: LoginDto) {
    if (!dto.email || !dto.password) {
      throw new BadRequestException('Email y contraseña son obligatorios');
    }

    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Credenciales inválidas');

    // Generar JWT
    const accessToken = this.jwtService.sign({ sub: user.id });

    // Devolver token y user info
    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

