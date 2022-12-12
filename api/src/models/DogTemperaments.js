const { DataTypes } = require("sequelize");
const { Dog, Temperament } = require('../db');


module.exports = (sequelize) => {
  sequelize.define(
    "DogTemperaments",
    {
      dogId: {
        type: DataTypes.INTEGER,
        references: {
          model: Temperament,
          key: "id",
        },
      },
      temperamentId: {
        type: DataTypes.INTEGER,
        references: {
          model: Dog, 
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
