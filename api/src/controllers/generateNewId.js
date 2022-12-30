const { Dog } = require("../db");

const generateNewId = async () => {
  let count = await Dog.count();
  count++;
  let existentDog = await Dog.findByPk(`db0${count}`);
  if (!existentDog) return `db0${count}`;
  else {
    for (let i = 1; i < count; i++) {
      let existentDog = await Dog.findByPk(`db0${i}`);
      if (!existentDog) return `db0${i}`;
    }
  }
};

module.exports = generateNewId;


