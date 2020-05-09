const orm = require("../config/orm");
// set up burger structure for orm.js
let burger = {
  selectAll: function(cb) {
    orm.selectAll("burgers", res => {
      cb(res);
    });
  },
  insertOne: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, res => {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, res => {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("burgers", condition, res => {
      cb(res);
    });
  }
};
//export db functions for burger_controller.js
module.exports = burger;