const { Dog, Temperament, DogTemperaments } = require("../db");
const generateNewId = require("../controllers/generateNewId");
const loadTemperamentsInDb = require("./loadTemperamentsInDb");

const createDog = async (req, res) => {
  let { id, name, heightMin, heightMax, weightMin, weightMax, life_span, image, temperaments } = req.body;
  if (!name || !heightMin || !heightMax || !weightMin || !weightMax)
    return res.status(400).json({ error: "Missing required fields" });
  if (!id) id = await generateNewId();
  let dog = { id, name, heightMin, heightMax, weightMin, weightMax, life_span, image };
  try {
    await Dog.create(dog);
    if (temperaments) {
      let dbTemperaments = await Temperament.findAll();
      if (dbTemperaments.length <= 0) await loadTemperamentsInDb();
      for await (let t of temperaments) {
        let temperamentId = await Temperament.findOne({
          where: { name: t },
          attributes: ["id"],
        });
        temperamentId = temperamentId.dataValues.id;
        await DogTemperaments.create({
          dogId: id,
          temperamentId,
        });
      }
    };
    const newDog = await Dog.findByPk(id);
    res.status(201).send(`Raza creada con el id ${newDog.id}`);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.message });
  }
};

module.exports = createDog;
