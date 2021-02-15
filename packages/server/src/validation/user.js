import Joi from 'joi'

const email = Joi.string().email().required().label('Email')
const name = Joi.string().required().label('Name')
const password = Joi.string().min(6).max(50).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/)
.required().label('Password').options({
language:{
    string:{
        regex:{
            base: 'must have at least one lowercase land uppercase letter, and one digit'
        }
    }
}
})
export const signUp = Joi.object().keys({
    email, password, name
})
export const changePassword = Joi.object().keys({
    password
})
