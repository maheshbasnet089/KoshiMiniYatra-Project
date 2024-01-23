module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define('city', {
        name: {
            type: Sequelize.STRING
                
        },
        image: {
            type: Sequelize.STRING
        }
    })
    return City
}