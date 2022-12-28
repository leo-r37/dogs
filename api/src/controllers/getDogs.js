const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");

const getDogs = async (req, res) => {
  let { name } = req.query;
  if (name) {
    try {
      let dogsToSend = [];
      let dbDogs = await Dog.findAll({
        attributes: ["id", "image", "name", "weightMin", "weightMax"],
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
        let weightMin = d.weight.metric.split(" - ")[0];
        let weightMax = d.weight.metric.split(" - ")[1];

        if (d.name.toLowerCase().includes(name.toLowerCase())) {
          if (d.temperament) {
            let temperamentsToArray = d.temperament.split(", ");
            temperamentsToArray = temperamentsToArray.map((t) => {
              return { name: t };
            });
            let dog = {
              id: d.id,
              image: d.image.url,
              name: d.name,
              weightMin,
              weightMax,
              temperaments: temperamentsToArray,
            };
            dogsToSend.push(dog);
          } else {
            let dog = {
              image: d.image.url,
              name: d.name,
              weightMin,
              weightMax,
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
        attributes: ["id", "image", "name", "weightMin", "weightMax"],
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
        let weightMin = d.weight.metric.split(" - ")[0];
        let weightMax = d.weight.metric.split(" - ")[1];

        if (d.temperament) {
          let temperamentsToArray = d.temperament.split(", ");
          temperamentsToArray = temperamentsToArray.map((t) => {
            return { name: t };
          });
          let dog = {
            id: d.id,
            image: d.image.url,
            name: d.name,
            weightMin,
            weightMax,
            temperaments: temperamentsToArray,
          };
          dogsToSend.push(dog);
        } else {
          let dog = {
            image: d.image.url,
            name: d.name,
            weightMin,
            weightMax,
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
