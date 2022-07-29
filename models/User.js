module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
 
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
    
          email: {
            type: DataTypes.STRING,
            allowNull: false
          },
    
          password: {
            type: DataTypes.STRING,
            allowNull: false
          },
    }, {
        tablename: "users",
        timestamps: true,
    });

    return User;
}