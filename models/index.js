const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('Item_db', 'root', 'muskan!!!@00$', {
    host: 'localhost',
    dialect: 'mysql',
});

const Items = sequelize.define('Item', {
    itemName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    Quantity: {  
        type: DataTypes.FLOAT,  
        allowNull: false,
    },
});

sequelize.sync()
    .then(() => {
        console.log('Database & table created');
    })
    .catch((error) => {
        console.error('Error creating database or table:', error);
    });

module.exports = {
    sequelize,
    Items,
};
