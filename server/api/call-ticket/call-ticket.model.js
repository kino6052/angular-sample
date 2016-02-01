'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('CallTicket', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    callInitiated: {
      type: DataTypes.DATE,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    callType: {
      type: DataTypes.ENUM,
      values: ['Change', 'Cancel', 'Billing', 'Other'],
      allowNull: false
    },
    callTypeOther: DataTypes.STRING,
    outcome: {
      type: DataTypes.ENUM,
      values: ['Scheduled', 'Follow-Up', 'Insurance-Issue'],
      allowNull: false
    },
    ocFollowUp: DataTypes.DATE,
    notes: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
}
