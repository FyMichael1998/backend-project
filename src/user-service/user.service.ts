import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database-config/database.service';
import { User } from './user.model';

@Injectable()
export class UserService {
    private currentUser: User | null = null;

    constructor(private readonly databaseService: DatabaseService) { }

    setUser(user: User) {
        this.currentUser = user;
    }

    getUser() {
        return this.currentUser;
    }

    async getAllUsers() {
        const query = 'SELECT * FROM utilisateur';
        return this.databaseService.executeQuery(query);
    }

    // Fonction pour verifier si l'utilisateur existe dans la base de donnees
    async exist(email: string, mdp: string): Promise<boolean> {
        const query = 'SELECT * FROM utilisateur WHERE email = ? AND mdp = ?';
        const result = await this.databaseService.executeQuery(query, [email, mdp]);
        return result.length > 0;
    }

    // Fonction pour ajouter un nouveau utilisateur et retourne l'objet
    async newUser(email: string, mdp: string): Promise<User> {
        const query = 'INSERT INTO utilisateur (email, mdp) VALUES (?, ?)';
        const result = await this.databaseService.executeQuery(query, [email, mdp]);

        if (result) {
            const queryFindUser = 'SELECT * FROM utilisateur order by id_utilisateur';
            const insertedUserData = await this.databaseService.executeQuery(queryFindUser, [email]);

            const newUser = new User(insertedUserData[0].id_utilisateur, insertedUserData[0].email, insertedUserData[0].mdp);
            return newUser;
        }

        throw new Error("Erreur lors de l'insertion de l'utilisateur");
    }

    // Fonction pour verifier l'authentification de l'utilisateur
    async checkAuthentification(email: string, mdp: string) {
        if (!email || email.trim() === "") {
            throw new Error("Email non valide ou null");
        }

        if (!mdp || mdp.trim() === "") {
            throw new Error("Mot de passe invalide ou null");
        }

        const userExists = await this.exist(email, mdp);
        if (!userExists) {
            this.newUser(email, mdp);
            const query = 'SELECT * FROM utilisateur WHERE email = ? AND mdp = ?';
            const result = await this.databaseService.executeQuery(query, [email, mdp]);

            this.setUser(result[0]);
            return this.getUser();
        }
        else {
            const query = 'SELECT * FROM utilisateur WHERE email = ? AND mdp = ?';
            const result = await this.databaseService.executeQuery(query, [email, mdp]);
            this.setUser(result[0]);

            return this.getUser();
        }
    }
}
