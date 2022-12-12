const axios = require("axios");
const { Temperament } = require("../db");

const getTemperaments = async (req, res) => {

  let dbTemperaments = await Temperament.findAll();

  if (dbTemperaments.length === 0) {
    let temperaments = [];
    let dogs = await axios.get("https://api.thedogapi.com/v1/breeds");
    dogs.data.forEach(d => {
      if (d.temperament) {
        let arrayOfTemperaments = d.temperament.split(', ');
        arrayOfTemperaments.forEach(temper => {
          if (!temperaments.includes(temper)) temperaments.push(temper);
        });
      };
    });
    for await (let t of temperaments) {
      await Temperament.create({name: t})
    };
    dbTemperaments = await Temperament.findAll();
  }

  res.send(dbTemperaments);

};

module.exports = getTemperaments;
