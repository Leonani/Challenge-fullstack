import { Controller, Get, Post, Put, Param, Body, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostOwnerGuard } from './guards/owner.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAll() {
    return this.postsService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.postsService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() dto: CreatePostDto) {
    return this.postsService.create(req.user, dto);
  }

  @UseGuards(JwtAuthGuard, PostOwnerGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto, @Req() req) {
    // Aquí podés agregar un guard de propietario si querés
    const userId = req.user.id;
    return this.postsService.update(id, userId, dto);
  }
}
