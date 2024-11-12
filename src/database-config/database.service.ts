import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: mysql.Connection;

  async onModuleInit() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'project',
      port: 3307,
    });
  }

  async onModuleDestroy() {
    if (this.connection) {
      await this.connection.end();
    }
    else {
      console.log('Fermeture de la connexion impossible');
    }
  }

  // Fonction pour avoir une connexion
  getConnection() {
    if (!this.connection) {
      throw new Error('Database connection not initialized');
    }
    return this.connection;
  }

  // Fonction pour executer une requete SQL
  async executeQuery(query: string, params?: any[]): Promise<any> {
    const connex = this.getConnection();

    try {
      const [results] = await connex.execute(query, params);
      return results;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }


}
