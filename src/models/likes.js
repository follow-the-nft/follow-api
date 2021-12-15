const likeModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Likes', {
    user_id : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contract_address: {
      type: DataTypes.STRING,
      required: true,
    },
    token_id: {
      type: DataTypes.STRING,
      required: true
    }
  })

  return model
}

module.exports = likeModel
