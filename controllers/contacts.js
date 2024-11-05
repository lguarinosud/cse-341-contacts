const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts_collection').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'Application/json');
        res.status('200').json(contacts)
    }).catch((err) => {

    });
};

const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts_collection').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'Application/json');
        res.status('200').json(contacts[0]);
    }).catch((err) => {

    });
};


module.exports = {
    getAll,
    getSingle
}