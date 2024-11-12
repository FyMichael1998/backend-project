import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { DatabaseModule } from '../database-config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
