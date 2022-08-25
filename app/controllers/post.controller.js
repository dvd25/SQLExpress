const Post = require("../models/post.model.js");
const RedisLibrary = require('../libraries/redis')

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request  
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a new Post  
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        userId: req.body.userId,
        likes: req.body.likes
    });
    // Save Tutorial in the database  
    Post.create(post, (err, data) => {
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
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    const id = Number(req.params.id);
    Post.findById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Couldn't find row with id ${req.params.id}.`
            })};
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
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

    Post.updateById(
        req.params.id,
        new Post(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Couldn't find row id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating row with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    // Validate Request

    Post.deleteById(req.params.id,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Could not find row with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not find row with id " + req.params.id
                    });
                }
            } else res.send({ message: "successfully deleted" });
        }
    );
};

exports.deleteAll = (req, res) => {
    // Validate Request

    Post.deleteAllTutorials(
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `No data to delete.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error deleting table contents"
                    });
                }
            } else res.send({ message: "successfully deleted all rows" });
        }
    );
};