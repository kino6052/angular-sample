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
      type: DateType.DATE,
      allowNull: false
    },
    firstName: {
      type: DateType.DATE,
      allowNull: false
    },
    lastName: {
      type: DateType.DATE,
      allowNull: false
    },
    phoneNumber: {
      type: DateType.DATE,
      allowNull: false
    },
    callType: {
      type: DataTypes.ENUM,
      values: ['Change', 'Cancel', 'Billing', 'Other'],
      allowNull: false
    },
    callType-Other: DataType.STRING,
    outcome: {
      type: DataTypes.ENUM
      values: ['Scheduled', 'Follow-Up', 'Insurance-Issue'],
      allowNull: false
    },
    ocFollowUp: DataTypes.DATE,
    notes: {
      type: DateType.DATE,
      allowNull: false
    },
  });
}
