const Joi = require('joi');

const getProfileSchema = Joi.object({
    instaId: Joi.string().required()
});

export {
    getProfileSchema,
}