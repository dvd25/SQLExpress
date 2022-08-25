const Comment = require("../models/comment.model.js");
const redis = require("redis");

let redisClient;
(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request  
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a new Post  
    const post = new Comment({
        userId: req.body.userId,
        postId: req.body.postId,
        comment: req.body.comment,

    });
    // Save Tutorial in the database  
    Comment.create(post, (err, data) => {
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
    Comment.getAll((err, data) => {
        if (err){
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Could not find any entries.`
                })} else 
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving."
            })} else {res.send(data);}
    });
};

exports.findOne = (req, res) => {
    const id = Number(req.params.id);
    Comment.findById(id, (err, data) => {
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

    Comment.updateById(
        req.params.id,
        new Comment(req.body),
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

    Comment.deleteById(req.params.id,
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

    Comment.deleteAllTutorials(
        (err, data) => {
             res.send({ message: "successfully deleted all rows" });
        }
    );
};