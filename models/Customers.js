const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Customers = sequelize.define("Customers", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mobileNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        civilStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passportId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        issuedDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        issuedPlace: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Customers

}
