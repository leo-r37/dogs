const { Dog } = require("../db");

const deleteDog = async (req, res) => {
  let { id } = req.params;
  if (!id) return res.status(400).json({ error: "The id wasn't provided" });
  if (!id.startsWith("db"))
    return res.status(400).json({
      error: "Can't delete a breed that hasn't been created by the user",
    });
  else {
    let dog = await Dog.findByPk(id);
    if (!dog) return res.status(404).json({ error: "Dog breed don't found" });
    else {
      try {
        await Dog.destroy({
          where: {
            id,
          },
        });
        return res.send("Breed deleted");
      } catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
      }
    }
  }
};

module.exports = deleteDog;
