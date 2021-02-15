import Joi from './joi'

const title = Joi.string().max(100).required().label('Title')
const body = Joi.string().min(150).required().label('Body')
const id = Joi.string().objectId().required().label('ID')

export const createBlog = Joi.object().keys({
    title, body
})
export const editBlog = Joi.object().keys({
  title, body, id
})
