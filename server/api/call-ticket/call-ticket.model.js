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
    callType: {
      type: DataTypes.ENUM,
      values: ['New', 'Change', 'Cancel', 'Billing', 'Other'],
      allowNull: false
    },
    callTypeOther: DataTypes.STRING,
    doctorName: DataTypes.STRING,
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    insurance: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
        type: DataTypes.ENUM,
        values: ['Phoenix', 'Mesa', 'Sun City West', 'Tuscon', 'Lake Havasu City'],
        allowNull: false
    },
    ocFollowUp: DataTypes.DATE,
    outcome: {
      type: DataTypes.ENUM,
      values: ['Scheduled', 'Rescheduled', 'Followup', 'Insurance', 'Referral', 'Other'],
      allowNull: false
    },
    outcomeOther: DataTypes.STRING,
    newspaper: DataTypes.STRING,
    notes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    patientName: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referral: {
        type: DataTypes.STRING,
        allowNull: false
    },
    referralOther: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    referralRequired: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    tv: DataTypes.STRING,
    user: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
}
