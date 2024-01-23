module.exports = (sequelize, Sequelize) => {
    const Logout = sequelize.define("logout", {
        token: {
            type: Sequelize.STRING,
        }
    })
    return Logout
}