import Joi from 'joi';

const registerValidation = Joi.object({
    username: Joi.string().max(100).required().messages({
        'string.empty': 'Username Cannot be Empty',
        'string.max': 'Username Must be at Least 100 Characters',
        'any.required': 'Username is Required',
    }),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})'))
        .required()
        .messages({
            'string.pattern.base': 'The password must contain at least one lowercase letter, one uppercase letter, one special character, and a minimum of 8 characters',
            'string.empty': 'Password Cannot be Empty',
            'any.required': 'Password is Required',
        }),
});

const loginValidation = Joi.object({
    username: Joi.string().max(100).required().messages({
        'string.empty': 'Username Cannot be Empty',
        'string.max': 'Username Must be at Least 100 Characters',
        'any.required': 'Username is Required',
    }),
    password: Joi.string().max(100).required().messages({
        'string.empty': 'Password Cannot be Empty',
        'any.required': 'Password is Required',
    }),
});

const teknisiValidation = Joi.object({
    nama: Joi.string().max(100).required().messages({
        'string.empty': 'Name Cannot be Empty',
        'string.max': 'Name Must be at Most 100 Characters',
        'any.required': 'Name is Required',
    }),
    nip: Joi.number().integer().required().messages({
        'number.base': 'NIP Must be a Number',
        'number.integer': 'NIP Must be an Integer',
        'number.empty': 'NIP Cannot be Empty',
        'any.required': 'NIP is Required',
    }),
    no_telp: Joi.number().integer().required().messages({
        'number.base': 'Phone Number Must be a Number',
        'number.integer': 'Phone Number Must be an Integer',
        'number.empty': 'Phone Number Cannot be Empty',
        'any.required': 'Phone Number is Required',
    }),
    role: Joi.string().valid('TEKNISI').required().messages({
        'any.only': 'Role Must be TEKNISI',
        'any.required': 'Role is Required',
    }), 
})

export { registerValidation, loginValidation, teknisiValidation };
