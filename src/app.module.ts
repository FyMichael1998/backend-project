import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database-config/database.module';
import { ArticleModule } from './article-service/article.module';
import { UserModule } from './user-service/user.module';

@Module({
  imports: [ArticleModule, DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
