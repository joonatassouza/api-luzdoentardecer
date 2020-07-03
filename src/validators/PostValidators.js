import { celebrate, Segments, Joi } from 'celebrate';

export const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    publish_date: Joi.date().required(),
    title: Joi.string().required().min(3),
    description: Joi.string().optional().allow(''),
    author: Joi.string().required().min(3),
    content: Joi.string().required().min(10),
    type: Joi.string().required(),
    place: Joi.string().optional().allow(''),
    template_id: Joi.number().required().min(1),
    categories: Joi.array().items(Joi.number().min(1)).required(),
  }),
});

export const update = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    publish_date: Joi.date().required(),
    title: Joi.string().required().min(3),
    description: Joi.string().optional().allow(''),
    author: Joi.string().required().min(3),
    content: Joi.string().required().min(10),
    type: Joi.string().required(),
    place: Joi.string().optional().allow(''),
    template_id: Joi.number().required().min(1),
    categories: Joi.array().items(Joi.number().min(1)).required(),
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
