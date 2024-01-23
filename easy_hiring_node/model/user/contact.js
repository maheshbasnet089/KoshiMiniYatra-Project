module.exports = (sequelize, Sequelize) => {
    const Coantact = sequelize.define('contact', {
        name: {
            type: Sequelize.STRING
                
        },
        email: {
            type: Sequelize.STRING
        },
        subject: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING
        }
    })
    return Coantact
}