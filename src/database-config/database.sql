create DATABASE project;
use project;
create TABLE articles(
    id_article int primary key auto_increment,
    nom_article VARCHAR (255),
    quantity int
);

CREATE TABLE Utilisateur(
    id_utilisateur int primary key auto_increment,
    email VARCHAR (255),
    mdp VARCHAR (255)
);