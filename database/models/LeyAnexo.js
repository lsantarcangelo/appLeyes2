module.exports = (sequelize, dataTypes) => {
    let alias = "LeyAnexo";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ley_id: {
            type: dataTypes.INTEGER
        },
        file: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "leyes_anexos",
        timestamps: false
    };

    const LeyAnexo = sequelize.define(alias, cols, config);

    LeyAnexo.associate = function(models) {
        LeyAnexo.belongsTo(models.Ley, {
            as: 'ley',
            foreignKey: 'ley_id'
        })
    }
    return LeyAnexo;
}