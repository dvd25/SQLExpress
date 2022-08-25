const sql = require("./db.js")

// constructor
const Post = function (post) {
    this.title = post.title;
    this.description = post.description;
    this.image = post.image
    this.userId = post.userId
    this.likes = post.likes
}
Post.create = (newPost, result) => {
    sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created user: ", { id: res.insertId, ...newPost });
        result(null, { id: res.insertId, ...newPost });
    });
};

Post.findById = (id, result) => {
    sql.query(`SELECT * FROM posts WHERE id = ${id}`, (err, res) => {
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

Post.getAll = (result) => {
    sql.query(`SELECT * FROM posts`, (err, res) => {
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



Post.updateById = (id, post, result) => {
    sql.query(
        "UPDATE posts SET title = ?, description = ?, image = ?, userId = ?, likes =? WHERE id = ?",
        [post.title, post.description, post.image, post.userId, post.likes, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...post });
            result(null, { id: id, ...post });
        }
    );
};

Post.deleteById = (id, result) => {
    sql.query(`DELETE FROM posts WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log(`Deleted row successfully with id = ${id}`);
        result(null, null);
    }
    )
}


Post.deleteAllTutorials = (result) => {
    sql.query(`TRUNCATE TABLE posts `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted all sucessfully ");
        result(null, null);
    }
    )
}





module.exports = Post;