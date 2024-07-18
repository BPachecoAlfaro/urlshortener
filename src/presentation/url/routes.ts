import { Router } from 'express';
import { UrlController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';



export class UrlRoutes {

    static get routes(): Router {

        const router = Router();

        const urlController = new UrlController();

        router.get('/:shorturl', urlController.getUrl );
        router.get('/api/url/ids', urlController.getUrlsById );
        router.post('/api/url/:url', urlController.createShortUrl );

        router.post('/api/authorized/url', [AuthMiddleware.validateJWT], urlController.createShortUrlRegisteredUser );
        router.get('/api/authorized/urls', [AuthMiddleware.validateJWT], urlController.getUrlsByUser );
        router.delete('/api/authorized/url/delete/:shorturl', [AuthMiddleware.validateJWT], urlController.deleteUrl );

        return router;
    };


};