import { Service } from '../../@common';
import { BaseService } from '../BaseService';
import { Picture } from '../../entity/picture';
@Service()
export class PictureService extends BaseService {
    getRepository;
    async getAll() {
        let picture: Array<Picture> = this.getRepository(Picture).find();
        return picture;
    }
}