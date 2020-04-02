import { celebrate, Segments, Joi } from 'celebrate';

export const login = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

export const signUp = celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required().min(8),
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    birthday: Joi.date().required(),
    city: Joi.string().required(),
    uf: Joi.string().required(),
    country: Joi.string().required(),
    street: Joi.string().allow('').optional(),
    neighborhood: Joi.string().allow('').optional(),
    number: Joi.number().optional(),
    reference: Joi.string().allow('').optional(),
    zipcode: Joi.string().allow('').optional(),
    complement: Joi.string().allow('').optional(),
  }),
});

export const update = celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().min(8),
    email: Joi.string().email(),
    name: Joi.string(),
    birthday: Joi.date(),
    city: Joi.string(),
    uf: Joi.string(),
    country: Joi.string(),
    street: Joi.string(),
    neighborhood: Joi.string(),
    number: Joi.number(),
    reference: Joi.string(),
    zipcode: Joi.string(),
    complement: Joi.string(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

export const del = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

export const get = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});
