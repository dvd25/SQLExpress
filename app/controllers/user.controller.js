const User = require("../models/user.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request  
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Tutorial  
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });
    // Save Tutorial in the database  
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    User.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// Retrieve all Tutorials that are published.
exports.findAllPublished = (req, res) => {
    const title = req.query.title;
    User.getAllPublished(title, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    const id = Number(req.params.id);
    User.findById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Couldn't find user with id ${req.params.id}.`
            })};
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            })} else res.send(data);
    });
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Couldn't find user with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating user with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    // Validate Request

    User.deleteById(req.params.id,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Could not find user with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not find user with id " + req.params.id
                    });
                }
            } else res.send({ message: "successfully deleted" });
        }
    );
};

exports.deleteAll = (req, res) => {
    // Validate Request

    User.deleteAllTutorials(
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No Tutorials to delete.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error deleting Tutorial"
                    });
                }
            } else res.send({ message: "successfully deleted all tutorials" });
        }
    );
};