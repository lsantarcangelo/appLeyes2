module.exports = (sequelize, dataTypes) => {
    let alias = "Ley";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        type_id: {
            type: dataTypes.INTEGER
        },

        number: {
            type: dataTypes.STRING
        },

        year: {
            type: dataTypes.INTEGER
        },

        status: {
            type: dataTypes.STRING
        },

        file: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "leyes",
        timestamps: false
    };

    const Ley = sequelize.define(alias, cols, config);

    Ley.associate = function(models) {
        Ley.belongsTo(models.EntityType, {
            as: 'entityTypes',
            foreignKey: 'type_id'
        });
        Ley.hasMany(models.LeyAnexo, {
            as: 'anexos',
            foreignKey: 'ley_id'
        });
    }

    return Ley;
}