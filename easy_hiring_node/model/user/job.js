module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define('job', {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        pricing: {
            type: Sequelize.STRING,
            allowNull: true
        },
        type: {
            type: Sequelize.STRING
        },
        level: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        lastDate: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        }
    })
    return Job
}