const Joi = require('joi');

const volunteerRequestSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'الاسم الكامل مطلوب',
      'string.min': 'يجب أن يكون الاسم على الأقل 3 أحرف',
      'string.max': 'يجب أن لا يتجاوز الاسم 100 حرف',
      'any.required': 'الاسم الكامل مطلوب'
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'البريد الإلكتروني مطلوب',
      'string.email': 'البريد الإلكتروني غير صالح',
      'any.required': 'البريد الإلكتروني مطلوب'
    }),

  phonenumber: Joi.string()
    .pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .required()
    .messages({
      'string.empty': 'رقم الهاتف مطلوب',
      'string.pattern.base': 'رقم الهاتف غير صالح',
      'any.required': 'رقم الهاتف مطلوب'
    }),

  birthDate: Joi.date()
    .max('now')
    .required()
    .messages({
      'date.base': 'تاريخ الميلاد غير صالح',
      'date.max': 'تاريخ الميلاد لا يمكن أن يكون في المستقبل',
      'any.required': 'تاريخ الميلاد مطلوب'
    }),

  additionalInfo: Joi.string()
    .min(20)
    .max(1000)
    .required()
    .messages({
      'string.empty': 'المعلومات الإضافية مطلوبة',
      'string.min': 'يجب أن تكون المعلومات الإضافية على الأقل 20 حرفاً',
      'string.max': 'يجب أن لا تتجاوز المعلومات الإضافية 1000 حرف',
      'any.required': 'المعلومات الإضافية مطلوبة'
    })
});

module.exports = {
  volunteerRequestSchema
}; 