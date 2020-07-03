import { celebrate, Segments, Joi } from 'celebrate';

export const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(3),
    description: Joi.string().required().min(10),
    tag: Joi.string().required().min(3),
    featured: Joi.boolean().optional(),
    order: Joi.number().required().min(1),
    parent_id: Joi.number().optional().min(1),
  }),
});

export const update = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().min(3),
    description: Joi.string().optional().min(10),
    tag: Joi.string().optional().min(3),
    featured: Joi.boolean().optional(),
    order: Joi.number().optional().min(1),
    parent_id: Joi.number().optional().min(1),
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
