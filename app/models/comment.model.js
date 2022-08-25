const sql = require("./db.js")

// constructor
const Comment = function (comment) {
    this.userId = comment.userId;
    this.postId = comment.postId;
    this.comment = comment.comment
}
Comment.create = (newComment, result) => {
    sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created user: ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
};

Comment.findById = (id, result) => {
    sql.query(`SELECT * FROM comments WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Found: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Comment.getAll = (result) => {
    sql.query(`SELECT * FROM comments`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found ", res[0]);
            result(err, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};



Comment.updateById = (id, comment, result) => {
    sql.query(
        "UPDATE comments SET userId = ?, postId = ?, comment = ? WHERE id = ?",
        [comment.userId, comment.postId, comment.comment, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found entry with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated entry: ", { id: id, ...comment });
            result(null, { id: id, ...comment });
        }
    );
};

Comment.deleteById = (id, result) => {
    sql.query(`DELETE FROM comments WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found entry with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log(`Deleted row successfully with id = ${id}`);
        result(null, null);
    }
    )
}


Comment.deleteAllTutorials = (result) => {
    sql.query(`TRUNCATE TABLE comments `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found entry with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted all sucessfully ");
        result(null, null);
    }
    )
}





module.exports = Comment;