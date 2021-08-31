import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from '../services/post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @Post()
  create(@Body() body: { content: string }) {
    return this.postService.create(body.content);
  }
}
