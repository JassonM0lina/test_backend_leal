const Transaction = db.define('TRANSACTION', {
    transaction_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    value: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    points: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    user_id: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'TRANSACTION'
});
Transaction.associate = function(model) {
    // associations can be defined here
    Transaction.belongsTo(model.User,{
      foreignKey: 'id'
    });
  };
module.exports = Transaction;