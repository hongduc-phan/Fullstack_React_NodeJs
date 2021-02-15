import ImageStoreService from './imagestore';
import IgnitesService from './ignites';
import EmailSender from './emailsender';

export default interface Services {
    imageStore: ImageStoreService;
    ignites: IgnitesService;
    emailSender: EmailSender;
}