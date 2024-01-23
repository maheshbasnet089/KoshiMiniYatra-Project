let { Contact, Sequelize } = require("./../../model");

exports.addContact = async (req, res, next) => {
    // console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    let contact = await Contact.create({
        name,
        email,
        subject,
        message
    });
    if (contact) {
        res.status(200).send({
            message: "Success",
        });
    } else {
        res.status(400).send({
            message: "Failed",
        });
    }
};
exports.getAllContact = async (req, res, next) => {
    let contact = await Contact.findAll();
    if (contact) {
        res.status(200).send({
            message: "Success",
            contact,
        });
    } else {
        res.status(400).send({
            message: "Failed",
        });
    }
};