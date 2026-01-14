import { Injectable, NotFoundException, ForbiddenException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  // Listar todos los posts con paginación
  async getAll(page: number = 1, limit: number = 10) {
    if (page < 1) throw new BadRequestException('Página inválida');
    if (limit < 1) throw new BadRequestException('Límite inválido');

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        skip,
        take: limit,
        include: { user: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.post.count(),
    ]);

    return {
      data: posts,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    if (!post) throw new NotFoundException('Post no encontrado');
    return post;
  }

  async create(userId: string, dto: CreatePostDto) {
    if (!dto.title || dto.title.trim() === '') {
      throw new BadRequestException('El título es obligatorio');
    }
    if (!dto.content || dto.content.trim() === '') {
      throw new BadRequestException('El contenido es obligatorio');
    }

    try {
      return await this.prisma.post.create({
        data: {
          title: dto.title,
          content: dto.content,
          userId,
        },
        include: { user: { select: { id: true, name: true, email: true } } },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el post');
    }
  }

  async update(id: string, dto: UpdatePostDto) {
    const data: any = {};

    if (dto.title !== undefined) {
      if (dto.title.trim() === '') {
        throw new BadRequestException('El título no puede estar vacío');
      }
      data.title = dto.title;
    }

    if (dto.content !== undefined) {
      if (dto.content.trim() === '') {
        throw new BadRequestException('El contenido no puede estar vacío');
      }
      data.content = dto.content;
    }

    try {
      return await this.prisma.post.update({
        where: { id },
        data,
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar el post');
    }
  }

}

