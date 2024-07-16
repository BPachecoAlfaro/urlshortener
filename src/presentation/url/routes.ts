import { Router } from 'express';
import { UrlController } from './controller';



export class UrlRoutes {

    static get routes(): Router {

        const router = Router();

        const urlController = new UrlController();

        router.get('/:shorturl', urlController.getUrl );
        router.get('/api/url/ids', urlController.getUrlsById );
        router.post('/api/url/:url', urlController.createShortUrl );
        //TODO: implementar despues de register/login
        // router.post('/api/url/auth/:url', [Auth.Middleware], urlController.createShortUrl );
        // router.get('/api/urls',[Auth.Middleware] ,urlController.getUrlsByUser )
        // router.delete('/api/url/:shorturl',[Auth.Middleware] , urlController.deleteUrl );

        return router;
    }


}