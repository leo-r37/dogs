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
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          len: [1, 30]
        }
      },
      heightMin: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      heightMax: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      weightMin: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      weightMax: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      life_span: {
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
