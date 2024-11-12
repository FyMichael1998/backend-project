import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly article: ArticleService) {}

  @Get()
  async getAllArticles() {
    return this.article.getAllArticles();
  }

  @Get(':id')
  async getArticleById(@Param('id') id: number) {
    return this.article.getById(id);
  }

  @Post()
  async newArticle(@Body() body: { nom: string; quantite: number;}) {
    const { nom, quantite } = body;
    return this.article.newArticle(nom, quantite);
  }

  @Put()
  async updateArticle(@Body() body: { nom: string; quantite: number; id_article: number}) {
    const { nom, quantite, id_article } = body;
    return this.article.updateArticle(nom, quantite, id_article);
  }

  @Delete()
  async deleteArticle(@Body() body: { id_article:number;}) {
    const { id_article } = body;
    return this.article.deleteArticle(id_article);
  }
}
