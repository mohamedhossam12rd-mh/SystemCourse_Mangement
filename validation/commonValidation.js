const joi = require("joi")

const UUIDSchema = joi.string().uuid()

const idParamsSchema = joi.object({
    id : UUIDSchema.required()
})

module.exports = {UUIDSchema , idParamsSchema}