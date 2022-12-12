const { Dog } = require("../db");

const generateNewId = async () => {
  let count = await Dog.count();
  count++;
  return `db0${count}`;
};

module.exports = generateNewId;
