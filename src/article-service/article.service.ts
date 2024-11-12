import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database-config/database.service';

@Injectable()
export class ArticleService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllArticles() {
    const query = 'SELECT * FROM articles';
    return this.databaseService.executeQuery(query);
  }

  async getById(id_article: number) {
    const query = 'SELECT * FROM articles WHERE id_article = ?';
    return this.databaseService.executeQuery(query, [id_article]);
  }

  async newArticle(nom: string, quantite: number) {
    const query = 'INSERT INTO articles (nom_article, quantity) VALUES (?, ?)';
    return this.databaseService.executeQuery(query, [nom, quantite]);
  }

  async updateArticle(nom: string, quantite: number, id_article: number) {
    const query = 'update articles set nom_article = ?, quantity = ? where id_article = ?';
    return this.databaseService.executeQuery(query, [nom, quantite, id_article]);
  }

  async deleteArticle(id_article:number) {
    const query = 'delete from articles where id_article = ?';
    return this.databaseService.executeQuery(query, [id_article]);
  }
}
