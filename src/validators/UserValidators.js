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
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    birthday: Joi.date().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().min(2).max(2),
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
    password: Joi.string().min(8).optional(),
    email: Joi.string().email().optional(),
    firstname: Joi.string().allow('').optional(),
    lastname: Joi.string().allow('').optional(),
    birthday: Joi.date().allow('').optional(),
    city: Joi.string().allow('').optional(),
    uf: Joi.string().min(2).max(2),
    country: Joi.string().allow('').optional(),
    street: Joi.string().allow('').optional(),
    neighborhood: Joi.string().allow('').optional(),
    number: Joi.number().optional(),
    reference: Joi.string().allow('').optional(),
    zipcode: Joi.string().allow('').optional(),
    complement: Joi.string().allow('').optional(),
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

export const index = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().positive().min(1),
    include: Joi.number().positive().min(5),
  }),
});
