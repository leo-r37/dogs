const axios = require("axios");
const { Dog, Temperament } = require("../db");

const getDogsById = async (req, res) => {
  const { idRaza } = req.params;
  if (idRaza.includes("db")) {
    try {
      const dog = await Dog.findByPk(idRaza, {
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      dog ? res.send(dog) : res.status(404).send("Dog breed not found");
    } catch (e) {
      res.status(400).json({ error: e.message});
    }
  } else {
    try {
      const dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);
      let dog = dogs.data.filter((d) => d.id == idRaza);
      if (dog.length <= 0) {
        res.status(404).json({ error: "Can't find a breed with that ID" });
        return;
      }
      let { id, name, life_span, temperament } = dog[0];
      let heightMin = dog[0].height.metric.split(" - ")[0];
      let heightMax = dog[0].height.metric.split(" - ")[1];
      let weightMin = dog[0].weight.metric.split(" - ")[0];
      let weightMax = dog[0].weight.metric.split(" - ")[1];
      let image = dog[0].image.url;

      if (temperament) {
        let temperamentsToArray = temperament.split(", ");
        temperamentsToArray = temperamentsToArray.map((t) => {
          return { name: t };
        });
        dog = {
          id,
          name,
          heightMin,
          heightMax,
          weightMin,
          weightMax,
          life_span,
          image,
          temperaments: temperamentsToArray,
        };
        dog !== undefined
          ? res.send(dog)
          : res.status(404).send("Dog breed not found");
      } else {
        dog = {
          id,
          name,
          heightMin,
          heightMax,
          weightMin,
          weightMax,
          life_span,
          image,
          temperaments: temperament,
        };
        dog !== undefined
          ? res.send(dog)
          : res.status(404).send("Dog breed not found");
      }
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
};

module.exports = getDogsById;
