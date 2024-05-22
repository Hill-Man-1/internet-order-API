import Joi from 'joi';

const orderValidation = Joi.object({
    nama: Joi.string().max(100).required().messages({
        'string.empty': 'Nama tidak boleh kosong',
        'string.max': 'Nama tidak boleh lebih dari 100 karakter',
        'any.required': 'Nama diperlukan',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email tidak valid',
        'string.empty': 'Email tidak boleh kosong',
        'any.required': 'Email diperlukan',
    }),
    upload_identity: Joi.string().required().messages({
        'string.empty': 'Identitas tidak boleh kosong',
        'any.required': 'Identitas diperlukan',
    }),
    kota: Joi.string().required().messages({
        'string.empty': 'Kota tidak boleh kosong',
        'any.required': 'Kota diperlukan',
    }),
    kecamatan: Joi.string().required().messages({
        'string.empty': 'Kecamatan tidak boleh kosong',
        'any.required': 'Kecamatan diperlukan',
    }),
    jalan: Joi.string().required().messages({
        'string.empty': 'Jalan tidak boleh kosong',
        'any.required': 'Jalan diperlukan',
    }),
    package_id: Joi.number().integer().required().messages({
        'number.base': 'Package ID harus berupa angka',
        'any.required': 'Package ID diperlukan',
    }),
});

const updateOrderValidation = Joi.object({
    status_id: Joi.number().integer().optional().messages({
        'number.base': 'Status ID must be an integer',
    }),
    teknisi_id: Joi.number().integer().optional().messages({
        'number.base': 'Teknisi ID must be an integer',
    }),
    reject_reason: Joi.string().optional().messages({
        'string.base': 'Reject reason must be a string',
    }),
});

const updateCustomerOrderValidation = Joi.object({
    nama: Joi.string().max(100).optional().messages({
        'string.empty': 'Nama tidak boleh kosong',
        'string.max': 'Nama tidak boleh lebih dari 100 karakter',
    }),
    email: Joi.string().email().optional().messages({
        'string.email': 'Email tidak valid',
        'string.empty': 'Email tidak boleh kosong',
    }),
    upload_identity: Joi.string().optional().messages({
        'string.empty': 'Identitas tidak boleh kosong',
    }),
    kota: Joi.string().optional().messages({
        'string.empty': 'Kota tidak boleh kosong',
    }),
    kecamatan: Joi.string().optional().messages({
        'string.empty': 'Kecamatan tidak boleh kosong',
    }),
    jalan: Joi.string().optional().messages({
        'string.empty': 'Jalan tidak boleh kosong',
    }),
});

export { orderValidation, updateOrderValidation, updateCustomerOrderValidation };
