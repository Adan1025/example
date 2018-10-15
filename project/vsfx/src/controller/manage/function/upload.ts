import { Controller, Get, Post, doFormidable, NoInterceptors } from '../../../@common';
import { PictureService } from '../../../service/function/picture';
import { Picture } from '../../../entity/picture';
const pictureService = new PictureService();
@Controller('/picture')
@NoInterceptors()
export class PictureController {
    @Post('/upload')
    async uploadPicture(req, res) {
        let { fileUrl, fileName, used } = await doFormidable(req, {
            type: 'images',
            reg: /^.*\.(?:jpg|png|jpeg)$/i
        });;
        let picture: Picture = {
            imgUrl: fileUrl,
            alt: fileName.replace(/(\.[^\.]+)$/, ''),
            name: fileName,
            used: used == 'true' ? 1 : 0
        }
        picture.imgUrl = fileUrl;
        pictureService.saveOrUpdateAny(Picture, picture);
        res.sendSuccess(fileUrl);
    }

    @Get('/all')
    async getAllPicture(req, res) {
        let picture = await pictureService.getAll();
        res.sendSuccess(picture);
    }
}