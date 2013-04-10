/*global module:false*/

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: true
      }
    }
  })
}
