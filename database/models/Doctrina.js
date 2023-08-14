module.exports = (sequelize, dataTypes) => {
    let alias = "Doctrinas";
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
        
        subject: {
            type: dataTypes.STRING
        },
        
        status: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "doctrinas",
        timestamps: false
    };

    const Doctrina = sequelize.define(alias, cols, config);
    
    return Doctrina;
}