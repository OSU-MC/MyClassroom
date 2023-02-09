'use strict' 

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('Session', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
           type: DataTypes.INTEGER,
           allowNull: false,
           references: {
               model: 'Users',
               key: 'id'
           },
           onDelete: 'CASCADE'
        },
        expires: {
            type: DataTypes.DATE(6),
            defaultValue: moment().add(4, 'H').utc().format("YYYY-MM-DD HH:mm:ss"),
            allowNull: false
        }
    })

    Session.associate = (models) => {
        Session.belongsTo(models.User)
    }

    //Sends true if the current session is expired, false if not
    Session.prototype.checkIfExpired = function (){
        return moment().isAfter(moment(this.expires));
    }

    return Session;
}

