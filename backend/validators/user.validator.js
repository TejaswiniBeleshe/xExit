const Joi = require('joi');

const validateRegisterUser = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email:Joi.string().required().email()
})

const validateLoginUser = Joi.object({
    email:Joi.string().required().email(),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

const validateResignData = Joi.object({
    empId:Joi.string().pattern(new RegExp('^[a-fA-F0-9]{24}$')).required(),
    lwd:Joi.date().required(),
    reason:Joi.string().min(3)
})


module.exports = {validateRegisterUser,validateLoginUser,validateResignData}