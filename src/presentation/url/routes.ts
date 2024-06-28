import { Router } from 'express';
import { UrlController } from './controller';



export class UrlRoutes {

    static get routes(): Router {

        const router = Router();

        const urlController = new UrlController();

        router.post('/:url', urlController.createUrl )
        router.delete('/:url', urlController.deleteUrl )


        return router;
    }


}