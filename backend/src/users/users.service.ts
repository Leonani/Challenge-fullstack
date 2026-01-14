import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Obtener un usuario por ID
  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    return { id: user.id, name: user.name, email: user.email };
  }

  // Actualizar un usuario
  async updateUser(id: string, dto: UpdateUserDto) {
    // 1️⃣ Verificar que el usuario exista
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) throw new NotFoundException('Usuario no encontrado');

    // 2️⃣ Validaciones básicas
    if (dto.email && dto.email !== existingUser.email) {
      // Chequear si el nuevo email ya existe en la DB
      const emailExists = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (emailExists) throw new ConflictException('El email ya está en uso');
    }

    // 3️⃣ Preparar los datos para actualizar
    const data: any = { ...dto };
    if (dto.password) {
      if (dto.password.length < 6) {
        throw new BadRequestException('La contraseña debe tener al menos 6 caracteres');
      }
      data.password = await bcrypt.hash(dto.password, 10);
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data,
      });

      return { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email };
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }
}
