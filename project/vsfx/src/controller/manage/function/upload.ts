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
    async getAllPicture({ query }, res) {
        let { name, used, vague = false, noPage = false, pageSize = 20, currPage = 1 } = query;
        if (vague && name) {
            name = this.vagueHandle(name);
        }
        let { pictureList, total } = await pictureService.getAll({ name, used, vague, noPage, pageSize, currPage });
        res.sendSuccess({ pictureList, total });
    }
    vagueHandle(str) {
        let len = str.length, keywords = Array<string>();
        if (len <= 2) return [str];
        len = len < 3 ? 2 : Math.ceil(len / 2);
        function gen(arr, len) {
            if (arr.length = len) {
                keywords.push(arr.join(''));
            } else if (arr.length > len) {
                let temp = [arr.shift()],
                    i = 0;
                while (len - 1 > i) {
                    temp.push(arr[i++]);
                }
                keywords.push(temp.join(''));
                gen(arr, len);
            }
        }
        gen(str.split(''), len);
        return keywords;
    }
}