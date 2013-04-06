module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Record', {
    value: DataTypes.FLOAT
  })
}
