const Joi = require('joi');

const validateRegisterUser = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email:Joi.string().required().email()
})

const validateLoginUser = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})


module.exports = {validateRegisterUser,validateLoginUser}