'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('PatientProcessing', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false  
    },
    newPatientCompleted: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    newPatientScheduled: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    firstTreatmentCompleted: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    firstTreatmentScheduled: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    treatmentsCompleted: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    treatmentsScheduled: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    abiCompleted: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    abiScheduled: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    biopsyCompleted: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    biopsyScheduled: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    noShowsCompleted: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    noShowsScheduled: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    canceledCompleted: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    canceledScheduled: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });
}
