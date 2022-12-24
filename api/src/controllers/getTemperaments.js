const axios = require("axios");
const { Temperament } = require("../db");

const getTemperaments = async (req, res) => {
  let dbTemperaments = await Temperament.findAll({ attributes: ["name"] });
  dbTemperaments = dbTemperaments.map((t) => t.name);

  if (dbTemperaments.length === 0) {
    let temperaments = [];
    let dogs = await axios.get("https://api.thedogapi.com/v1/breeds");
    dogs.data.forEach((d) => {
      if (d.temperament) {
        let arrayOfTemperaments = d.temperament.split(", ");
        arrayOfTemperaments.forEach((temper) => {
          if (!temperaments.includes(temper)) temperaments.push(temper);
        });
      }
    });
    for await (let t of temperaments) {
      await Temperament.create({ name: t });
    }
    dbTemperaments = await Temperament.findAll({ attributes: ["name"] });
    dbTemperaments = dbTemperaments.map((t) => t.name);
  }
  dbTemperaments.sort((a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();
    if (a > b) return 1;
    if (b > a) return -1;
    else return 0;
  });
  res.send(dbTemperaments);
};

module.exports = getTemperaments;
