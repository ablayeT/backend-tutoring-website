const express = require('express');

const knex = require('knex')(require('../knexfile')['development']);

const app = express();
app.use(express.json());

//     classe Session avec une méthode statique create pour créer une nouvelle session.
class Session {
  constructor(sessionData) {
    this.id = sessionData.id;
    this.tutorId = sessionData.tutor_id;
    this.subjectId = sessionData.subject_id;
    this.date = sessionData.date;
    this.startTime = sessionData.start_time;
    this.endTime = sessionData.end_time;
    this.location = sessionData.location;
    this.price = sessionData.price;
  }

  //    Cette méthode insère les données dans la base de données, puis récupère la session nouvellement créée pour la renvoyer.
  static async create(sessionData) {
    try {
      const [sessionId] = await knex('tutoring_sessions').insert(sessionData);
      const session = await knex('tutoring_sessions')
        .where({ id: sessionId })
        .first();
      return new Session(session);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Session;
