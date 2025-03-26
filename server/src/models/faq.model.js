const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const FAQ = sequelize.define("Faq", {
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = FAQ;
