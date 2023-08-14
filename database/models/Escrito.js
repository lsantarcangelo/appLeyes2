module.exports = function(sequelize, dataTypes) {
    let alias = "Escritos";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        subject: {
            type: dataTypes.STRING
        },
        
        part: {
            type: dataTypes.STRING
        },
        
        instance: {
            type: dataTypes.STRING
        },
        
        status: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "escritos",
        timestamps: false
    };

    const Escrito = sequelize.define(alias, cols, config);

    return Escrito;
}