export class User {
    private _id_utilisateur: number;
    private _email: string;
    private _mdp: string;

    constructor(id_utilisateur: number, email: string, mdp: string) {
        this._id_utilisateur = id_utilisateur;
        this._email = email;
        this._mdp = mdp;
    }

    get id_utilisateur(): number {
        return this._id_utilisateur;
    }

    set id_utilisateur(value: number) {
        this._id_utilisateur = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get mdp(): string {
        return this._mdp;
    }

    set mdp(value: string) {
        this._mdp = value;
    }
}
