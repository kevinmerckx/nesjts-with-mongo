import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post';

@Module({
  imports: [
    PostModule,
    MongooseModule.forRoot('mongodb://mongo:27017', { dbName: 'dev' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
