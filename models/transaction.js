module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2), 
      defaultValue: '0.00'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    paranoid: true 
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Transaction;
};