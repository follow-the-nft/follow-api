'use strict';

module.exports = (sequelize, DataTypes) => {
  sequelize.define('NFT', {
    name: {
      type: DataTypes.STRING,
    },
    asset_owner: {
      type: DataTypes.STRING,
    },
    id: {
      type: DataTypes.STRING,
    },
    token_id: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    traits: {
      type: DataTypes.STRING,
    },
    collection: {
      type: DataTypes.ENUM([{
        name: DataTypes.STRING,
        traits: DataTypes.STRING,
        banner_url: DataTypes.STRING,
        created_date: DataTypes.STRING,
        slug: DataTypes.STRING,
      }])
    }
  })
}
