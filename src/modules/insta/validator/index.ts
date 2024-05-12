const Joi = require('joi');

const getProfileSchema = Joi.object({
    instaId: Joi.string().required()
});

const getMediaSchema = Joi.object({
    filepath: Joi.string().required()
});

export {
    getProfileSchema,
    getMediaSchema,
}