const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");

const getDogs = async (req, res) => {
  let { name } = req.query;
  if (name) {
    try {
      let dogsToSend = [];
      let dbDogs = await Dog.findAll({
        attributes: ["image", "name", "weight"],
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      const axiosDogs = await axios.get("https://api.thedogapi.com/v1/breeds");
      axiosDogs.data.forEach((d) => {
        if (d.name.toLowerCase().includes(name.toLowerCase())) {
          if (d.temperament) {
            let temperamentsToArray = d.temperament.split(", ");
            temperamentsToArray = temperamentsToArray.map((t) => {
              return { name: t };
            });
            let dog = {
              image: d.image.url,
              name: d.name,
              weight: d.weight.metric,
              temperaments: temperamentsToArray,
            };
            dogsToSend.push(dog);
          } else {
            let dog = {
              image: d.image.url,
              name: d.name,
              weight: d.weight.metric,
              temperaments: d.temperament,
            };
            dogsToSend.push(dog);
          }
        }
      });
      dogsToSend = dbDogs.concat(dogsToSend);
      dogsToSend.length > 0
        ? res.send(dogsToSend)
        : res.status(404).send("No breeds with that name found");
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } else {
    try {
      let dogsToSend = [];
      const dbDogs = await Dog.findAll({
        attributes: ["image", "name", "weight"],
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      const axiosDogs = await axios.get("https://api.thedogapi.com/v1/breeds");

      axiosDogs.data.forEach((d) => {
        if (d.temperament) {
          let temperamentsToArray = d.temperament.split(", ");
          temperamentsToArray = temperamentsToArray.map((t) => {
            return { name: t };
          });
          let dog = {
            image: d.image.url,
            name: d.name,
            weight: d.weight.metric,
            temperaments: temperamentsToArray,
          };
          dogsToSend.push(dog);
        } else {
          let dog = {
            image: d.image.url,
            name: d.name,
            weight: d.weight.metric,
            temperaments: d.temperament,
          };
          dogsToSend.push(dog);
        }
      });

      dogsToSend = dbDogs.concat(dogsToSend);
      dogsToSend.length > 0
        ? res.send(dogsToSend)
        : res.status(404).send("No breeds with that name found");
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e.message });
    }
  }
};

module.exports = getDogs;
