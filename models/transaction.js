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
    }
  }, {
    paranoid: true 
  });

  return Transaction;
};