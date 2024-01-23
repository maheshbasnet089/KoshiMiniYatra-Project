module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define('profile', {
        image: {
            type: Sequelize.STRING
        }
    })
    return Profile
}