module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        },
        total_amount: {
            type: DataTypes.DECIMAL(10, 2), 
            defaultValue: '0.00'
        },
    },{
        paranoid: true,
    });
  
    User.associate = (models) => {
        User.hasMany(models.Transaction, { foreignKey: 'user_id' });
    };

    return User;
  };