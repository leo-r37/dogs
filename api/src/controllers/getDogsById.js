const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getDogsById = async (req, res) => {
  const { idRaza } = req.params;
  if (idRaza.includes("db")) {
    try {
      const dog = await Dog.findByPk(idRaza, {
        attributes: { exclude: ["id"] },
        include: {
          model: Temperament,
          through: {
            attributes: []
          }
        },
      });
      dog ? res.send(dog) : res.status(404).send("Dog breed not found");
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } else {
    try {
      const dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);
      let dog = dogs.data.filter((d) => d.id == idRaza);
      let { name, life_span, temperament } = dog[0];
      let height = dog[0].height.metric;
      let weight = dog[0].weight.metric;
      let image = dog[0].image.url;
      dog = { name, height, weight, life_span, image, temperament };
      dog !== undefined
        ? res.send(dog)
        : res.status(404).send("Dog breed not found");
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};

module.exports = getDogsById;
