module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Plant', {
    macAddress: DataTypes.STRING,
    identifier: DataTypes.STRING,
    name:       DataTypes.STRING
  }, {
    classMethods: {
      massAssignableFields: function() {
        return [ 'name' ]
      }
    },

    instanceMethods: {
      sortedRecords: function() {
        if (!!this.records) {
          return this.records.sort(function(a, b) {
            if (a.createdAt < b.createdAt) {
              return 1
            } else if (a.createdAt > b.createdAt) {
              return -1
            } else {
              return 0
            }
          })
        } else {
          return null
        }
      },

      latestRecord: function() {
        var records = this.sortedRecords()

        if (!!records) {
          return records[0]
        } else {
          return null
        }
      },

      displayName: function() {
        return !!this.name ? this.name : this.identifier
      }
    }
  })
}
