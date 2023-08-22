Backend du Projet de Tutorat - README

Ce dépôt contient le code source du backend pour le projet de tutorat. Il fournit les fonctionnalités nécessaires pour gérer les sessions de tutorat, les tuteurs et les matières. Les étudiants auront la possibilié de réserver une session crée par un tuteur. Ils pourront également faire une recherche sur les tuteur et dès qu'ils choisissent un tuteur spécifique , les sessions réservées par ce tuteur s'affichent. 

Table des matières

--Configuration Requise


Installation
Configuration
Endpoints API
Base de données
Authentification
Gestion des Sessions de Tutorat
Gestion des Tuteurs
Gestion des étudiants 
Gestion des Matières



--Configuration Requise
Node.js (version X.X.X)
knex(un générateuer de requette SQl) et mySQL
Configurations du fichier `.env`


Installation

Clonez ce dépôt vers votre machine locale.
Accédez au dossier du projet : cd backend-tutorat.
Installez les dépendances : npm install.
Configuration
Modifiez les variables d'environnement dans le fichier .env en fonction de votre configuration.
Endpoints API
Le backend fournit les endpoints API suivants :

POST /api/auth/login ou signup ou logout ou reset-password ou  change-password : Enregistre, connecte, modifie ou réinitialise un utilisateur (tuteur ou étudiant).
POST /api/auth/.... : Authentifie un utilisateur et renvoie un token JWT.
GET /api/tutors/sessions : Récupère toutes les sessions de tutorat.
GET /api/tutors/sessions/:id : Récupère une session de tutorat spécifique.
POST /api/tutors/sessions : Crée une nouvelle session de tutorat.
PUT /api/tutors/sessions/:id : Met à jour une session de tutorat existante.
DELETE /api/tutors/sessions/:id : Supprime une session de tutorat.
(A compléter..... )



Base de données
Le projet utilise une base de données MySql pour stocker les données. Assurez-vous d'avoir installé MySQL ou passer par XAMP ou Mamp pour tout ce qui est serveur. Mysql doit etre en cours d'exécution. Modifiez les variables d'environnement .env pour configurer l'accès à la base de données.

Authentification
L'authentification est gérée via JWT (JSON Web Token). Lorsqu'un utilisateur se connecte, un token JWT est généré et renvoyé. Ce token doit être inclus dans les en-têtes de chaque requête API pour accéder aux ressources protégées. pour la sécurité. 

Gestion des Sessions de Tutorat
Les sessions de tutorat sont gérées via les endpoints API /api/tutors/sessions. Vous pouvez créer, mettre à jour, récupérer et supprimer des sessions de tutorat en utilisant ces endpoints.

Gestion des Tuteurs
Les informations sur les tuteurs sont gérées via les endpoints API /api/tutors/profile.../id, etc. Vous pouvez récupérer les informations des tuteurs, y compris leurs sessions de tutorat associées.

Gestion des Matières
Les informations sur les matières sont gérées via les endpoints API /api/subjects/:id .... etc. Vous pouvez récupérer la liste des matières disponibles avec cet endpoint .     



A commpléter  .... 