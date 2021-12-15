const followModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Follows', {
    user_id : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contract_address: {
      type: DataTypes.STRING,
      required: true,
    },
  })

  return model
}

module.exports = followModel