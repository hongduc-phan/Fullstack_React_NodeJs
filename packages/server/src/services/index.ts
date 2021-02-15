import imageStore from './impl/imageStoreAzure'
import ignites from './impl/ignites'
import emailSender from './impl/emailsender'
import Services from './interfaces/services'

const services: Services = {
    imageStore,
    ignites,
    emailSender
}

export default services