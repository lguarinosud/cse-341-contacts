const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['contacts']

  const result = await mongodb.getDatabase().db().collection('contacts_collection').find();
  result
    .toArray()
    .then((contacts) => {
      res.setHeader('Content-Type', 'Application/json');
      res.status(200).json(contacts);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['contacts']

  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('contacts_collection')
    .find({ _id: contactId });
  result
    .toArray()
    .then((contacts) => {
      res.setHeader('Content-Type', 'Application/json');
      res.status(200).json(contacts[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createContact = async (req, res) => {
  //#swagger.tags=['contacts']

  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favouriteColor: req.body.favouriteColor,
    birthday: req.body.birthday
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection('contacts_collection')
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured whilst creating the contact');
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags=['contacts']

  const contactId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favouriteColor: req.body.favouriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('contacts_collection')
    .replaceOne({ _id: contactId }, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured whilst updating the contact');
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags=['contacts']

  const contactId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('contacts_collection')
    .deleteOne({ _id: contactId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured whilst deleting the contact');
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
