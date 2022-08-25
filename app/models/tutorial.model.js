const sql = require("./db.js");

// constructor
const Tutorial = function (tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
};

Tutorial.create = (newTutorial, result) => {
    sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
        result(null, { id: res.insertId, ...newTutorial });
    });
};

Tutorial.findById = (id, result) => {
    sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Tutorial.getAll = (title, result) => {
    sql.query(`SELECT * FROM tutorials`, (err, res, fields) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(err, res);
            return;
        }
    });
};


Tutorial.getAllPublished = (title, result) => {
    sql.query(`SELECT * FROM tutorials WHERE published = '0' `, (err, res, fields) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(err, res);
            return;
        }
    });
};



Tutorial.updateById = (id, tutorial, result) => {
    sql.query(
        "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
        [tutorial.title, tutorial.description, tutorial.published, id],
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

            console.log("updated tutorial: ", { id: id, ...tutorial });
            result(null, { id: id, ...tutorial });
        }
    );
};

Tutorial.deleteById = (id, result) => {
    sql.query(`DELETE FROM tutorials WHERE id = ${id}`, (err, res) => {
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
        console.log("deleted tutorial sucessfully ");
        result(null, null);
    }
    )
}


Tutorial.deleteAllTutorials = (result) => {
    sql.query(`DELETE FROM tutorials `, (err, res) => {
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
        console.log("deleted all tutorials sucessfully ");
        result(null, null);
    }
    )
}





module.exports = Tutorial;
