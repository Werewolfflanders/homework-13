const connection = require("../config/connection");

function printQuestionMarks(num) {
  let arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}


function objToSql(ob) {
  let arr = [];

  for (let key in ob) {
    let value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}

let orm = {
// select all from db
  all: function(tableInput, cb) {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // create new entry in db
  create: function(table, cols, vals, cb) {
    let queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  //update entry in db
  update: function(table, objColVals, condition, cb) {
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  //delete an entry from db
  delete: function(table, condition, cb) {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

module.exports = orm;