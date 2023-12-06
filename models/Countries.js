module.exports = (sequelize, DataTypes) => {
    const Countries = sequelize.define("Countries", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gcc: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return Countries;
}