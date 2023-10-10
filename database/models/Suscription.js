module.exports = (sequelize, dataTypes) => {
    let alias = "Suscription";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        user_id: {
            type: dataTypes.INTEGER
        },
        
        payer_id: {
            type: dataTypes.INTEGER
        },
        
        payer_email: {
            type: dataTypes.STRING
        },

        application_id: {
            type: dataTypes.INTEGER
        },
        
        status: {
            type: dataTypes.STRING
        },
        
        reason: {
            type: dataTypes.STRING
        },

        date_created: {
            type: dataTypes.DATEONLY
        },
        
        currency_id: {
            type: dataTypes.STRING
        },

        frequency_type: {
            type: dataTypes.STRING
        },

        transaction_amount: {
            type: dataTypes.FLOAT
        }
    };
    let config = {
        tableName: "suscriptions",
        timestamps: false
    }

    const Suscription = sequelize.define(alias, cols, config);

    Suscription.associate = function(models) {
        Suscription.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_id'
        })
    };

    return Suscription;
}