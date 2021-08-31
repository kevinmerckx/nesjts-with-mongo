import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from '../entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private posts: Model<PostDocument>) {}

  getAll() {
    return this.posts.find();
  }

  async create(content: string) {
    const post = new this.posts();
    post.content = content;
    await post.save();
    return post;
  }
}
