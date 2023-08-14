module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        firstname: {
            type: dataTypes.STRING
        },
        
        lastname: {
            type: dataTypes.STRING
        },
        
        email: {
            type: dataTypes.STRING
        },
        
        password: {
            type: dataTypes.STRING
        },
        
        avatar: {
            type: dataTypes.STRING
        },
        
        admin: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: "users",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    return User;
}