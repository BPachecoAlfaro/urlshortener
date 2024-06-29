import { Router } from 'express';
import { UrlController } from './controller';



export class UrlRoutes {

    static get routes(): Router {

        const router = Router();

        const urlController = new UrlController();

        router.get('/:shorturl', urlController.getUrl );
        router.post('/api/url/:url', urlController.createShortUrl );
        //TODO: implementar despues de register/login
        // router.get('/api/urls', urlController.getUrlsById )
        // router.delete('/api/url/:url', urlController.deleteUrl );



        return router;
    }


}