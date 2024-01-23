const db = require("./model/index");
const User = db.Users

const bcrypt = require('bcryptjs')

module.exports = (req, res, next) => {
User.findOrCreate({
    where: { email: 'admin@gmail.com' },
    defaults: {
        name: 'Admin',
        role: 'ADMIN',
        password: bcrypt.hashSync('password', 8),
    }
})
    .then(() => {
        console.log("Admin Seeded Success")
        next()
    })
    .catch(err => {
        res.status(500).send({
            message: 'Error',
            err
        })
    })
}
