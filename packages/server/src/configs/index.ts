import * as config_prod from './configs_prod'
import * as config_dev from './configs_dev'
export default process.env.NODE_ENV === 'production' ? config_prod : config_dev