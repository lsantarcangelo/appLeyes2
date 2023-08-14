module.exports = (sequelize, dataTypes) => {
    let alias = "EntityType";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        name: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "entity_types",
        timestamps: false
    };

    const EntityType = sequelize.define(alias, cols, config);

    EntityType.associate = function(models) {
        EntityType.hasMany(models.Ley, {
            as: 'leyes',
            foreignKey: 'type_id'
        });
    }

    return EntityType;
}