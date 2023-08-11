const express = require('express');
const knex = require('knex')(require('../knexfile')['development']);

exports.getAllContacts = async (req, res, next) => {
    try {
        const contacts = await knex('contacts').select('*'); 
        res.json(contacts);

    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue lors de la récupération des contacts" }); 
    }
}

exports.createContact = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newContact = await knex('contacts').insert({ name, email, message });
        res.json({ message: 'Merci de nous avoir contacté, nous vous reviendrons bientôt', contact_id: newContact[0] });
    } catch (error) {
        return res.status(500).json({ error: "Une erreur est survenue lors de la création du contact." });
    }
}
