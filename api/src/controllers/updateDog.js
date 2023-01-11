const { Dog, Temperament, DogTemperaments } = require("../db");

const updateDog = async (req, res) => {
  let { id } = req.params;
  if (!id) return res.status(400).json({ error: "The id wasn't provided" });
  if (!id.startsWith("db"))
    return res.status(400).json({
      error: "Can't update a breed that hasn't been created by the user",
    });
  else {
    let {
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      life_span,
      image,
      temperaments,
    } = req.body;
    let dog = await Dog.findByPk(id);
    if (!dog) return res.status(404).json({ error: "Dog breed don't found" });
    else {
      try {
        await Dog.update(
          {
            name,
            heightMin,
            heightMax,
            weightMin,
            weightMax,
            life_span,
            image,
          },
          {
            where: {
              id,
            },
          }
        );
        if (temperaments) {
          await DogTemperaments.destroy({
            where: {
              dogId: id,
            },
          });
          for await (let t of temperaments) {
            let temperamentId = await Temperament.findOne({
              where: { name: t.name },
              attributes: ["id"],
            });
            temperamentId = temperamentId.dataValues.id;
            await DogTemperaments.create({
              dogId: id,
              temperamentId,
            });
          }
        }
        return res.send("Updating breed woof!");
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
      }
    }
  }
};

module.exports = updateDog;
