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

export { registerValidation, loginValidation };
