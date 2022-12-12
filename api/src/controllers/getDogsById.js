const axios = require("axios");
const { Dog } = require("../db");

const getDogsById = async (req, res) => {
  const { idRaza } = req.params;
  if (idRaza.includes("db")) {
    try {
      const dog = await Dog.findByPk(idRaza);
      dog ? res.send(dog) : res.status(404).send("Dog breed not found");
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } else {
    try {
      const dogs = await axios.get(`https://api.thedogapi.com/v1/breeds`);
      let dog = dogs.data.filter((d) => d.id == idRaza);
      dog.length > 0
        ? res.send(dog)
        : res.status(404).send("Dog breed not found");
    } catch (e) {
        res.status(400).json({error: e.message});
    }
  }
};

module.exports = getDogsById;
