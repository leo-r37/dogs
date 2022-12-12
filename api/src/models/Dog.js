const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "dog",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      life_span: {
        // type: DataTypes.RANGE(DataTypes.DECIMAL)
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: 'Only URL format for images'
          }
        }
      }
    },
    {
      timestamps: false,
    }
  );
};
